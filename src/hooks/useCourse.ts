import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchTutorCourseById, mapApiDataToCourse } from "@/lib/api";
import { useWooCommerceProducts } from "./useWooCommerceProducts";
import { Course } from "@/lib/course";

export const useCourse = (courseId: string | undefined) => {
  // Bước 1: Lấy dữ liệu thô của một khóa học từ Tutor LMS
  const { data: tutorCourse } = useSuspenseQuery({
    queryKey: ["tutor_course", courseId],
    queryFn: () => fetchTutorCourseById(courseId!),
  });

  // Bước 2: Lấy bản đồ sản phẩm từ cache của React Query
  const { data: wcProductsMap } = useWooCommerceProducts();

  // Bước 3: Kết hợp dữ liệu
  const processedCourse = useMemo((): Course | null => {
    if (!tutorCourse || !wcProductsMap) {
      return null;
    }
    const courseName = tutorCourse.post_title.toLowerCase().trim();
    const wcProduct = wcProductsMap.get(courseName);
    return mapApiDataToCourse(tutorCourse, wcProduct);
  }, [tutorCourse, wcProductsMap]);

  return { data: processedCourse };
};