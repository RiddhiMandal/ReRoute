export default function SourceLabel({
  source,
  lastUpdated,
}: {
  source: string;
  lastUpdated: string;
}) {
  return (
    <p className="text-xs text-slate-400">
      Source: {source} · Last updated {lastUpdated}
    </p>
  );
}
