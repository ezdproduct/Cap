import LoadingSpinner from "@/components/ui/LoadingSpinner";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner />
    </div>
  );
};

export default FullPageLoader;