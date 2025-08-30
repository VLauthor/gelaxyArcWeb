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

export default function AnimatedCard({
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
        <TabsList ref={containerRef} className='relative flex flex-row w-full bg-white/15 backdrop-blur-2xl justify-between px-8 border-white/10 border-1' >
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
              className="w-full flex flex-col h-full p-4 shadow-2xl rounded-2xl relative justify-center items-center bg-white/15 backdrop-blur-2xl border-white/10 border-1"
            >
              <motion.div className='z-10 w-full h-full flex flex-col items-center justify-center gap-2'>
                <p className='text-white text-2xl font-bold'>Быстрый вход с помощью QR-кода</p>
                <div className='flex flex-row w-full h-full gap-3'>
                  <div className='flex flex-col w-1/2 h-full justify-center gap-3 items-center py-4'>
                    <p className='text-white text-lg text-start'>
                      Отсканируйте QR-код с вашего мобильного устройства, чтобы моментально войти без ввода данных. Это удобно, быстро и безопасно.
                    </p>
                    <button
                      className="relative z-10 w-full h-[2.3em] text-white text-[20px] font-bold overflow-hidden bg-blue-500 border-none rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1]"
                    >
                      Обновить QR-код
                    </button>
                  </div>
                  <motion.div className='w-1/2 h-11/12 flex flex-col gap-3 justify-center rounded-2xl overflow-hidden bg-blue-500 items-center px-3'>
                    <Image
                      src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
                      width={500}
                      height={500}
                      alt="QR-код для быстрого входа"
                      className='rounded-2xl'
                    />
                    <p className='text-white font-bold text-xl'>2:59</p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="flex h-[200%] absolute rounded-full overflow-hidden transform"
                style={{
                  filter: "blur(10px)",
                  background: "conic-gradient(from 0deg, #00f, #0ff, #0f0, #ff0, #f00, #f0f, #00f)",
                  transformOrigin: "center"
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={activeTab === 'qr'
                  ? { scale: 1.5, opacity: 0.8, rotate: 360 }
                  : { scale: 0, opacity: 0, rotate: 0 }}
                transition={{
                  duration: 2,
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
              className="w-full flex flex-col h-full p-4 bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl relative border-white/10 border-1"
            >
              <CardHeader className="flex flex-col relative w-full ">
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
              <CardFooter className="flex flex-col gap-2 mt-4">
                <motion.div whileHover={{ scale: 1.05 }} className='w-full'
                  initial={{ opacity: 0, y: 0, scale: 1.0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
                  onMouseLeave={onLeave}
                >
                  <button
                    className="relative z-10 w-full h-fit py-3 m-2 text-white text-[20px] font-bold overflow-hidden bg-blue-500 border-none rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1]"
                  >
                    Войти
                  </button>
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
              className="w-full flex flex-col h-full p-4 bg-white/15 backdrop-blur-2xl shadow-2xl rounded-2xl relative border-white/10 border-1"
            >
              <motion.div className='z-10 w-full h-full flex flex-col items-center justify-center gap-4'>
                <p className='text-white text-2xl font-bold'>Быстрый вход через Telegram</p>

                <div className='flex flex-row w-full h-full gap-3'>
                  <div className='flex flex-col w-1/2 h-full justify-center gap-3 py-4'>
                    <p className='text-white text-base'>
                      Войдите всего в один клик через Telegram. Мы не получаем доступ к вашим перепискам — только имя и ID, чтобы авторизовать вас быстро и безопасно.
                    </p>

                    <button
                      onClick={() => window.open("https://t.me/your_bot?start=login", "_blank")}
                      className="relative z-10 w-full h-[2.3em] text-white text-[20px] font-bold overflow-hidden bg-blue-500 border-none rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1]"
                    >
                      Войти
                    </button>
                  </div>

                  <motion.div className='w-1/2 h-full flex items-center justify-center rounded-2xl overflow-hidden'>
                    <div
                      className="w-[200px] h-[200px] rounded-xl bg-blue-500 flex items-center justify-center p-4 transition-transform duration-500 hover:scale-105 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="120"
                        height="120"
                        viewBox="0 0 240 240"
                        fill="white"
                        className="transition-transform duration-500 group-hover:rotate-[5deg] group-hover:scale-110"
                      >
                        <path d="M120,0C53.7,0,0,53.7,0,120s53.7,120,120,120s120-53.7,120-120S186.3,0,120,0z M177.1,83.1l-22.4,105.6
      c-1.7,7.6-6.2,9.4-12.5,5.8l-34.5-25.4l-16.6,15.9c-1.8,1.8-3.3,3.3-6.8,3.3l2.5-35.1l64-57.7c2.8-2.5-0.6-3.8-4.3-1.4L86.4,135.4
      l-34-10.6c-7.4-2.3-7.5-7.4,1.5-11l131.4-50.6C175,60.9,180.5,67.5,177.1,83.1z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div >
    </Tabs >
  );
}
