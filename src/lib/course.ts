export interface Course {
  id: number;
  title: string;
  level: string;
  image: string;
  rating: number;
  duration: string;
  instructor: string;
  price: string;
  discountedPrice?: string;
  categories: string[];
  tags: string[];
  description: string;
  product_id?: number;
}