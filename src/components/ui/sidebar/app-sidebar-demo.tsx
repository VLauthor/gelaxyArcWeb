// app-sidebar.tsx
"use client"

import { Briefcase, Calendar, Clapperboard, HardDrive, ListChecks, MessageCircle, MoreHorizontal, ScanFace, UserCheck } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import useTheme from "@/use/useTheme"
import { NavUserDemo } from "../../nav-user-demo"
import { MdSupport } from "react-icons/md"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import React from "react"
import { Input } from "@/components/ui/input"

const items = [
  {
    title: "Speaker", url: "#", icon: MessageCircle, notif: 23,
    items: [
      {
        title: "Прочитать все",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "VMeste", url: "#", icon: ScanFace, notif: 23,
    items: [
      {
        title: "Рекомендации",
        url: "#",
      },
      {
        title: "Выложить",
        url: "#",
      },
      {
        title: "Профилиль",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "WorkFocus", url: "#", icon: Briefcase, notif: 23,
    items: [
      {
        title: "Поставить таймер",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "MissionMate", url: "#", icon: Calendar, notif: 23,
    items: [
      {
        title: "Создать запись",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "NovaView", url: "#", icon: Clapperboard, notif: 23,
    items: [
      {
        title: "Рекомендации",
        url: "#",
      },
      {
        title: "История просмотрам",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "AstroBoard", url: "#", icon: ListChecks, notif: 23,
    items: [
      {
        title: "Спринты",
        url: "#",
      },
      {
        title: "Мои задачи",
        url: "#",
      },
      {
        title: "Создать задачу",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "WorkSearch", url: "#", icon: UserCheck, notif: 23,
    items: [
      {
        title: "Мое резюме",
        url: "#",
      },
      {
        title: "Отклики",
        url: "#",
      },
      {
        title: "Собеседовование",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
  {
    title: "NebulaDrive", url: "#", icon: HardDrive, notif: 23,
    items: [
      {
        title: "Мои файлы",
        url: "#",
      },
      {
        title: "Загрузить",
        url: "#",
      },
      {
        title: "Заглушить уведомления на время",
        url: "#",
      },
      {
        title: "Скрыть приложение",
        url: "#",
      },
    ],
  },
]

export function AppSidebarDemo() {
  const { theme } = useTheme();
  const { isMobile } = useSidebar()

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.shiftKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Sidebar className="relative h-full self-stretch border-none rounded-xl" collapsible="icon" variant="sidebar">
      <SidebarHeader className="rounded-t-2xl" >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {theme === "dark" ?
                    <Image src="/logoDark.svg"
                      width={25}
                      height={25}
                      alt="VMeste Logo"
                    /> : <Image src="/logoLight.svg"
                      width={25}
                      height={25}
                      alt="VMeste Logo"
                    />}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Gelaxy Arc</span>
                  <span className="truncate text-xs">Самое время отдохнуть</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
              ⇧
            </kbd>
            <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--foreground)]/20 text-[var(--foreground)]/70 bg-[var(--foreground)]/5 backdrop-blur-sm">
              S
            </kbd>
          </div>
        </div>
      </SidebarHeader >
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="">Приложения</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <DropdownMenu key={item.title}>
                  <SidebarMenuItem key={item.title} className="">
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <item.icon />
                        {item.title}
                        <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--foreground)]/20 text-[var(--foreground)]/70 bg-[var(--foreground)]/5 backdrop-blur-sm ml-auto">
                          {item.notif}
                        </kbd>
                        <MoreHorizontal />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    {item.items?.length ? (
                      <DropdownMenuContent
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                        className="min-w-56 rounded-lg"

                      >
                        <ScrollArea className="w-48 rounded-md border bg-background/40 backdrop-blur-md">
                          <div className="p-4 flex flex-col gap-2">
                            <h4 className="mb-4 text-sm leading-none font-medium">Действия</h4>
                            {item.items.map((item) => (
                              <DropdownMenuItem asChild key={item.title} className=" bg-background/80 py-1 px-2 rounded-lg">
                                <a href={item.url}>{item.title}</a>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </ScrollArea>
                      </DropdownMenuContent>
                    ) : null}
                  </SidebarMenuItem>
                </DropdownMenu>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem >
                <SidebarMenuButton asChild size="sm">
                  <div>
                    <MdSupport />
                    <span>Поддержка</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="rounded-b-2xl">
        <NavUserDemo users={
          [
            {
              name: "Иванов Иван",
              email: "ivanovivan@galaxyarc.com",
              avatar: ""
            },
            {
              name: "Петров Пктор",
              email: "petrovpeter@galaxyarc.com",
              avatar: ""
            },
            {
              name: "Синичкин Семен",
              email: "senichkinsemen@galaxyarc.com",
              avatar: ""
            },
          ]
        } />
      </SidebarFooter>
    </Sidebar >
  )
}