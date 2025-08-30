"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import * as React from 'react';
import { WorkSidebarDemo } from "@/components/ui/sidebar/work-sodebar-demo"
import AvatarView from "@/components/ui/avatar-view";
import { History, LucideProps, Mic, Paperclip, Phone, Pin, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Message, User } from "./data/MessageData";
import MessageRender from "./message-render";
import { cn } from "@/lib/utils";
import { defBlur, defBorder } from "@/components";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import GlassSphere from "./test";
import { MagicCard } from "@/components/magicui/magic-card";
import useTheme from "@/use/useTheme"
import LiquidGlassEffect from "@/components/liquid-glass-effect";

export default function WorkWindow() {
  const { theme } = useTheme();
  const [messages, setMessages] = React.useState<Message[]>([])
  const [users, setUsers] = React.useState<Record<number, User>>({})
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const getReplayMessage = (replyUid: number): Message | null => {
    const message = messages.filter((message) => message.id === replyUid)
    if (message.length > 0) { return message[0] }
    return null
  }

  const getUsersById = (userUid: number): User | null => {
    return users[userUid] || null
  }
  const [sidbarActive, sidbarActiveSet] = React.useState<boolean>(true);
  const [detalicMenu, detalicMenuSet] = React.useState<boolean>(false);

  return (
    <div className="flex w-full min-w-0 h-full min-h-0 p-2 bg-cover bg-center"
      style={{ backgroundImage: "url('/wallpaper/5630939.jpg')" }}
    >
      <SidebarProvider className={cn("flex flex-row h-full min-h-0 items-stretch w-full min-w-0", sidbarActive && "gap-2")}>
        <WorkSidebarDemo setMessages={setMessages} setUsers={setUsers} sidbarActive={sidbarActive} sidbarActiveSet={sidbarActiveSet} detalicMenuSet={detalicMenuSet} />
        <div
          className={cn(
            "gap-2 flex flex-col min-w-0 h-full w-full transition-[width] duration-500 ease-in-out",
          )}
        >
          <div className="relative w-full h-full flex flex-col">
            {/* Верхний меню */}
            <div className="flex flex-col w-full z-20 sticky top-0 pb-2 px-2">
              <div className="flex flex-row w-full justify-between items-center mt-2">
                <button
                  className={cn("relative flex flex-row items-center w-fit px-2 gap-2 h-full rounded-full", defBorder, "overflow-hidden backdrop-blur-glass", defBlur)}
                  onClick={() => {
                    if (detalicMenu) {
                      detalicMenuSet(false)
                    } else {
                      sidbarActiveSet(false)
                      setTimeout(() => {
                        detalicMenuSet(true)
                      }, 500);
                    }
                  }}
                >
                  <LiquidGlassEffect className="absolute inset-0 w-full h-full bg-white" rounded="rounded-full" borders="x" />
                  <AvatarView lastName={"Шандыбин"} firstName={"Владислав"} avatar={""} className="aspect-square h-3/4 font-bold font-stretch-105% line-clamp-1 my-2 mx-2 -z-[1]" />
                  <div className="flex flex-col">
                    <span className="text-xd font-bold">Шандыбин Владислав</span>
                    <span className="font-bold text-xs">В сети</span>
                  </div>
                </button>
                <div className="flex flex-row gap-3 h-full justify-center items-center">
                  <BottomMenuItem icon={Pin} className={{ inner: "h-3/4 rounded-full" }} />
                  <BottomMenuItem icon={Phone} className={{ inner: "h-3/4 rounded-full" }} />
                </div>
              </div>
              {/* <div className="flex flex-row w-full items-center gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-xs text-accent-foreground">Закрепленые сообщения</span>
                  <span className="text-sm text-foreground">Сделай отчет к следующей неделе</span>
                </div>
              </div> */}
            </div>
            {/* Нижнее меню */}
            <div className="flex flex-row w-full z-20 sticky top-full pb-2 px-2 gap-2 justify-between items-center">
              <BottomMenuItem icon={Paperclip} />
              <Input
                placeholder="iMessage"
                className={cn("flex-1 bg-transparent rounded-full px-4 py-2 text-white focus:outline-none placeholder:text-foreground",
                  defBorder,
                  defBlur
                )}
              >

              </Input>
              <BottomMenuItem icon={History} />
              <BottomMenuItem icon={Smile} />
              <BottomMenuItem icon={Mic} />
            </div>
            {/* Скроллируемый контейнер сообщений */}
            <div className="absolute flex-1 flex flex-col p-2 overflow-x-hidden overflow-y-auto pb-12 h-full w-full hide-scrollbar">
              {messages.map((message) => (
                <MessageRender message={message} key={message.id} getReplayMessage={getReplayMessage} getUsersById={getUsersById} />
              ))}

              {/* АвтоскрAct к последнему сообщению */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>


        <motion.div
          className={cn("glass", "relative flex w-full h-full rounded-3xl", defBorder)}
          initial={{ opacity: 0 }}
          animate={{ opacity: sidbarActive ? 0 : 1, x: !detalicMenu ? "200%" : 0, width: !detalicMenu ? "0px" : "66%" }}
          transition={{ duration: 0.4, animation: { type: "spring" } }}
        >
        </motion.div>
      </SidebarProvider >

    </div >
  )
}

interface BottomMenuItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  className?: {
    inner?: string
    inside?: string
  }
}
const BottomMenuItem = ({ icon: Icon, className }: BottomMenuItemProps) => {
  return (
    <div className={cn(
      "relative cursor-target overflow-hidden h-full aspect-square rounded-full flex items-center justify-center bg-[var(--foreground)]/10",
      defBorder,
      defBlur,
      className?.inner
    )}>
      <LiquidGlassEffect className="absolute inset-0 w-full h-full opacity-40" rounded="rounded-full" borders={false} />
      <Icon className={cn("w-2/3 h-2/3", className?.inside)} />
    </div>
  );
}