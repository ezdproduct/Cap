import React from "react";
import CourseCard from "@/components/landing/CourseCard";
import { Course } from "@/lib/course";

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  if (courses.length === 0) {
    return <p className="text-center col-span-full">Không tìm thấy khóa học nào.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="aspect-[1/1.04] w-full">
          <CourseCard 
            {...course} 
            categories={course.categories.join(', ')} 
          />
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;