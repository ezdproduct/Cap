import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCourse } from "@/hooks/useCourse";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BarChart2, User, Star, ShoppingCart } from "lucide-react";
import { createSlug } from "@/lib/utils";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course } = useCourse(courseId);

  if (!course) {
    return <div>Đang tải chi tiết khóa học...</div>;
  }

  const courseSlug = createSlug(course.title);
  const externalUrl = `https://course.learnwithcap.com/courses/${courseSlug}`;

  const handleNavigateClick = () => {
    window.open(externalUrl, '_blank');
  };

  return (
    <>
      <Header />
      <main className="bg-background py-8 sm:py-12">
        <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar / Purchase Card */}
          <div className="lg:col-span-1 lg:order-last lg:sticky top-24">
            <Card>
              <CardHeader className="p-0">
                <img src={course.image} alt={course.title} className="w-full h-56 object-cover rounded-t-lg" loading="lazy" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-cap-dark-blue">
                    {course.discountedPrice || course.price}
                  </span>
                  {course.discountedPrice && (
                    <span className="text-xl line-through text-muted-foreground">
                      {course.price}
                    </span>
                  )}
                </div>
                <Button 
                  className="w-full bg-cap-purple hover:bg-cap-purple/90 text-lg py-6"
                  onClick={handleNavigateClick}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Xem chi tiết
                </Button>
                <ul className="mt-6 space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <Clock className="w-5 h-5 mr-3 text-cap-sky-blue" />
                    <span>Thời lượng: <strong>{course.duration}</strong></span>
                  </li>
                  <li className="flex items-center">
                    <BarChart2 className="w-5 h-5 mr-3 text-cap-sky-blue" />
                    <span>Trình độ: <strong>{course.level}</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg shadow-sm">
            <h1 className="text-h2 sm:text-h1 font-bold text-cap-dark-blue mb-4">{course.title}</h1>
            <div className="flex items-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>Tạo bởi {course.instructor}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>{course.rating} xếp hạng</span>
              </div>
            </div>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseDetail;