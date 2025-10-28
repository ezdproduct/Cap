import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, Star, ShoppingCart } from "lucide-react";

interface CourseCardProps {
  id: number;
  title: string;
  level: string;
  image: string;
  rating: number;
  duration: string;
  instructor: string;
  price: string;
  discountedPrice?: string;
  categories: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  level,
  image,
  rating,
  duration,
  instructor,
  price,
  discountedPrice,
  categories,
}) => {
  const isFree = price === "0đ";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Logic thêm vào giỏ hàng hoặc đăng ký có thể được thêm ở đây
    console.log("Button clicked for course:", title);
  };

  return (
    <Link to={`/courses/${id}`} className="h-full block group">
      <Card className="overflow-hidden border h-full flex flex-col bg-white group-hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
          <div className="absolute top-3 left-3 bg-cap-purple text-white px-3 py-1 text-xs font-semibold rounded-full">
            {level}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 border-none" 
            onClick={handleButtonClick}
          >
            <Bookmark className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <CardContent className="p-4 flex flex-col flex-grow">
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <h3 className="text-lg font-bold mb-2 text-cap-dark-blue group-hover:text-cap-purple transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>{duration}</span>
          </div>
          <div className="hidden sm:flex items-start text-sm text-muted-foreground mb-4">
            <Avatar className="h-6 w-6 mr-2 flex-shrink-0">
              <AvatarFallback className="bg-cap-sky-blue text-white text-xs">{instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              Tạo bởi <span className="font-medium text-gray-800">{instructor}</span>
              {categories && <span className="text-gray-500">, {categories}</span>}
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t">
            {isFree ? (
              <Button 
                variant="outline" 
                className="w-full border-cap-purple text-cap-purple hover:bg-cap-purple hover:text-white transition-colors bg-white" 
                onClick={handleButtonClick}
              >
                Đăng ký khóa học
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                {/* Điều chỉnh phần hiển thị giá */}
                <div className="flex items-center gap-2">
                  {discountedPrice && (
                    <p className="text-sm line-through text-muted-foreground font-normal">
                      {price}
                    </p>
                  )}
                  <p className="text-lg font-bold text-cap-dark-blue">
                    {discountedPrice || price}
                  </p>
                </div>
                {/* Nút Thêm */}
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-cap-purple text-cap-purple hover:bg-cap-purple hover:text-white transition-colors bg-white" 
                  onClick={handleButtonClick}
                >
                  <ShoppingCart className="h-4 w-4 sm:mr-2" />
                  <span>Thêm</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;