// TODO: replace with the real Tally.so form embed URL (Feature #11, nice-to-have)
const TALLY_EMBED_URL = "https://tally.so/embed/YOUR_FORM_ID";

export default function FeedbackForm() {
  return (
    <section className="border-t border-black/5 bg-white px-6 py-10">
      <h2 className="text-lg font-semibold text-reroute-green">Give us feedback</h2>
      <p className="mt-1 text-sm text-slate-500">
        Was this helpful? Tell us what&apos;s missing.
      </p>
      <iframe
        title="Reroute feedback form"
        src={TALLY_EMBED_URL}
        className="mt-4 h-96 w-full rounded-lg border-0"
        loading="lazy"
      />
    </section>
  );
}
