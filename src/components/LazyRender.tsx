"use client";
import { useInView } from 'react-intersection-observer';
import { JSX } from 'react';
import { motion } from 'framer-motion';

interface LazyRenderProps {
  children: (inView: boolean) => JSX.Element;
  threshold?: number;
  id?: string
}

export default function LazyRender({ children, threshold = 0.3, id }: LazyRenderProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });

  return (
    id ?
      <div id={id} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
        >
          {children(inView)}
        </motion.div>
      </div>
      :
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
        >
          {children(inView)}
        </motion.div>
      </div>
  );
}