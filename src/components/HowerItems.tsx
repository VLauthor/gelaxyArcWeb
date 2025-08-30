"use client"
import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export function HowerItems({
  onHover,
  onLeave,
}: {
  active: boolean;
  onHover: (rect: DOMRect) => void;
  onLeave: () => void;
}) {
  const [activeTab, setActiveTab] = useState("web");

  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);
  const telegramRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });

  const tabIndexMap: Record<string, number> = { qr: 0, web: 1, telegramm: 2 };

  useLayoutEffect(() => {
    const refMap = { qr: qrRef, web: webRef, telegramm: telegramRef };
    const currentRef = refMap[activeTab];
    if (currentRef?.current && containerRef.current) {
      const rect = currentRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setHighlightStyle({
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, [activeTab]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };
  const inputWrapper = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };


  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue={"web"} className="flex flex-col w-1/3 h-1/2 rounded-2x gap-5">
      <motion.div initial={{ opacity: 0, y: 0, scale: 1.0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
        onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
        onMouseLeave={onLeave}>
        <TabsList ref={containerRef} className='relative flex flex-row w-full bg-white/15 backdrop-blur-2xl justify-between px-8' >
          <motion.div
            className="absolute bg-white/100 rounded-xl z-0"
            animate={{
              left: highlightStyle.left,
              top: highlightStyle.top,
              width: highlightStyle.width,
              height: highlightStyle.height
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
          <motion.div ref={qrRef} variants={inputWrapper} className='w-fit flex items-center justify-center z-10'
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >
            <TabsTrigger value="qr" className='text-white text-center font-bold data-[state=active]:text-black data-[state=active]:bg-transparent'>QR-Code</TabsTrigger>
          </motion.div>
          <motion.div ref={webRef} variants={inputWrapper} className='w-fit flex items-center justify-center z-10'
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >
            <TabsTrigger value="web" className='text-white text-center font-bold data-[state=active]:text-black data-[state=active]:bg-transparent'>Пароль</TabsTrigger>
          </motion.div>
          <motion.div ref={telegramRef} variants={inputWrapper} className='w-fit flex items-center justify-center z-10'
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >
            <TabsTrigger value="telegramm" className='text-white text-center font-bold data-[state=active]:text-black data-[state=active]:bg-transparent'>Телеграмм</TabsTrigger>
          </motion.div>
        </TabsList>
      </motion.div>
      <div className="overflow-hidden flex-1 min-h-0 relative rounded-2xl">
        <motion.div
          className="flex h-full space-x-4 rounded-2xl"
          animate={{ x: `calc(-${tabIndexMap[activeTab]} * (100% + 1rem))` }}
          transition={{ type: 'spring', stiffness: 700, damping: 50 }}
        >
          {/* QR Panel */}
          <div className="w-full flex-shrink-0 h-full">
            <motion.div
              viewport={{ once: true }}
              onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
              onMouseLeave={onLeave}
              whileHover="hover"
              className="w-full flex flex-col h-full p-4 bg-white/15 backdrop-blur-2xl border-0 shadow-2xl rounded-2xl relative justify-center items-center"
            >
              <motion.div className='z-10 w-full h-full'>
                <motion.div className='w-1/2 h-2/3 bg-white/60 rounded-2xl overflow-hidden'>
                  <Image src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png" width={500} height={500} alt=';' />
                </motion.div>
                <button
                  className="relative z-10 w-1/2 h-[2.3em] m-2 text-white text-[20px] font-bold overflow-hidden bg-black border-none rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1]"
                >
                  Обновить
                </button>
              </motion.div>
              <motion.div
                className="flex h-[200%] absolute rounded-full overflow-hidden"
                style={{
                  filter: "blur(10px)",
                  background: "conic-gradient(from 0deg, #00f, #0ff, #0f0, #ff0, #f00, #f0f, #00f)",
                  transformOrigin: "center"
                }}
                initial={{ scale: 0, opacity: 0, rotate: 0 }}
                animate={activeTab === 'qr'
                  ? { scale: 2, opacity: 0.7, rotate: 720 }
                  : { scale: 0, opacity: 0, rotate: 0 }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          {/* Web Panel */}
          <div className="w-full flex-shrink-0 h-full">
            <motion.div
              variants={cardVariants}
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.4, delay: 0.05 }}
              onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
              onMouseLeave={onLeave}
              whileHover="hover"
              className="w-full flex flex-col h-full p-4 bg-white/15 backdrop-blur-2xl border-0 shadow-2xl rounded-2xl relative"
            >
              <CardHeader className="flex flex-col relative w-full">
                <motion.div className="flex flex-row items-center justify-between w-full pt-3">
                  <CardTitle className="text-white text-3xl font-bold">Попробовать</CardTitle>
                  <motion.div
                    whileHover={{ x: 3 }}
                    initial={{ opacity: 0, y: 0, scale: 1.0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                    onMouseLeave={onLeave}>
                    <Button variant="link" className='w-fit text-white'><u>Регистрация</u></Button>
                  </motion.div>
                </motion.div>
                <CardDescription className="text-white text-sm mt-2">
                  Войдите в свою учетную запись GalaxyArc, чтобы начать использовать все возможности платформы.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="text-white flex flex-col gap-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid gap-2">
                    <Label htmlFor="email">Почта</Label>
                    <motion.div variants={inputWrapper}
                      initial={{ opacity: 0, y: 0, scale: 1.0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                      onMouseLeave={onLeave}
                    >
                      <Input id="email" type="email" placeholder="m@example.com" required className="w-full" />
                    </motion.div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Пароль</Label>
                      <motion.a href="#" whileHover={{ opacity: 0.7 }} className="text-sm underline-offset-4 hover:underline"
                        initial={{ opacity: 0, y: 0, scale: 1.0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                        onMouseLeave={onLeave}
                      >
                        Забыли пароль?
                      </motion.a>
                    </div>
                    <motion.div variants={inputWrapper}
                      initial={{ opacity: 0, y: 0, scale: 1.0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                      onMouseLeave={onLeave}
                    >
                      <Input id="password" type="password" required className="w-full" />
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 mt-2">
                <motion.div whileHover={{ scale: 1.05 }} className='w-full'
                  initial={{ opacity: 0, y: 0, scale: 1.0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                  onMouseLeave={onLeave}
                >
                  <Button type="submit" className="w-full">Войти</Button>
                </motion.div>
              </CardFooter>
            </motion.div>
          </div>
          {/* Telegram Panel */}
          <div className="w-full flex-shrink-0 h-full">
            <motion.div
              viewport={{ once: true }}
              onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
              onMouseLeave={onLeave}
              whileHover="hover"
              className="w-full flex flex-col h-full p-4 bg-white/15 backdrop-blur-2xl border-0 shadow-2xl rounded-2xl relative"
            />
          </div>
        </motion.div>
      </div >
    </Tabs >
  );
}

// SocialIcons.tsx
import React from 'react';
import { cn } from '@/lib/utils'; // or your utility to combine class names
import '@/styles/social-icons.css'; // You may need to move or inline styles with Tailwind later

const icons = [
  {
    name: 'instagram', bg: 'bg-[#cc39a4]', svg: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 2.75h9a4.75 4.75 0 014.75 4.75v9a4.75 4.75 0 01-4.75 4.75h-9a4.75 4.75 0 01-4.75-4.75v-9a4.75 4.75 0 014.75-4.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75h.007v.008h-.007z" />
      </svg>
    )
  },
  {
    name: 'twitter', bg: 'bg-[#03a9f4]', svg: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5c7.5 0 11.625-6.25 11.625-11.625 0-.176 0-.352-.012-.527A8.18 8.18 0 0022 5.924a8.3 8.3 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 013.18 4.722a4.106 4.106 0 001.27 5.482 4.073 4.073 0 01-1.86-.513v.05a4.108 4.108 0 003.292 4.025 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    )
  },
  // Add other icons here with their respective SVGs and bg colors
];

export default function SocialIcons() {
  return (
    <div className="relative flex flex-wrap w-[14em] items-center justify-center">
      <div className="absolute rounded-[10px] rotate-90 w-[11em] h-[11em] bg-gradient-to-l from-[#03a9f4] via-[#cc39a4] to-[#ffb5d2] shadow-[inset_0_0_180px_5px_#ffffff] z-[-2]" />
      <p className="absolute text-[0.7em] font-bold text-black text-center tracking-[0.33em] z-[3] transition-opacity duration-500 hover:opacity-0">
        HOVER<br /><br />FOR<br /><br />SOCIAL
      </p>
      {icons.map((icon, i) => (
        <div
          key={icon.name}
          className={cn(
            'flex items-center justify-center w-[60px] h-[60px] transition-all duration-300 bg-white/60 border border-transparent backdrop-blur-md hover:rounded-[10px] hover:shadow-md hover:border-white/30',
            icon.bg
          )}
        >
          {icon.svg}
        </div>
      ))}
    </div>
  );
}
