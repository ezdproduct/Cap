import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import { Clock, BarChart, User, Star, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const imageUrl = product.images[0]?.src || '/placeholder.svg';
  
  // Safe fallbacks for new fields in case they are undefined
  const rating = product.rating || 0;
  const duration = product.duration || "N/A";
  const level = product.level || "Mọi cấp độ";
  const instructor = product.instructor || "CAP English";

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb / Header Section could go here */}
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Mobile only */}
            <div className="lg:hidden rounded-xl overflow-hidden bg-white shadow-sm mb-6">
               <div className="relative aspect-video w-full">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </span>
                  <span className="font-medium ml-1">{rating > 0 ? `${rating}.0` : 'Chưa có đánh giá'}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Giảng viên: <strong>{instructor}</strong></span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                   <BarChart className="w-4 h-4" />
                   <span>{level}</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Giới thiệu khóa học</h2>
                <div
                  className="prose prose-blue max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar / Sticky Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Desktop Image */}
                <div className="hidden lg:block relative aspect-video w-full bg-gray-100">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-6">
                     <div
                        className="text-3xl font-bold text-cap-dark-blue mb-1 flex items-end gap-2"
                      >
                         {product.discountedPrice ? (
                           <>
                             <span>{product.discountedPrice}</span>
                             <span className="text-lg text-gray-400 line-through font-normal mb-1">{product.regular_price}</span>
                           </>
                         ) : (
                            <span dangerouslySetInnerHTML={{__html: product.price_html}} />
                         )}
                      </div>
                      {product.on_sale && (
                        <Badge variant="destructive" className="mt-2">Giảm giá</Badge>
                      )}
                  </div>

                  <div className="flex flex-col gap-3 mb-6">
                    <AddToCartButton product={product} size="lg" className="w-full bg-cap-purple hover:bg-cap-dark-blue transition-colors text-lg h-12" />
                    <div className="flex justify-center">
                        <WishlistButton product={product} />
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-gray-600 pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400"/> Thời lượng</span>
                      <span className="font-medium">{duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><BarChart className="w-4 h-4 text-gray-400"/> Trình độ</span>
                      <span className="font-medium">{level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-400"/> Chứng chỉ</span>
                      <span className="font-medium">Có</span>
                    </div>
                     <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400"/> Học viên</span>
                      <span className="font-medium">Không giới hạn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}