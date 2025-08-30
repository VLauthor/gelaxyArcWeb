import { Briefcase, School2, User, WalletCards } from "lucide-react";
import { Folder } from "./MessageData";
import { MdFamilyRestroom } from "react-icons/md";

export const defFolders: Folder[] = [
  {
    id: 1,
    title: "Все сообщения",
    url: "#",
    icon: WalletCards,
    isActive: false,
    general: true,
  },
  {
    id: 2,
    title: "Семья",
    url: "#",
    icon: MdFamilyRestroom,
    isActive: true,
  },
  {
    id: 3,
    title: "Работа",
    url: "#",
    icon: Briefcase,
    isActive: false,
  },
  {
    id: 4,
    title: "Обучение",
    url: "#",
    icon: School2,
    isActive: false,
  },
  {
    id: 5,
    title: "Личная",
    url: "#",
    icon: User,
    isActive: false,
  },
];
