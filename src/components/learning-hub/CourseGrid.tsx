import React from "react";
import CourseCard from "@/components/landing/CourseCard";
import { Course } from "@/lib/course";
import { motion } from "framer-motion";

interface CourseGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Độ trễ giữa các thẻ
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  if (courses.length === 0) {
    return <p className="text-center col-span-full">Không tìm thấy khóa học nào.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CourseCard 
            {...course} 
            categories={course.categories.join(', ')} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CourseGrid;