import { useIsFetching } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const TopLoader = () => {
  const isFetching = useIsFetching();

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <AnimatePresence>
        {isFetching > 0 && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full bg-cap-sky-blue"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopLoader;