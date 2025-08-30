"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import ThemeButton from "./ThemeButton"
import useTheme from "@/use/useTheme"
import AnimatedButton from "@/components/ui/AnimatedButton"
import LiquidGlassEffect from "@/components/liquid-glass-effect"
import { defBlur, defBorder } from "@/components"

const components: { title: string; href: string; }[] = [
  {
    title: "Главная",
    href: "#general",
  },
  {
    title: "Идеи",
    href: "#ideas",
  },
  {
    title: "Преимущества",
    href: "#advantages",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
  },
  {
    title: "Статистика",
    href: "#stats",
  },
  {
    title: "Приложения",
    href: "#apps",
  },
]

export function NavigationMenuGeneral() {
  const { theme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <NavigationMenu viewport={false} className="top-4 fixed z-50 w-full px-8">
      <NavigationMenuList className="flex flex-row items-center justify-between min-w-screen w-full px-8">
        <div className="flex flex-row items-center justify-center gap-1">
          <NavigationMenuItem>
            <div className={cn(navigationMenuTriggerStyle(), "bg-white/0 backdrop-blur-xs")}>
              <div className="flex items-center gap-2 flex-row" >
                {
                  theme === "light" ?
                    <Image src="/logoDark.svg"
                      width={32}
                      height={32}
                      alt="VMeste Logo"
                    /> : <Image src="/logoLight.svg"
                      width={32}
                      height={32}
                      alt="VMeste Logo"
                    />
                }
                {/* <span className="text-xl font-bold">Gelaxy Arc</span> */}
              </div>
            </div>
          </NavigationMenuItem>
          {
            components.map((item) => (
              <NavigationMenuItem
                key={item.title}
              >
                <NavigationMenuLink asChild className={cn("shadow-2xl rounded-sm border glass", defBlur, defBorder)}>
                  <Link href={item.href} className="text-lg">
                    <LiquidGlassEffect />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))
          }
        </div >
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="relative w-fit">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Поиск..."
              className="pr-14 backdrop-blur-xs"
              aria-label="Поиск"
            />
            <div className="pointer-events-none absolute inset-y-0 right-2 hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--foreground)]/20 text-[var(--foreground)]/70 bg-[var(--foreground)]/5 backdrop-blur-sm">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--foreground)]/20 text-[var(--foreground)]/70 bg-[var(--foreground)]/5 backdrop-blur-sm">
                K
              </kbd>
            </div>
          </div>
          <AnimatedButton label="Войти" whileHover={"reverse"} className="h-auto py-1 w-fit px-8" colorReverce={true} backgroundView={false} />
          <ThemeButton />
        </div>
      </NavigationMenuList >
    </NavigationMenu >
  )
}


