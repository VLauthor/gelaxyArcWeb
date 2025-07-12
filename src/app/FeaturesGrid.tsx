"use client";
import { motion } from "framer-motion";

const features = [
  { title: "Long Term Retention", description: "" },
  { title: "Data secure", description: "Ensure that only the right people and approved devices can access your company’s information." },
  { title: "Keyboard Shortcut", description: "" },
  { title: "Effortless Team Collaboration", description: "Streamline your team’s efforts by seamlessly integrating services at all stack levels, minimizing setup time to mere minutes, not days." },
  { title: "Gain Valuable Insights", description: "Monitor and analyse everything using built-in analytics, Google Analytics, and additional tools to extract meaningful insights." },
  { title: "Sync With your mail", description: "" },
  { title: "Seamless Integration Across All Levels", description: "Easily link services at all levels of your stack for a rapid launch in minutes, not days." },
  { title: "Build your ideas!", description: "" },
];

export default function FeaturesGrid({
  active,
  onHover,
  onLeave,
}: {
  active: boolean;
  onHover: (rect: DOMRect, newContent?: boolean) => void;
  onLeave: () => void;
}) {
  if (!active) return null;

  return (
    <motion.div
      className="relative cursor-none"
    >
      <section className="w-full max-w-7xl mx-auto px-6 py-24 text-white flex flex-col justify-center">
        <div className="flex flex-col w-full items-center justify-center px-2">
          <motion.h2 className="text-3xl font-bold text-center mb-6 w-fit"
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >Наши кейсы</motion.h2>

          <motion.p className="text-center text-gray-400 mb-12 w-fit"
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >Уже готовые решения для вашего удобства</motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {features.map(({ title, description }, i) => (
            <motion.div
              key={i}
              className="bg-[#151515] rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm h-[400px]"
              initial={{ opacity: 0, y: 20, scale: 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect(), true)}
              onMouseLeave={onLeave}
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              {description && <p className="text-sm text-gray-400">{description}</p>}
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div >
  );
}