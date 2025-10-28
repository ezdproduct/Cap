import React, { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/learning-hub/FilterSidebar";
import CourseGrid from "@/components/learning-hub/CourseGrid";
import MobileFilterButton from "@/components/learning-hub/MobileFilterButton";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/lib/course";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQueryClient } from "@tanstack/react-query";
import { fetchTutorCourses } from "@/lib/api";

const LearningHub = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useCourses({ page: currentPage, limit: 9 });
  const { courses: allCourses = [], totalPages = 1 } = data || {};

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    tags: [] as string[],
    levels: [] as string[],
    prices: [] as string[],
  });

  // Logic tìm nạp trước dữ liệu cho trang kế tiếp
  const prefetchPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["tutor_courses", { page, limit: 9 }],
        queryFn: () => fetchTutorCourses({ page, limit: 9 }),
      });
    }
  };

  // Lưu ý: Logic lọc hiện tại sẽ chỉ hoạt động trên dữ liệu của trang hiện tại.
  // Để lọc trên toàn bộ tập dữ liệu, cần có sự hỗ trợ từ API.
  const availableFilters = useMemo(() => {
    const uniqueCategories = new Set<string>();
    const uniqueTags = new Set<string>();
    const uniqueLevels = new Set<string>();

    allCourses.forEach((course: Course) => {
      course.categories.forEach((cat) => uniqueCategories.add(cat));
      course.tags.forEach((tag) => uniqueTags.add(tag));
      uniqueLevels.add(course.level);
    });

    return {
      categories: Array.from(uniqueCategories).sort(),
      tags: Array.from(uniqueTags).sort(),
      levels: Array.from(uniqueLevels).sort(),
      prices: ["Miễn phí", "Trả phí"],
    };
  }, [allCourses]);

  const handleFilterChange = (
    type: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course: Course) => {
      const searchMatch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const levelMatch =
        selectedFilters.levels.length === 0 ||
        selectedFilters.levels.includes(course.level);
      const categoryMatch =
        selectedFilters.categories.length === 0 ||
        selectedFilters.categories.some((cat) =>
          course.categories.includes(cat)
        );
      const tagMatch =
        selectedFilters.tags.length === 0 ||
        selectedFilters.tags.some((tag) => course.tags.includes(tag));
      const priceMatch =
        selectedFilters.prices.length === 0 ||
        selectedFilters.prices.some((priceFilter) => {
          if (priceFilter === "Miễn phí") return course.price === "0đ";
          if (priceFilter === "Trả phí") return course.price !== "0đ";
          return false;
        });

      return searchMatch && levelMatch && categoryMatch && tagMatch && priceMatch;
    });
  }, [allCourses, searchTerm, selectedFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <main className="py-8 bg-white">
        <div className="px-10 mx-auto max-w-screen-2xl">
          {/* Mobile Filter Button */}
          <MobileFilterButton
            filters={availableFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                filters={availableFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            
            {/* Course Grid */}
            <div className="flex flex-col justify-between">
              <CourseGrid courses={filteredCourses} />
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(Math.max(1, currentPage - 1));
                        }}
                        onMouseEnter={() => prefetchPage(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                          }}
                          onMouseEnter={() => prefetchPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(Math.min(totalPages, currentPage + 1));
                        }}
                        onMouseEnter={() => prefetchPage(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LearningHub;