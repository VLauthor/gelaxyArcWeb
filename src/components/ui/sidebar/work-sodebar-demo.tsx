"use client"

import * as React from "react"
import { ChevronRight, Filter, MessageCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavUserDemo } from "@/components/nav-user-demo"
import { MdClose } from "react-icons/md"
import DataMessanger, { Chat, Folder, Message, User } from "@/components/pages/general/components/window/work/data/MessageData"
import AvatarView from "../avatar-view"
import { cn } from "@/lib/utils"
import { defBorder } from "@/components"
import { motion } from "motion/react"
import LiquidGlassEffect from "@/components/liquid-glass-effect"

interface WorkSidebarDemoProps extends React.ComponentProps<typeof Sidebar> {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setUsers: React.Dispatch<React.SetStateAction<Record<number, User>>>
  sidbarActive: boolean,
  sidbarActiveSet: React.Dispatch<React.SetStateAction<boolean>>
  detalicMenuSet: React.Dispatch<React.SetStateAction<boolean>>
}

export function WorkSidebarDemo({ setMessages, setUsers, sidbarActive, sidbarActiveSet, detalicMenuSet, ...props }: WorkSidebarDemoProps) {
  const [dataMessanger] = React.useState<DataMessanger>(new DataMessanger(undefined))
  const [activeFolder, setActiveFolder] = React.useState(dataMessanger.getDefaultFolder)
  const [folders] = React.useState<Folder[]>(dataMessanger.getFolders)
  const [chats, setChats] = React.useState<Chat[]>(dataMessanger.getChatsByFolder(activeFolder.id))
  const { setOpen } = useSidebar()

  React.useEffect(() => {
    setUsers(dataMessanger.getUsers)
  }, [dataMessanger, setUsers])

  const secondPanelRef = React.useRef<HTMLDivElement | null>(null)
  const [panelWidth, setPanelWidth] = React.useState(250)

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    const startX = e.clientX
    const startWidth = panelWidth

    function onMouseMove(e: MouseEvent) {
      const deltaX = e.clientX - startX
      const newWidth = Math.min(Math.max(startWidth + deltaX, 150), 600)
      setPanelWidth(newWidth > 250 ? 250 : newWidth)
    }

    function onMouseUp() {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  const [delaySidbar, delaySidbarSet] = React.useState<0 | 0.3>(0)
  const [delaySidbarBut, delaySidbarButSet] = React.useState<0 | 0.3>(0)

  const switchDelay = (switchValue: boolean) => {
    if (switchValue) {
      delaySidbarSet(0.3)
      delaySidbarButSet(0)
    } else {
      delaySidbarButSet(0.3)
      delaySidbarSet(0)
    }
  }


  return (
    <Sidebar
      collapsible="none"
      className="overflow-visible *:data-[sidebar=sidebar]:flex-row relative h-full self-stretch border-none shrink-0 w-fit flex flex-row bg-transparent"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! bg-transparent gap-2 z-10"
      >
        <SidebarHeader className={cn("rounded-xl bg-sidebar-primary text-sidebar-primary-foreground", defBorder, "glass", "overflow-hidden")}>
          <LiquidGlassEffect rounded="rounded-xl" />
          <div>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <MessageCircle color="var(--foreground)" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className={cn("rounded-xl bg-[var(--foreground)]/10", defBorder, "glass")}>
          <LiquidGlassEffect rounded="rounded-xl" />
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu className="gap-3">
                {folders.map((folder) => (
                  <SidebarMenuItem key={folder.id}>
                    <SidebarMenuButton
                      tooltip={{
                        children: folder.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        if (folder.general === true) {
                          const chatsRecord = dataMessanger.getChats;
                          const chatsArray = Object.values(chatsRecord).flat();
                          setChats(chatsArray)
                        } else {
                          setChats(dataMessanger.getChatsByFolder(folder.id))
                        }
                        setActiveFolder(folder)
                        setOpen(true)
                        sidbarActiveSet(true)
                        detalicMenuSet(false)
                      }}
                      isActive={activeFolder?.title === folder.title}
                      className={cn("bg-transparent data-[active=true]:bg-ring hover:bg-ring/20 data-[active=true]:border-ring data-[active=true]:ring-3", "glass", defBorder, "duration-1000")}
                    >
                      <folder.icon />
                      <span className="">{folder.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={cn("rounded-xl bg-[var(--foreground)]/10 p-0 items-center justify-center flex", defBorder, "glass")}>
          <LiquidGlassEffect rounded="rounded-xl" />
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
      </Sidebar>

      <motion.div
        className={cn("relative flex overflow-hidden ml-2 duration-300", !sidbarActive && "")}
        initial={{ opacity: 1, width: sidbarActive ? "250px" : "0" }}
        animate={{ opacity: sidbarActive ? 1 : 1, width: sidbarActive ? panelWidth : "0" }}
        ref={secondPanelRef}
        transition={{ delay: delaySidbar, animation: { type: "inertia" } }}
      >
        <div
          style={{ width: panelWidth }}
          className="relative flex-1 overflow-hidden overflow-x-visible max-w-[250px] min-w-[0px]"
        >
          <Sidebar collapsible="none" className="relative flex-1 overflow-hidden overflow-x-visible w-full bg-transparent gap-2 z-10">
            <SidebarHeader className={cn("rounded-xl bg-[var(--foreground)]/10", defBorder, "glass overflow-hidden")}>
              <LiquidGlassEffect rounded="rounded-xl" />
              <div className="flex w-full items-center justify-between">
                <div className="text-foreground font-medium truncate text-md">
                  {activeFolder?.title}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border px-2 py-1 text-xs hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-label="Свернуть список"
                    title="Свернуть"
                  >
                    <button className="rounded-md relative p-1" onClick={() => {
                      switchDelay(false)
                      sidbarActiveSet(false)
                    }}>
                      <MdClose size={15} />
                    </button>
                  </button>
                </div>
              </div>
              <div className="flex row w-full items-center gap-2">
                <SidebarInput placeholder="Найти..." className="" />
                <div className="border rounded-md relative p-1 border-[var(--foreground)]/30">
                  <Filter color="var(--foreground)" className="opacity-80" />
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className={cn("rounded-xl bg-[var(--foreground)]/10 hide-scrollbar", defBorder, "glass")}>
              <LiquidGlassEffect rounded="rounded-xl" />
              <SidebarGroup className="p-0 w-full border-0">
                <SidebarGroupContent className="gap-0 flex flex-col border-0">
                  {chats.map((chat, i) => {
                    const users = Object.values(chat.users)
                    const lastMessage = dataMessanger.getLastMessagesByChat(chat.id)

                    return (
                      <div
                        key={chat.id}
                        role="button"
                        tabIndex={0}
                        className={cn("data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex flex-row border py-2.5 gap-2 px-2 items-center max-h-[100px]", `${i == 0 ? 'border-t-0' : i == chats.length - 1 ? 'border-b-0' : ''}`)}
                        onClick={() => {
                          setMessages(dataMessanger.getMessagesByChat(chat.id))
                        }}
                      >
                        {chat.type === "personal" ?
                          <AvatarView lastName={users[0].lastName} firstName={users[0].firstName} avatar={chat.avatar} className="relative w-1/8 aspect-square " />
                          :
                          <AvatarView lastName={chat.name || "-_-"} firstName={""} avatar={chat.avatar} className="relative w-1/8 aspect-square " />
                        }
                        <div className="flex flex-col w-full h-full gap-1">
                          <div className="flex flex-1 text-left text-sm leading-tight flex-row justify-between">
                            <span className="truncate font-medium">{chat.type === "personal" ? users[0].lastName + ' ' + users[0].firstName : chat.name}</span>
                            <span className="text-xs">{lastMessage == null ? "" : lastMessage.date.getHours() + ":" + lastMessage.date.getMinutes()}</span>
                          </div>
                          <span className="truncate text-xsmax-w-[300px] text-wrap line-clamp-2 leading-none">{lastMessage ? lastMessage.text : ""}</span>
                        </div>
                      </div>)
                  })}
                  {/* <AnimatedThemeToggler /> */}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div
            onMouseDown={onMouseDown}
            className="absolute top-0 right-0 h-full w-1 cursor-col-resize select-none z-10"
            role="separator"
            aria-orientation="vertical"
            aria-valuemin={150}
            aria-valuemax={600}
            aria-valuenow={panelWidth}
          />
        </div>
      </motion.div >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sidbarActive ? 0 : 1, x: sidbarActive ? "-5%" : 0, width: sidbarActive ? "0px" : "100%" }}
        onClick={() => {
          switchDelay(true)
          sidbarActiveSet(true)
          detalicMenuSet(false)
        }}
        transition={{ delay: delaySidbarBut }}
        className="w-fit h-full flex items-center justify-center"
      >
        <div className={cn(defBorder, "glass", "rounded-full")}>
          <ChevronRight />
        </div>
      </motion.div>
    </Sidebar >
  )
}
