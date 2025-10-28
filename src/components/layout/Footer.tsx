import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-cap-dark-blue text-gray-300">
      <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Logo and Contact */}
        <div className="space-y-4 text-center sm:text-left">
          <a href="/" className="flex items-center justify-center sm:justify-start space-x-2">
            <img 
              src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-white-1.png" 
              alt="CAP English Training Logo" 
              className="h-10 w-auto" 
            />
          </a>
          <a href="mailto:info@e.learnwithcap.com" className="block hover:text-white text-base pt-4">
            info@e.learnwithcap.com
          </a>
          <a href="tel:0328859540" className="block hover:text-white text-base">
            0328859540
          </a>
        </div>

        {/* Column 2: Hữu ích */}
        <div className="mt-6 sm:mt-0">
          <h4 className="font-semibold text-white mb-4 uppercase">HỮU ÍCH</h4>
          <ul className="space-y-3 text-base">
            <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Khóa học online 1:1</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Khóa học trực tiếp tại doanh nghiệp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tài nguyên</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản riêng tư</a></li>
          </ul>
        </div>

        {/* Column 3: Kết nối */}
        <div className="mt-6 lg:mt-0">
          <h4 className="font-semibold text-white mb-4 uppercase">KẾT NỐI ĐẾN CAP</h4>
          <ul className="space-y-3 text-base">
            <li><a href="#" className="hover:text-white transition-colors">Facebook/Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>

        {/* Column 4: Liên hệ */}
        <div className="mt-6 lg:mt-0">
          <h4 className="font-semibold text-white mb-4 uppercase">LIÊN HỆ TƯ VẤN</h4>
          <form className="flex">
            <Input 
              type="email" 
              placeholder="Vui lòng nhập email" 
              className="bg-gray-800 border-gray-700 text-white rounded-r-none focus:ring-cap-purple placeholder:text-gray-400" 
            />
            <Button type="submit" className="rounded-l-none bg-cap-purple hover:bg-cap-purple/90">Gửi</Button>
          </form>
        </div>
      </div>
      
      <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl py-4 text-center text-sm">
        <p>&copy; Bản quyền {new Date().getFullYear()} thuộc về CAP</p>
      </div>
    </footer>
  );
};

export default Footer;