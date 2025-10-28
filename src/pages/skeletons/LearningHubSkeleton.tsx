import CourseCardSkeleton from "./CourseCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const LearningHubSkeleton = () => {
  return (
    <div className="animate-pulse">
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="px-10 mx-auto max-w-screen-2xl flex h-16 items-center justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-64 rounded-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </header>
      <main className="py-8">
        <div className="px-10 mx-auto max-w-screen-2xl grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg-col-span-1 space-y-8">
            <Skeleton className="h-10 w-full" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningHubSkeleton;