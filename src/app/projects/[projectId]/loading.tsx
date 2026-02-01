import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar skeleton */}
      <div className="h-12 border-b border-border bg-card flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-px" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex">
        {/* File explorer skeleton */}
        <div className="w-64 border-r border-border bg-card p-3 space-y-3">
          <Skeleton className="h-4 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>

        {/* Editor skeleton */}
        <div className="flex-1 p-4 space-y-3">
          <Skeleton className="h-8 w-full max-w-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* AI panel skeleton */}
        <div className="w-80 border-l border-border bg-card p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>

      {/* Status bar skeleton */}
      <div className="h-6 bg-primary flex items-center px-3">
        <Skeleton className="h-3 w-32 bg-primary-foreground/20" />
      </div>
    </div>
  );
}
