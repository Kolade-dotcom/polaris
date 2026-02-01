import { Skeleton } from "@/components/ui/skeleton";
import { Code2 } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <header className="border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-coral" />
              <span className="font-bold text-lg">Polaris</span>
            </div>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Projects</span>
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Projects grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 space-y-4"
            >
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
