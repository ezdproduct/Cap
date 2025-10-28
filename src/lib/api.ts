import { Course } from "@/lib/course";

const TUTOR_API_URL = import.meta.env.VITE_API_URL;
const TUTOR_AUTH_HEADER = import.meta.env.VITE_API_AUTH_HEADER;
const WC_API_URL = import.meta.env.VITE_WC_API_URL;
const WC_AUTH_HEADER = import.meta.env.VITE_WC_AUTH_HEADER;
const WC_STORE_API_URL = import.meta.env.VITE_WC_STORE_API_URL;

if (!TUTOR_API_URL || !TUTOR_AUTH_HEADER || !WC_API_URL || !WC_AUTH_HEADER || !WC_STORE_API_URL) {
  throw new Error("Vui lòng định nghĩa đầy đủ các biến API trong tệp .env của bạn");
}

// Hàm này chỉ lấy dữ liệu thô từ Tutor LMS
export const fetchTutorCourses = async ({ page = 1, limit = 9 }) => {
    const url = new URL(TUTOR_API_URL);
    url.searchParams.append('page', String(page));
    url.searchParams.append('per_page', String(limit));
    const response = await fetch(url.toString(), { headers: { 'Authorization': TUTOR_AUTH_HEADER } });
    if (!response.ok) throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    
    const totalCourses = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    const data = await response.json();

    if (data.code !== "success" || !data.data || !data.data.posts) {
        throw new Error("Phản hồi API Tutor không hợp lệ.");
    }
    return { courses: data.data.posts, totalCourses, totalPages };
};

// Hàm này chỉ lấy dữ liệu thô của một khóa học từ Tutor LMS
export const fetchTutorCourseById = async (courseId: string) => {
    const response = await fetch(`${TUTOR_API_URL}/${courseId}`, { headers: { 'Authorization': TUTOR_AUTH_HEADER } });
    if (!response.ok) throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
    const data = await response.json();
    if (!data || typeof data !== 'object') throw new Error("Phản hồi API Tutor không hợp lệ.");
    return data;
};

// Hàm này chỉ lấy và xử lý dữ liệu sản phẩm từ WooCommerce
export const fetchAllWooCommerceProducts = async (): Promise<Map<string, any>> => {
    const fields = 'id,name,price,regular_price,sale_price,on_sale';
    const url = `${WC_API_URL}?_fields=${fields}&per_page=100`;
    const response = await fetch(url, { headers: { 'Authorization': WC_AUTH_HEADER } });
    if (!response.ok) {
        console.error("Không thể lấy dữ liệu sản phẩm WooCommerce");
        return new Map();
    }
    const products = await response.json();
    if (!Array.isArray(products)) {
        console.error("Dữ liệu sản phẩm WooCommerce không phải là một mảng:", products);
        return new Map();
    }
    return new Map(products.map((p: any) => [p.name.toLowerCase().trim(), p]));
};

// Hàm tiện ích để kết hợp dữ liệu
export const mapApiDataToCourse = (courseData: any, wcProduct?: any): Course => {
    const durationInfo = courseData.additional_info?.course_duration?.[0];
    let duration = "N/A";
    if (durationInfo) {
        const hours = durationInfo.hours ? `${durationInfo.hours} giờ` : '';
        const minutes = durationInfo.minutes ? `${durationInfo.minutes} phút` : '';
        duration = [hours, minutes].filter(Boolean).join(' ').trim() || "N/A";
    }

    const levelSlug = courseData.additional_info?.course_level?.[0] || "all_levels";
    const level = {
        'beginner': 'Tiêu chuẩn',
        'intermediate': 'Mở rộng',
        'advanced': 'Nâng cao',
        'all_levels': 'Tất cả trình độ'
    }[levelSlug.toLowerCase()] || 'Mọi cấp độ';

    let price = "0đ";
    let discountedPrice: string | undefined = undefined;

    if (wcProduct) {
        const regularPriceValue = parseFloat(wcProduct.regular_price);
        const salePriceValue = parseFloat(wcProduct.sale_price);

        if (wcProduct.on_sale && !isNaN(salePriceValue) && salePriceValue > 0) {
            discountedPrice = `${new Intl.NumberFormat('vi-VN').format(salePriceValue)} đ`;
            price = !isNaN(regularPriceValue) ? `${new Intl.NumberFormat('vi-VN').format(regularPriceValue)} đ` : price;
        } else if (!isNaN(regularPriceValue) && regularPriceValue > 0) {
            price = `${new Intl.NumberFormat('vi-VN').format(regularPriceValue)} đ`;
        }
    } else if (courseData.additional_info?.course_price_type?.[0] === 'free') {
        price = "0đ";
    }

    return {
        id: courseData.ID,
        title: courseData.post_title,
        level: level,
        image: courseData.thumbnail_url || "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: Math.round(courseData.ratings?.rating_avg || 0),
        duration: duration,
        instructor: courseData.post_author?.display_name || "CAP",
        price: price,
        discountedPrice: discountedPrice,
        categories: courseData.course_category?.map((cat: any) => cat.name) || [],
        tags: courseData.course_tag?.map((tag: any) => tag.name) || [],
        description: courseData.post_content || "Không có mô tả.",
        product_id: wcProduct?.id || courseData._tutor_course_product_id,
    };
};

// === CART API FUNCTIONS ===

export const fetchCart = async () => {
  const response = await fetch(`${WC_STORE_API_URL}/cart`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Không thể lấy thông tin giỏ hàng.');
  return response.json();
};

export const addToCart = async (productId: number) => {
  const response = await fetch(`${WC_STORE_API_URL}/cart/add-item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: productId, quantity: 1 }),
    credentials: 'include',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Không thể thêm vào giỏ hàng.');
  }
  return response.json();
};