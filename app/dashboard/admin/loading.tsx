export default function Loading() {
  return (
    <div className="flex flex-col gap-5 p-4">
      <div className="h-16 w-64 animate-pulse rounded-lg bg-light/70" />
      <div className="h-[420px] w-full animate-pulse rounded-xl bg-light/70" />
    </div>
  );
}
