import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="p-2">
      <div className="border rounded-lg overflow-hidden h-full flex flex-col">
        <Skeleton className="w-full h-48" />
        <div className="p-4 flex flex-col flex-grow space-y-3">
          <div className="flex space-x-1">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <div className="flex-grow" />
          <div className="pt-4 border-t">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;