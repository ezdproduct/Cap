import React from "react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 pb-12 bg-white">
      <div className="px-4 sm:px-10 mx-auto max-w-screen-2xl">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div className="pt-[43.75%] relative">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://learnwithcap.com/wp-content/uploads/2025/10/0701.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;