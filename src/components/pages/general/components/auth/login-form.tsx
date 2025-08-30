"use client"

import { motion, } from "motion/react";
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResizableHandle } from "@/components/ui/resizable";
import AnimatedButton from "@/components/ui/AnimatedButton";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent border-0 fill-[var(--foreground)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Войдите в ваш аккаунт</CardTitle>
          <CardDescription className="text-base font-medium">
            Мы предлагаем несколько способов входа, выберите наиболее удобный для вас.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Почта</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="cursor-target"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" >Пароль</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-blue-500/90 text-shadow-[var(--foreground)] cursor-target"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input id="password" type="password" required className="cursor-target" />
              </div>
              <ResizableHandle className="border-dashed bg-transparent border w-full" />
              <div className="flex flex-col gap-3">
                <AnimatedButton label="Войти" whileHover={{ scale: 1.05 }} border="solid" />
                <div className="flex flex-row gap-4 w-full items-center justify-between">
                  <ResizableHandle className="border-solid bg-transparent border w-full" />
                  <p className="w-full text-nowrap text-center text-base text-[var(--foreground)]/90">Или войти с помощью</p>
                  <ResizableHandle className="border-solid bg-transparent border w-full" />
                </div>
                <div className="flex flex-row gap-4 w-full items-center justify-between">
                  <AnimatedButton label="Телеграм" whileHover="reverse" border="dashed" />
                  <AnimatedButton label="QR-code" whileHover="base" border="dashed" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Еще не создали акаунт?{" "}
              <a href="#" className="underline underline-offset-4 cursor-target">
                Создать
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}
