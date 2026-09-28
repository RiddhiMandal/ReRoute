"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MatchPrefs } from "@/lib/match";
import {
  ApiError,
  backendConfigured,
  deleteAccount as deleteAccountRemote,
  getProfile,
  refreshSession,
  saveProfile,
  signIn as signInRemote,
  signOutRemote,
  signUp as signUpRemote,
  type Session,
} from "@/lib/supabase";

export type UserType = "newcomer" | "internal";

export interface SavedData {
  prefs?: MatchPrefs;
  checklist?: Record<string, boolean>;
}

export type SignUpResult = "signed-in" | "confirm-email" | "guest";

interface AccountValue {
  backend: boolean;
  restoring: boolean;
  entered: boolean;
  email: string | null;
  name: string;
  userType: UserType;
  isSignedIn: boolean;
  saved: SavedData;
  setSaved: <K extends keyof SavedData>(key: K, value: SavedData[K]) => void;
  signUp: (input: { name: string; email: string; password: string; userType: UserType }) => Promise<SignUpResult>;
  signIn: (input: { email: string; password: string }) => Promise<void>;
  continueAsGuest: (input?: { name?: string; userType?: UserType }) => void;
  leaveGuest: () => void;
  updateProfile: (input: { name?: string; userType?: UserType }) => void;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const SESSION_KEY = "reroute_session_v1";
const LOCAL_KEY = "reroute_local_v1";

interface LocalBlob {
  name: string;
  userType: UserType;
  saved: SavedData;
}

const EMPTY_LOCAL: LocalBlob = { name: "", userType: "newcomer", saved: {} };

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — everything still works for this visit
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

const AccountContext = createContext<AccountValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [restoring, setRestoring] = useState(true);
  const [entered, setEntered] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<LocalBlob>(EMPTY_LOCAL);
  const sessionRef = useRef<Session | null>(null);
  const profileRef = useRef<LocalBlob>(EMPTY_LOCAL);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyProfile = useCallback((next: LocalBlob) => {
    profileRef.current = next;
    setProfile(next);
    writeJson(LOCAL_KEY, next);
  }, []);

  const applySession = useCallback((next: Session | null) => {
    sessionRef.current = next;
    setSession(next);
    if (next) writeJson(SESSION_KEY, next);
    else removeKey(SESSION_KEY);
  }, []);

  const freshSession = useCallback(async (): Promise<Session | null> => {
    const current = sessionRef.current;
    if (!current) return null;
    if (current.expires_at - 30 > Math.floor(Date.now() / 1000)) return current;
    const refreshed = await refreshSession(current.refresh_token);
    applySession(refreshed);
    return refreshed;
  }, [applySession]);

  const pushToServer = useCallback(async () => {
    try {
      const s = await freshSession();
      if (!s) return;
      const p = profileRef.current;
      await saveProfile(s, { name: p.name, user_type: p.userType, data: p.saved as Record<string, unknown> });
    } catch {
      // offline or expired: the local copy is kept and will sync on the next change
    }
  }, [freshSession]);

  const schedulePush = useCallback(() => {
    if (!sessionRef.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => void pushToServer(), 700);
  }, [pushToServer]);

  const loadFromServer = useCallback(
    async (s: Session, fallback: Partial<LocalBlob>) => {
      const row = await getProfile(s);
      if (row) {
        applyProfile({
          name: row.name ?? fallback.name ?? "",
          userType: (row.user_type as UserType) ?? fallback.userType ?? "newcomer",
          saved: (row.data as SavedData) ?? {},
        });
      } else {
        const created: LocalBlob = {
          name: fallback.name ?? s.user.email.split("@")[0],
          userType: fallback.userType ?? "newcomer",
          saved: readJson<LocalBlob>(LOCAL_KEY)?.saved ?? {},
        };
        applyProfile(created);
        await saveProfile(s, { name: created.name, user_type: created.userType, data: created.saved as Record<string, unknown> });
      }
    },
    [applyProfile]
  );

  // Restore an existing sign-in when the page loads.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = readJson<Session>(SESSION_KEY);
      if (stored && backendConfigured) {
        try {
          sessionRef.current = stored;
          const s = await freshSession();
          if (s) {
            await loadFromServer(s, readJson<LocalBlob>(LOCAL_KEY) ?? {});
            if (!cancelled) setSession(s);
            if (!cancelled) setEntered(true);
          }
        } catch (e) {
          if (e instanceof ApiError) applySession(null);
        }
      }
      if (!cancelled) setRestoring(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [applySession, freshSession, loadFromServer]);

  const setSaved = useCallback<AccountValue["setSaved"]>(
    (key, value) => {
      applyProfile({ ...profileRef.current, saved: { ...profileRef.current.saved, [key]: value } });
      schedulePush();
    },
    [applyProfile, schedulePush]
  );

  const continueAsGuest = useCallback<AccountValue["continueAsGuest"]>(
    (input) => {
      const previous = readJson<LocalBlob>(LOCAL_KEY) ?? EMPTY_LOCAL;
      applyProfile({
        name: input?.name ?? previous.name,
        userType: input?.userType ?? previous.userType,
        saved: previous.saved,
      });
      setEntered(true);
    },
    [applyProfile]
  );

  const leaveGuest = useCallback(() => setEntered(false), []);

  const signUp = useCallback<AccountValue["signUp"]>(
    async ({ name, email, password, userType }) => {
      if (!backendConfigured) {
        continueAsGuest({ name, userType });
        return "guest";
      }
      const s = await signUpRemote(email, password, { name, user_type: userType });
      if (!s) return "confirm-email";
      applySession(s);
      const local = readJson<LocalBlob>(LOCAL_KEY);
      applyProfile({ name, userType, saved: local?.saved ?? {} });
      await saveProfile(s, { name, user_type: userType, data: (local?.saved ?? {}) as Record<string, unknown> });
      setEntered(true);
      return "signed-in";
    },
    [applyProfile, applySession, continueAsGuest]
  );

  const signIn = useCallback<AccountValue["signIn"]>(
    async ({ email, password }) => {
      if (!backendConfigured) {
        const previous = readJson<LocalBlob>(LOCAL_KEY);
        continueAsGuest({ name: previous?.name || email.split("@")[0] });
        return;
      }
      const s = await signInRemote(email, password);
      applySession(s);
      await loadFromServer(s, { name: email.split("@")[0] });
      setEntered(true);
    },
    [applySession, continueAsGuest, loadFromServer]
  );

  const updateProfile = useCallback<AccountValue["updateProfile"]>(
    (input) => {
      const p = profileRef.current;
      applyProfile({
        ...p,
        name: input.name !== undefined ? input.name : p.name,
        userType: input.userType ?? p.userType,
      });
      schedulePush();
    },
    [applyProfile, schedulePush]
  );

  const signOut = useCallback(async () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const s = sessionRef.current;
    if (s) {
      await pushToServer();
      await signOutRemote(s.access_token);
    }
    applySession(null);
    applyProfile(EMPTY_LOCAL);
    removeKey(LOCAL_KEY);
    setEntered(false);
  }, [applyProfile, applySession, pushToServer]);

  const deleteAccount = useCallback(async () => {
    const s = await freshSession();
    if (s) await deleteAccountRemote(s);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    applySession(null);
    applyProfile(EMPTY_LOCAL);
    removeKey(LOCAL_KEY);
    setEntered(false);
  }, [applyProfile, applySession, freshSession]);

  const value = useMemo<AccountValue>(
    () => ({
      backend: backendConfigured,
      restoring,
      entered,
      email: session?.user.email ?? null,
      name: profile.name,
      userType: profile.userType,
      isSignedIn: Boolean(session),
      saved: profile.saved,
      setSaved,
      signUp,
      signIn,
      continueAsGuest,
      leaveGuest,
      updateProfile,
      signOut,
      deleteAccount,
    }),
    [restoring, entered, session, profile, setSaved, signUp, signIn, continueAsGuest, leaveGuest, updateProfile, signOut, deleteAccount]
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount(): AccountValue {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used inside <AccountProvider>");
  return ctx;
}
