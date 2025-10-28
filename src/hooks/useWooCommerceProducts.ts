import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchAllWooCommerceProducts } from "@/lib/api";

export const useWooCommerceProducts = () => {
  return useSuspenseQuery({
    queryKey: ["woocommerce_products"],
    queryFn: fetchAllWooCommerceProducts,
    // Dữ liệu sản phẩm ít thay đổi, cache trong 5 phút
    staleTime: 1000 * 60 * 5, 
  });
};