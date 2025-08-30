"use client";
import { motion } from 'framer-motion';

const banners = [
  {
    title: 'Идея 1',
    desc: 'Описание идеи 1',
    tags: ['новое', 'интересное'],
  },
  {
    title: 'Идея 2',
    desc: 'Описание идеи 2',
  },
  {
    title: 'Идея 3',
    desc: 'Описание идеи 3',
    tags: ['популярное'],
  },
];

export default function IdeaBlock() {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {banners.map((b, idx) => (
        <motion.div
          key={idx}
          className="relative min-w-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="h-48 bg-gradient-to-br from-purple-600 to-violet-800" />
          <div className="h-full px-4 py-4 bg-black/80 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-white/85 text-sm leading-relaxed mb-3">{b.desc}</p>
              {/* Теги */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(b.tags || ["новое", "популярное", "рекомендация"]).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Кнопка Подробнее */}
            <button
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              onClick={() => console.log(`Подробнее: ${b.title}`)}
            >
              Подробнее
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
