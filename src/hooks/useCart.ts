import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCart, addToCart as apiAddToCart } from "@/lib/api";
import { showSuccess, showError } from "@/utils/toast";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: number) => apiAddToCart(productId),
    onSuccess: () => {
      showSuccess("Đã thêm vào giỏ hàng!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      showError(error.message || "Đã xảy ra lỗi.");
    },
  });
};