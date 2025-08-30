import { User } from "lucide-react";
import { defUsers } from "./Users";
import { defFolders } from "./Folders";
import { defChats } from "./Chats";
import { defMessages } from "./Message";
import { IconType } from "react-icons/lib";

export interface Folder {
  id: number;
  title: string;
  url: string;
  icon: IconType;
  isActive: boolean;
  general?: boolean;
}

export interface Chat {
  id: number;
  folderId: number;
  users: Record<number, User>;
  name?: string;
  avatar: string;
  type: "group" | "chanel" | "personal";
}

export interface Message {
  id: number;
  chatId: number; // уникальное значение чата
  date: Date; // дата отправки
  text: string | undefined; // текст сообщения
  userUid: number; // уникальное значение отправителя
  objects: {
    images?: number[] | undefined; // уникальные значения изображений
    video?: number[] | undefined; // уникальные значения видео
    files?: number[] | undefined; // уникальные значения файлов
    geo?: [number, number] | undefined; // широта и долгота
    survey?: {
      uid: number; // уникальное значение квиза или опроса
      type: "survey" | "quiz"; // квиз или викторина
      question: string; // вопрос
      preview?: { type: "photo" | "video"; fileUid: number };
      multiAnsfer: boolean; // множественный выбор
      private: boolean; // приватный ли квиз / опрос
      answers: {
        uid: number; // уникальное значение ответа
        text: string; // текст ответа
        bool?: boolean; // правльности ответа (если викторина)
        reply: { userUIDs: number[] }; // уникальные значения пользователей выбравших ответ
      }[]; //варианты ответов
    }; // квизы / викторины
    taskBoard?: {
      uid: number; // уникальное значение списка задач
      title: string; // названия списка задач
      preview?: { type: "photo" | "video"; fileUid: number };
      private: boolean; // могут ли пользователи выбирать / редактировать список задач
      tasks: {
        uid: number; // уникальное значение ответа
        text: string; // текст ответа
        bool?: boolean; // правльности ответа (если викторина)
        reply: { userUIDs: number[] }; // уникальные значения пользователей выбравших ответ
      }[];
    }; // список задач
  };
  detalic: {
    reaction: { emogiUid: number; usersUIDs: number[] }[] | undefined; // массив реакций с uid емоджи и uid пользователей которые поставили реакцию
    viewUsers: number[] | undefined; // уникальные значения пользователей прочитавших сообщение
    replyUid: number | undefined; //уникальное значение сообщения в ответ которому было отправлено сообщение
  };
}

export interface User {
  userUid: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface DataMessangerInterface {
  users: Record<number, User>;
  folders: Folder[];
  chats: Record<number, Chat[]>;
  messages: Record<number, Message[]>;
}

type PropsClass =
  | undefined
  | {
      messages: Record<number, Message[]>;
      folders: Folder[];
      users: Record<number, User>;
      chats: Record<number, Chat[]>;
    };

export default class DataMessanger {
  private messages: Record<number, Message[]> = {};
  private folders: Folder[] = [];
  private chats: Record<number, Chat[]> = {};
  private users: Record<number, User> = {};

  constructor(props?: PropsClass) {
    if (props) {
      this.folders = props.folders || [];
      this.messages = props.messages || {};
      this.users = props.users;
      this.chats = props.chats || {};
    } else {
      this.folders = defFolders;
      this.messages = defMessages;
      this.users = defUsers;
      this.chats = defChats;
    }
  }

  // -----------------------------
  // ПАПКИ
  // -----------------------------

  addFolder(folder: Folder) {
    this.folders.push(folder);
  }

  get getDefaultFolder(): Folder {
    return (
      this.folders.filter((folder) => folder.isActive == true)[0] ||
      this.folders[0]
    );
  }

  renameFolder(folderId: number, newTitle: string) {
    const folder = this.folders.find((f) => f.id === folderId);
    if (folder) folder.title = newTitle;
  }

  deleteFolder(folderId: number) {
    // Удаляем папку
    this.folders = this.folders.filter((f) => f.id !== folderId);

    // Удаляем все чаты этой папки
    delete this.chats[folderId];

    // Удаляем все сообщения чатов этой папки
    Object.keys(this.messages).forEach((chatId) => {
      const chatFolderId = this.getFolderIdByChatId(Number(chatId));
      if (chatFolderId === folderId) delete this.messages[Number(chatId)];
    });
  }

  private getFolderIdByChatId(chatId: number): number | undefined {
    for (const folderId in this.chats) {
      if (this.chats[folderId].some((chat) => chat.id === chatId)) {
        return Number(folderId);
      }
    }
    return undefined;
  }

  // -----------------------------
  // ЧАТЫ
  // -----------------------------

  getChatsByFolder(folderId: number): Chat[] {
    return this.chats[folderId] || [];
  }

  addChat(folderId: number, chat: Chat) {
    if (!this.chats[folderId]) this.chats[folderId] = [];
    this.chats[folderId].push(chat);
    this.messages[chat.id] = []; // создаем пустой массив сообщений
  }

  deleteChat(chatId: number) {
    const folderId = this.getFolderIdByChatId(chatId);
    if (!folderId) return;

    this.chats[folderId] = this.chats[folderId].filter((c) => c.id !== chatId);

    // Удаляем все сообщения чата
    delete this.messages[chatId];
  }

  // -----------------------------
  // СООБЩЕНИЯ
  // -----------------------------

  getMessagesByChat(chatId: number): Message[] {
    return this.messages[chatId] || [];
  }

  addMessage(chatId: number, message: Message) {
    if (!this.messages[chatId]) this.messages[chatId] = [];
    this.messages[chatId].push(message);
  }

  deleteMessage(chatId: number, messageId: number) {
    if (!this.messages[chatId]) return;
    this.messages[chatId] = this.messages[chatId].filter(
      (m) => m.id !== messageId
    );
  }
  getLastMessagesByChat(chatId: number): Message | null {
    const messages = this.messages[chatId];
    if (messages == undefined) {
      return null;
    }
    return this.messages[chatId][messages.length - 1] || null;
  }

  // -----------------------------
  // ОБЩИЕ ДАННЫЕ
  // -----------------------------

  get getFolders(): Folder[] {
    return this.folders;
  }

  get getUsers(): Record<number, User> {
    return this.users;
  }

  get getChats(): Record<number, Chat[]> {
    return this.chats;
  }

  get getMessages(): Record<number, Message[]> {
    return this.messages;
  }

  get getData(): DataMessangerInterface {
    return {
      users: this.getUsers,
      folders: this.getFolders,
      chats: this.getChats,
      messages: this.getMessages,
    };
  }
}
