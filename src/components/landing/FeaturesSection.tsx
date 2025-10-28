import React from "react";
import { LucideIcon, RefreshCw, BookText, Mic, Users, Target } from "lucide-react";

const solutions = [
  {
    icon: RefreshCw,
    description: "Xây dựng thói quen và kỹ năng tự học",
  },
  {
    icon: BookText,
    description: "Thực hành giao tiếp tiếng Anh với mẫu câu, từ vựng sát thực tế công việc",
  },
  {
    icon: Mic,
    description: "Phát triển toàn diện kỹ năng, ưu tiên nghe nói, soạn thảo email và thuyết trình",
  },
  {
    icon: Users,
    description: "Xây dựng nền phát âm chuẩn IPA, ngữ pháp cơ bản (thực hành trong bài học, không đi sâu vào lý thuyết)",
  },
  {
    icon: Target,
    description: "Học theo lộ trình phù hợp, từ cơ bản đến nâng cao, kiến thức được lặp lại giúp nhớ lâu và sử dụng tự tin",
  },
];

const FeatureItem = ({ icon: Icon, description }: { icon: LucideIcon; description: string }) => (
  <div className="p-6 rounded-2xl bg-[#0a3253] border border-white/10 hover:border-white/20 transition-colors duration-300 h-full flex flex-col items-start text-left">
    <div className="flex-shrink-0 mb-4">
      <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center border border-white/10">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    <p className="text-base text-gray-200 flex-grow">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section id="solutions" className="py-12 md:py-16 bg-cap-dark-blue text-white">
      <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl">
        {/* Top Section: Title and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Left: Title Block */}
          <div className="flex flex-col gap-4">
            <span className="inline-block bg-cap-sky-blue text-white px-3 py-1 rounded-full text-sm font-semibold w-fit">
              GIẢI PHÁP
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Giải pháp của CAP dành cho bạn
            </h2>
          </div>
          
          {/* Right: Image Block */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://course.learnwithcap.com/wp-content/uploads/2025/10/danist-soh-8Gg2Ne_uTcM-unsplash-scaled-1.webp"
              alt="Một nhóm đang hợp tác trong văn phòng hiện đại"
              className="rounded-2xl w-full max-w-2xl h-auto object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>
        </div>

        {/* Bottom Section: Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {solutions.map((solution, index) => (
            <FeatureItem key={index} icon={solution.icon} description={solution.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;