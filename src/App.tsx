import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { AlertTriangle } from "lucide-react";
import { CartProvider } from "./context/CartContext";

// Skeletons
import LearningHubSkeleton from "./pages/skeletons/LearningHubSkeleton";

// Pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LearningHub = lazy(() => import("./pages/LearningHub"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));

const queryClient = new QueryClient();

const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
    <h1 className="text-2xl font-bold mb-2">Đã xảy ra lỗi</h1>
    <p className="text-gray-600">
      Không thể tải trang này. Vui lòng thử làm mới trang.
    </p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <CartProvider>
        <BrowserRouter>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Index />
                  </Suspense>
                } 
              />
              <Route 
                path="/learning-hub" 
                element={
                  <Suspense fallback={<LearningHubSkeleton />}>
                    <LearningHub />
                  </Suspense>
                } 
              />
              <Route 
                path="/courses/:courseId" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <CourseDetail />
                  </Suspense>
                } 
              />
              <Route 
                path="*" 
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <NotFound />
                  </Suspense>
                } 
              />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;