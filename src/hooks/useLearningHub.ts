import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCourses } from "@/hooks/useCourses";
import { Course } from "@/lib/course";
import { fetchTutorCourses } from "@/lib/api";

export const useLearningHub = () => {
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

  const prefetchPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["tutor_courses", { page, limit: 9 }],
        queryFn: () => fetchTutorCourses({ page, limit: 9 }),
      });
    }
  };

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

  return {
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
  };
};