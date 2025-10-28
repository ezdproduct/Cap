"use client";

import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const FloatingChatButton = () => {
  const scrollDirection = useScrollDirection();

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      <motion.button
        variants={variants}
        initial="visible"
        animate={scrollDirection === "down" ? "hidden" : "visible"}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="fixed bottom-6 right-6 bg-cap-purple text-white rounded-full p-4 shadow-lg hover:bg-cap-purple/90 focus:outline-none focus:ring-2 focus:ring-cap-purple focus:ring-offset-2 z-50"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingChatButton;