import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchTutorCourses, mapApiDataToCourse } from "@/lib/api";
import { useWooCommerceProducts } from "./useWooCommerceProducts";
import { Course } from "@/lib/course";

export const useCourses = ({ page = 1, limit = 9 }: { page?: number; limit?: number }) => {
  // Bước 1: Lấy dữ liệu thô từ Tutor LMS
  const { data: tutorData } = useSuspenseQuery({
    queryKey: ["tutor_courses", { page, limit }],
    queryFn: () => fetchTutorCourses({ page, limit }),
  });

  // Bước 2: Lấy bản đồ sản phẩm từ cache của React Query
  const { data: wcProductsMap } = useWooCommerceProducts();

  // Bước 3: Kết hợp dữ liệu
  const processedData = useMemo(() => {
    if (!tutorData || !wcProductsMap) {
      return { courses: [], totalCourses: 0, totalPages: 0 };
    }

    const courses: Course[] = tutorData.courses.map((courseData: any) => {
      const courseName = courseData.post_title.toLowerCase().trim();
      const wcProduct = wcProductsMap.get(courseName);
      return mapApiDataToCourse(courseData, wcProduct);
    });

    return {
      courses,
      totalCourses: tutorData.totalCourses,
      totalPages: tutorData.totalPages,
    };
  }, [tutorData, wcProductsMap]);

  return { data: processedData };
};