"use client"

import {
  BadgeCheck,
  Bell,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { UsersSwitcher } from "./ui/switch-users"
import AvatarView from "./ui/avatar-view"

export function NavUserDemo({
  users,
}: {
  users: {
    name: string
    email: string
    avatar: string
  }[]
}) {
  const { isMobile } = useSidebar()




  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-sidebar-accent-foreground p-0 flex items-center justify-center"
            >
              <AvatarView lastName={"Шандыбин"} firstName={"Владислав"} avatar={""} className="aspect-square h-3/4 font-bold font-stretch-105% line-clamp-1" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UsersSwitcher users={users} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="">
              <DropdownMenuItem className="fill-foreground bg-blue-500/50 rounded-lg focus:bg-blue-500 ease-in-out duration-300">
                <Sparkles color="var(--foreground)" />
                Прокачать план
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Аккаунт
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Уведомления
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Настройки
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
