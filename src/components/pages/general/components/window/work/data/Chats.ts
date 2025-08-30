import { Chat } from "./MessageData";
import { defUsers } from "./Users";

export const defChats: Record<number, Chat[]> = {
  1: [
    {
      id: 101,
      folderId: 1,
      users: {
        1: defUsers[1],
        2: defUsers[2],
      },
      avatar: defUsers[1].avatar,
      type: "personal",
    },
    {
      id: 102,
      folderId: 1,
      users: {
        3: defUsers[3],
        4: defUsers[4],
        5: defUsers[5],
      },
      avatar: "https://i.pravatar.cc/150?u=group101",
      type: "group",
    },
    {
      id: 103,
      folderId: 1,
      users: {
        6: defUsers[6],
      },
      avatar: "https://i.pravatar.cc/150?u=channel101",
      type: "chanel",
    },
    {
      id: 104,
      folderId: 1,
      users: {
        7: defUsers[7],
        8: defUsers[8],
        9: defUsers[9],
        10: defUsers[10],
      },
      avatar: "https://i.pravatar.cc/150?u=group102",
      type: "group",
    },
    {
      id: 105,
      folderId: 1,
      users: {
        11: defUsers[11],
        12: defUsers[12],
      },
      avatar: defUsers[11].avatar,
      type: "personal",
    },
    {
      id: 106,
      folderId: 1,
      users: {
        13: defUsers[13],
        14: defUsers[14],
        15: defUsers[15],
        16: defUsers[16],
      },
      avatar: "https://i.pravatar.cc/150?u=group103",
      type: "group",
    },
  ],
  2: [
    {
      id: 201,
      folderId: 2,
      users: {
        17: defUsers[17],
        18: defUsers[18],
      },
      avatar: defUsers[17].avatar,
      type: "personal",
    },
    {
      id: 202,
      folderId: 2,
      name: "Общалка",
      users: {
        19: defUsers[19],
        20: defUsers[20],
        21: defUsers[21],
      },
      avatar: "https://i.pravatar.cc/150?u=family202",
      type: "group",
    },
    {
      id: 203,
      folderId: 2,
      name: "Канал здравого смысла",
      users: {
        22: defUsers[22],
      },
      avatar: "https://i.pravatar.cc/150?u=channel202",
      type: "chanel",
    },
    {
      id: 204,
      folderId: 2,
      name: "чоч",
      users: {
        23: defUsers[23],
        24: defUsers[24],
        25: defUsers[25],
        26: defUsers[26],
      },
      avatar: "https://i.pravatar.cc/150?u=family204",
      type: "group",
    },
    {
      id: 205,
      folderId: 2,
      users: {
        27: defUsers[27],
      },
      name: "Личный",
      avatar: "https://i.pravatar.cc/150?u=channel203",
      type: "chanel",
    },
    {
      id: 206,
      folderId: 2,
      users: {
        28: defUsers[28],
        29: defUsers[29],
      },
      avatar: defUsers[28].avatar,
      type: "personal",
    },
  ],
  3: [
    {
      id: 301,
      folderId: 3,
      users: {
        30: defUsers[30],
        31: defUsers[31],
        32: defUsers[32],
      },
      avatar: "https://i.pravatar.cc/150?u=work301",
      type: "group",
    },
    {
      id: 302,
      folderId: 3,
      users: {
        33: defUsers[33],
      },
      avatar: "https://i.pravatar.cc/150?u=channel301",
      type: "chanel",
    },
    {
      id: 303,
      folderId: 3,
      users: {
        34: defUsers[34],
        35: defUsers[35],
      },
      avatar: defUsers[34].avatar,
      type: "personal",
    },
    {
      id: 304,
      folderId: 3,
      users: {
        36: defUsers[36],
        37: defUsers[37],
        38: defUsers[38],
        39: defUsers[39],
      },
      avatar: "https://i.pravatar.cc/150?u=work304",
      type: "group",
    },
    {
      id: 305,
      folderId: 3,
      users: {
        40: defUsers[40],
      },
      avatar: "https://i.pravatar.cc/150?u=channel302",
      type: "chanel",
    },
    {
      id: 306,
      folderId: 3,
      users: {
        41: defUsers[41],
        42: defUsers[42],
      },
      avatar: defUsers[41].avatar,
      type: "personal",
    },
  ],
  4: [
    {
      id: 401,
      folderId: 4,
      users: {
        43: defUsers[43],
        44: defUsers[44],
      },
      avatar: defUsers[43].avatar,
      type: "personal",
    },
    {
      id: 402,
      folderId: 4,
      users: {
        45: defUsers[45],
        46: defUsers[46],
        47: defUsers[47],
      },
      avatar: "https://i.pravatar.cc/150?u=edu401",
      type: "group",
    },
    {
      id: 403,
      folderId: 4,
      users: {
        48: defUsers[48],
      },
      avatar: "https://i.pravatar.cc/150?u=edu402",
      type: "chanel",
    },
    {
      id: 404,
      folderId: 4,
      users: {
        49: defUsers[49],
        50: defUsers[50],
      },
      avatar: defUsers[49].avatar,
      type: "personal",
    },
    {
      id: 405,
      folderId: 4,
      users: {
        10: defUsers[10],
        20: defUsers[20],
        30: defUsers[30],
      },
      avatar: "https://i.pravatar.cc/150?u=edu405",
      type: "group",
    },
    {
      id: 406,
      folderId: 4,
      users: {
        15: defUsers[15],
      },
      avatar: "https://i.pravatar.cc/150?u=edu406",
      type: "chanel",
    },
  ],
  5: [
    {
      id: 501,
      folderId: 5,
      users: {
        5: defUsers[5],
        6: defUsers[6],
      },
      avatar: defUsers[5].avatar,
      type: "personal",
    },
    {
      id: 502,
      folderId: 5,
      users: {
        7: defUsers[7],
      },
      avatar: "https://i.pravatar.cc/150?u=personal502",
      type: "chanel",
    },
    {
      id: 503,
      folderId: 5,
      users: {
        8: defUsers[8],
        9: defUsers[9],
        10: defUsers[10],
      },
      avatar: "https://i.pravatar.cc/150?u=personal503",
      type: "group",
    },
    {
      id: 504,
      folderId: 5,
      users: {
        11: defUsers[11],
      },
      avatar: "https://i.pravatar.cc/150?u=personal504",
      type: "chanel",
    },
    {
      id: 505,
      folderId: 5,
      users: {
        12: defUsers[12],
        13: defUsers[13],
      },
      avatar: defUsers[12].avatar,
      type: "personal",
    },
    {
      id: 506,
      folderId: 5,
      users: {
        14: defUsers[14],
        15: defUsers[15],
        16: defUsers[16],
      },
      avatar: "https://i.pravatar.cc/150?u=personal506",
      type: "group",
    },
  ],
};
