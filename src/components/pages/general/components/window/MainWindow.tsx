
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebarDemo } from "../../../../ui/sidebar/app-sidebar-demo"
import { Edit, Filter, Newspaper, Presentation } from "lucide-react"
import { MdNotifications, MdWorkOutline } from "react-icons/md"
import Clock from "../../../../ui/Clock"
const items = [{ icon: Edit }, { icon: Filter }, { icon: Newspaper }, { icon: Presentation }, { icon: MdWorkOutline }]

import * as React from 'react';
import LineComponent from "@/components/ui/LineComponent"

export default function MainWindow() {

  return (
    <div className="flex w-full h-full min-h-0 p-2">
      <SidebarProvider className="flex flex-row h-full min-h-0 items-stretch bg-transparent rounded-2xl">
        <AppSidebarDemo />
        <LineComponent variant="vertical" className="relative" />
        <div className="flex-1 min-h-0 p-2 overflow-auto rounded-2xl gap-3 flex flex-col">
          <div className="w-full flex flex-row gap-2 justify-between">
            <div className="flex w-fit h-9 items-center relative justify-between gap-2">
              {items.map((item, i) => (<div key={i} className="p-2 bg-[var(--foreground)]/15 rounded-full relative">
                <item.icon className="z-20" size={20} />
              </div>))}
            </div>
            <div className="flex w-fit h-9 items-center relative justify-between gap-2">
              <div className="flex w-fit h-9 bg-[var(--foreground)]/10 backdrop-blur-xl rounded-2xl items-center relative p-2 justify-center gap-1">
                <MdNotifications size={20} color="var(--notif-important)" />
                <span className="text-[var(--notif-important)]">Новые: 8</span>
              </div>
              <div className="flex w-fit h-9 bg-[var(--foreground)]/10 backdrop-blur-xl rounded-2xl items-center relative p-2 justify-between">
                <Clock />
              </div>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-3 grid-rows-4 gap-3">
            <div className="bg-[var(--foreground)]/10 p-4 backdrop-blur-lg rounded-md col-span-2 row-span-1 drop-shadow-lg"></div>
            <div className="bg-[var(--foreground)]/10 p-4 backdrop-blur-lg rounded-md col-span-1 row-span-2"></div>
            <div className="bg-[var(--foreground)]/10 backdrop-blur-lg rounded-md col-span-2 row-span-2">
            </div>
            <div className="bg-[var(--foreground)]/10 p-4 backdrop-blur-lg rounded-md col-span-1 row-span-1"></div>
            <div className="bg-[var(--foreground)]/10 p-4 backdrop-blur-lg rounded-md col-span-2 row-span-1"></div>
            <div className="bg-[var(--foreground)]/10 p-4 backdrop-blur-lg rounded-md"></div>
          </div>
        </div>
      </SidebarProvider >
    </div >
  )
}