import React, { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/lib/course";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

const filters = ["Tất cả trình độ", "Tiêu chuẩn", "Mở rộng", "Nâng cao"];

// Helper function to chunk an array into smaller arrays
function chunk<T>(array: T[], size: number): T[][] {
  const chunked_arr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunked_arr.push(array.slice(i, i + size));
  }
  return chunked_arr;
}

const CoursesSection = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const { data } = useCourses({ page: 1, limit: 9 });
  const courses = data?.courses || [];
  const isMobile = useIsMobile();

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course: Course) =>
        activeFilter === "Tất cả trình độ" || course.level === activeFilter
    );
  }, [courses, activeFilter]);

  const mobileCourseChunks = useMemo(() => chunk(filteredCourses, 2), [filteredCourses]);

  return (
    <section id="courses" className="pt-0 pb-12 md:pb-16 bg-white">
      <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl">
        <div className="flex justify-center mb-8">
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-1 bg-gray-100 p-1 rounded-full overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-base font-medium transition-colors duration-200 flex-shrink-0 ${
                  activeFilter === filter
                    ? "bg-cap-purple text-white shadow-sm"
                    : "bg-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Carousel opts={{ align: "start" }} className="w-full mx-auto">
              <CarouselContent className="-ml-2">
                {isMobile ? (
                  mobileCourseChunks.map((chunk, index) => (
                    <CarouselItem key={index} className="basis-1/2 pl-2">
                      <div className="space-y-2">
                        {chunk.map((course) => (
                           <div key={course.id} className="p-1">
                             <CourseCard
                               {...course}
                               categories={course.categories.join(", ")}
                             />
                           </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  filteredCourses.map((course) => (
                    <CarouselItem
                      key={course.id}
                      className="basis-1/2 lg:basis-1/3 pl-2"
                    >
                      <div className="p-1">
                        <CourseCard
                          {...course}
                          categories={course.categories.join(", ")}
                        />
                      </div>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-transparent border-none shadow-none hover:bg-transparent text-gray-800" />
              <CarouselNext className="hidden md:flex -right-12 bg-transparent border-none shadow-none hover:bg-transparent text-gray-800" />
            </Carousel>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoursesSection;