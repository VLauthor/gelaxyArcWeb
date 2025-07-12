"use client";
import React, { useEffect, useRef, useState } from "react";
import VoiceWave from "./VoiceWave";
import { motion } from 'framer-motion';

const texts = [
  "Контролируйте, следите и управляйте потоков данных в комании — всё в одном месте. Простая настройка. Быстрый старт.",
  "Синхронизируйте, защищайте и резервируйте корпоративную информацию — в закрытой экосистеме. Полный контроль. Абсолютная надёжность.",
  "Автоматизируйте, ускоряйте и упрощайте рутинные операции — с помощью умных алгоритмов. Лёгкое внедрение. Мгновенная отдача.",
  "Визуализируйте, отслеживайте и демонстрируйте показатели эффективности — на единой интерактивной панели. Наглядность данных. Убедительная аналитика.",
  "Организуйте, фильтруйте и структурируйте большие массивы данных — с интеллектуальной системой. Чистота информации. Точечный доступ.",
  "Интегрируйте, объединяйте и централизуйте разрозненные источники — в универсальном хабе. Исчерпывающая картина. Единая точка правды.",
  "Тестируйте, экспериментируйте и внедряйте инновации — без риска для основной инфраструктуры. Безопасные изменения. Быстрые итерации.",
  "Масштабируйте, адаптируйте и кастомизируйте рабочие потоки — под уникальные задачи вашей команды. Гибкие сценарии. Бесшовная эволюция.",
  "Коллаборируйте, координируйте и согласовывайте действия сотрудников — в цифровом пространстве. Прозрачность процессов. Синхронная работа.",
];

export default function VoiceWaveCard({
  active,
  onHover,
  onLeave,
}: {
  active: boolean;
  onHover: (rect: DOMRect) => void;
  onLeave: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!active) return;
    if (typing) {
      let i = 0;
      intervalRef.current = setInterval(() => {
        setDisplayed(texts[current].slice(0, i + 1));
        i++;
        if (i === texts[current].length) {
          clearInterval(intervalRef.current!);
          setTimeout(() => setTyping(false), 3000);
        }
      }, 35);
    } else {
      let i = texts[current].length;
      intervalRef.current = setInterval(() => {
        setDisplayed(texts[current].slice(0, i - 1));
        i--;
        if (i === 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCurrent((prev) => (prev + 1) % texts.length);
          setTyping(true);
        }
      }, 18);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [typing, current, active]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
    <motion.div className="border-white/10 p-10 shadow-2xl bg-gradient-to-b from-[#1a1b23ee] to-[#191a21ee] rounded-2xl w-3/4 max-w-full mx-auto h-2/4 flex flex-col items-center relative gap-0" variants={cardVariants}
      animate={active ? "visible" : "hidden"}
      whileHover="hover"
      initial={{ opacity: 0, y: 0, scale: 1.0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 }}
      onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
      onMouseLeave={onLeave}
    >
      <div className="absolute left-6 top-6 flex gap-2">
        <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow" />
        <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow" />
      </div>
      <motion.h1 className="text-4xl font-bold"
        initial={{ opacity: 0, y: 0, scale: 1.0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
        onMouseLeave={onLeave}
      >GalaxyArc</motion.h1>
      <div className="flex flex-col items-center justify-start w-full h-full pt-3">
        <motion.div className="mb-14 text-left w-full h-2/6 "
          initial={{ opacity: 0, y: 0, scale: 1.0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
          onMouseLeave={onLeave}>
          <span className="text-lg text-gray-200 leading-snug font-medium flex text-center">
            {displayed}
          </span>
        </motion.div>
        <VoiceWave />
      </div>
    </motion.div>
  );
}
