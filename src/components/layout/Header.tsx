import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartContext } from "../../context/CartContext";

const navItems = [
  { name: "Khóa học", href: "/learning-hub" },
  { name: "Giải Pháp", href: "/#solutions" },
];

const LOGIN_URL = "https://course.learnwithcap.com/tai-khoan/";

const Header = () => {
  const location = useLocation();
  const { cart } = useCartContext();
  const itemCount = cart?.items_count || 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="px-10 mx-auto max-w-screen-2xl flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="https://learnwithcap.com/wp-content/uploads/2025/06/cap-logo-1.png" 
            alt="CAP English Training Logo" 
            className="h-10 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-gray-100 p-1 rounded-full">
          {navItems.map((item) => {
            let isActive = false;
            if (item.href === '/learning-hub') {
                isActive = location.pathname.startsWith('/learning-hub');
            } else if (item.href === '/#solutions') {
                isActive = location.hash === '#solutions' && location.pathname === '/';
            }

            const NavComponent = item.href.startsWith('/#') ? 'a' : Link;

            return (
              <NavComponent
                key={item.name}
                to={item.href}
                href={item.href}
                className={`rounded-full px-4 py-1.5 text-base font-medium transition-colors ${
                  isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.name}
              </NavComponent>
            );
          })}
        </nav>

        {/* CTA & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Shopping Cart"
              className="relative text-gray-600 hover:bg-transparent hover:text-gray-900"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cap-purple text-white text-xs">
                  {itemCount}
                </span>
              )}
            </Button>
            
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-cap-dark-blue hover:bg-cap-purple text-white rounded-md transition-colors text-base px-4 py-1.5 h-auto"
              >
                Đăng nhập
              </Button>
            </a>
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 pt-6">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-body font-medium hover:text-primary"
                    >
                      {item.name}
                    </a>
                  ))}
                  <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-cap-dark-blue hover:bg-cap-purple text-white transition-colors">Đăng nhập</Button>
                  </a>
                  <Button variant="outline" className="flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Giỏ hàng ({itemCount})
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;