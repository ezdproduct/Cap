import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, delay = 0.1 }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;