"use client"
import React from 'react';
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

export default function AnimatedCard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
  };

  const inputWrapper = {
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="w-1/3 h-fit p-10 bg-gradient-to-b from-[#1a1b23ee] to-[#191a21ee] border-0 shadow-2xl backdrop-blur-3xl rounded-2xl relative"
    >
      <CardHeader className="flex flex-col relative">
        <div className="fixed left-6 top-6 flex gap-2">
          {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full shadow"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between w-full pt-3">
          <CardTitle className="text-white text-3xl font-bold">Попробовать</CardTitle>
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <Button variant="link">Регистрация</Button>
          </motion.div>
        </div>
        <CardDescription className="text-white text-sm mt-2">
          Войдите в свою учетную запись GalaxyArc, чтобы начать использовать все возможности платформы.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="text-white flex flex-col gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid gap-2">
            <Label htmlFor="email">Почта</Label>
            <motion.div variants={inputWrapper}>
              <Input id="email" type="email" placeholder="m@example.com" required className="w-full" />
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <motion.a href="#" whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }} className="text-sm underline-offset-4 hover:underline">
                Забыли пароль?
              </motion.a>
            </div>
            <motion.div variants={inputWrapper}>
              <Input id="password" type="password" required className="w-full" />
            </motion.div>
          </motion.div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 mt-2">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className='w-full'>
          <Button type="submit" className="w-full">Войти</Button>
        </motion.div>
        <div className="w-full flex justify-between gap-4 mt-0">
          <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            <Button variant="outline">Войти с помощью Telegram</Button>
          </motion.div>
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <Button variant="outline">QR-code</Button>
          </motion.div>
        </div>
      </CardFooter>
    </motion.div>
  );
}
