import { Skeleton } from "@/components/ui/skeleton";
import CourseCardSkeleton from "./CourseCardSkeleton";

const CoursesSectionSkeleton = () => {
  return (
    <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl animate-pulse">
      <div className="flex justify-center mb-12">
        <Skeleton className="h-12 w-full max-w-lg rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </div>
  );
};

export default CoursesSectionSkeleton;