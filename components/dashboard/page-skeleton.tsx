export function DashboardPageSkeleton() {
  return (
    <div className="z-10 flex h-[calc(100vh-90px)] flex-col gap-5 overflow-hidden">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-[175px] rounded-xl box-3d p-5">
          <div className="h-full w-full animate-pulse rounded-lg bg-light/70" />
        </div>
        <div className="h-[175px] rounded-xl box-3d p-5">
          <div className="h-full w-full animate-pulse rounded-lg bg-light/70" />
        </div>
      </div>

      <div className="h-[360px] rounded-xl box-3d p-5">
        <div className="h-full w-full animate-pulse rounded-lg bg-light/70" />
      </div>

      <div className="flex min-h-[280px] flex-1 flex-col rounded-xl box-3d p-5">
        <div className="mb-4 h-6 w-44 animate-pulse rounded bg-light/70" />
        <div className="h-full w-full animate-pulse rounded-lg bg-light/70" />
      </div>
    </div>
  );
}
