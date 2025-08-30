"use client"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-fuchsia-500",
];

interface AvatarViewProps {
  lastName: string,
  firstName: string,
  avatar?: string
  className?: string
}

export default function AvatarView({ avatar, lastName, firstName, className }: AvatarViewProps) {
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)])
  return (
    <Avatar className={cn("rounded-lg text-2xl", className)}>
      <AvatarImage
        src={avatar}
        alt={lastName + " " + firstName}
        className="object-cover w-full h-full rounded-lg"
      />
      <AvatarFallback className={cn("w-full h-full flex items-center justify-center rounded-lg text-lg", color)}>
        {lastName[0] + firstName[0]}
      </AvatarFallback>
    </Avatar>
  )
}