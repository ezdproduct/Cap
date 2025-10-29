import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FilterSidebar from "@/components/learning-hub/FilterSidebar";
import CourseGrid from "@/components/learning-hub/CourseGrid";
import MobileFilterButton from "@/components/learning-hub/MobileFilterButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLearningHub } from "@/hooks/useLearningHub";

const LearningHub = () => {
  const {
    currentPage,
    totalPages,
    filteredCourses,
    availableFilters,
    selectedFilters,
    searchTerm,
    handleFilterChange,
    setSearchTerm,
    handlePageChange,
    prefetchPage,
  } = useLearningHub();

  return (
    <>
      <Header />
      <main className="py-8 bg-white">
        <div className="px-10 mx-auto max-w-screen-2xl">
          <div className="lg:hidden mb-6">
            <MobileFilterButton
              filters={availableFilters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
            <div className="hidden lg:block">
              <FilterSidebar
                filters={availableFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            
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