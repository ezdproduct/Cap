import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getOrderById } from '@/lib/api';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, MapPin, Calendar, ArrowRight, ShoppingBag, Copy, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export default async function OrderConfirmationPage({ searchParams }: { searchParams: Promise<{ order_id: string }> }) {
  const { order_id } = await searchParams;
  const order = order_id ? await getOrderById(order_id) : null;

  if (!order) {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <ShoppingBag className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-3 text-cap-dark-blue">Không tìm thấy đơn hàng</h1>
            <p className="text-gray-500 mb-8 max-w-md">Có vẻ như mã đơn hàng không hợp lệ hoặc đã xảy ra lỗi trong quá trình xử lý.</p>
            <Button asChild className='bg-cap-purple hover:bg-cap-dark-blue text-white'>
                <Link href="/shop">Quay lại cửa hàng</Link>
            </Button>
        </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50/50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT COLUMN: Success Message & Info */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center relative">
            {/* Decor background pattern */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cap-sky-blue via-cap-purple to-cap-dark-blue" />
            
            <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-500">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-cap-dark-blue mb-4">Cảm ơn bạn đã đặt hàng!</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Đơn hàng <span className="font-semibold text-gray-900">#{order.id}</span> đã được xác nhận. 
                    Chúng tôi đã gửi email chi tiết tới <span className="font-semibold text-cap-purple">{order.billing.email}</span>.
                </p>
            </div>

            {/* Next Steps / Bank Info */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                {order.payment_method === 'bacs' ? (
                     <div className="space-y-3">
                        <h3 className="font-bold text-cap-dark-blue flex items-center gap-2">
                            Thông tin chuyển khoản
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Ngân hàng: <span className="font-semibold text-gray-900">Vietcombank</span></p>
                            <p>Số tài khoản: <span className="font-semibold text-gray-900">123456789</span></p>
                            <p>Chủ tài khoản: <span className="font-semibold text-gray-900">CAP ENGLISH TRAINING</span></p>
                            <p className="text-cap-purple mt-2 bg-purple-50 inline-block px-3 py-1 rounded-md border border-purple-100">
                                Nội dung: <strong>Mã đơn #{order.id}</strong>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                         <h3 className="font-bold text-cap-dark-blue">Trạng thái đơn hàng</h3>
                         <p className="text-sm text-gray-600">
                            Đội ngũ tư vấn của CAP English sẽ sớm liên hệ để xác nhận lộ trình học và kích hoạt tài khoản cho bạn.
                         </p>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button asChild className="bg-cap-purple hover:bg-cap-dark-blue text-white h-12 text-base px-8 rounded-xl shadow-lg shadow-purple-100 transition-all hover:shadow-xl">
                    <Link href="/shop">
                        Tiếp tục khám phá <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-600" onClick={() => window.print()}>
                    In hóa đơn
                </Button>
            </div>
        </div>

        {/* RIGHT COLUMN: Receipt / Summary */}
        <div className="lg:col-span-5 bg-gray-50 border-l border-gray-100 p-8 md:p-10 flex flex-col h-full">
            <h2 className="font-bold text-lg text-cap-dark-blue mb-6 flex items-center justify-between">
                <span>Biên lai</span>
                <Badge variant="secondary" className="bg-white text-gray-500 font-normal border-gray-200">
                    {format(new Date(), 'dd/MM/yyyy')}
                </Badge>
            </h2>

            {/* Customer Info Mini */}
            <div className="mb-6 text-sm space-y-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                 <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{order.billing.first_name} {order.billing.last_name}</span>
                 </div>
                 {order.billing.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{order.billing.phone}</span>
                    </div>
                 )}
            </div>

            {/* Order Items List - Scrollable */}
            <ScrollArea className="flex-1 -mx-4 px-4 mb-6">
                <div className="space-y-4">
                    {order.line_items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-start group">
                            <div className="pr-4">
                                <p className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-cap-purple transition-colors">
                                    {item.name}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">SL: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                                {new Intl.NumberFormat('vi-VN').format(parseFloat(item.total))} đ
                            </p>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Totals */}
            <div className="mt-auto space-y-3 pt-6 border-t border-gray-200 border-dashed">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN').format(parseFloat(order.total) - parseFloat(order.shipping_total))} đ</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Giảm giá</span>
                    <span>0 đ</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-cap-dark-blue pt-2">
                    <span>Tổng thanh toán</span>
                    <span>{new Intl.NumberFormat('vi-VN').format(parseFloat(order.total))} đ</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}