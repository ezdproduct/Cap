import { Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/landing/HeroSection";
import CoursesSection from "@/components/landing/CoursesSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/layout/Footer";
import FloatingChatButton from "@/components/ui/FloatingChatButton";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import CoursesSectionSkeleton from "./skeletons/CoursesSectionSkeleton";
import { fetchTutorCourses, fetchAllWooCommerceProducts } from "@/lib/api";

const Index = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Tìm nạp trước dữ liệu cho trang Learning Hub
    queryClient.prefetchQuery({
      queryKey: ["tutor_courses", { page: 1, limit: 9 }],
      queryFn: () => fetchTutorCourses({ page: 1, limit: 9 }),
    });
    queryClient.prefetchQuery({
      queryKey: ["woocommerce_products"],
      queryFn: fetchAllWooCommerceProducts,
    });
  }, [queryClient]);

  return (
    <>
      <Header />
      <main>
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>
        
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<CoursesSectionSkeleton />}>
            <AnimatedSection>
              <CoursesSection />
            </AnimatedSection>
          </Suspense>
        </ErrorBoundary>

        <AnimatedSection>
          <FeaturesSection />
        </AnimatedSection>
      </main>
      <Footer />
      <FloatingChatButton />
      <ScrollToTopButton />
    </>
  );
};

export default Index;