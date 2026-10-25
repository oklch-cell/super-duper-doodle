import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface User {
  id: number;
  username: string;
  email: string;
  display_picture: string | undefined;
  access_token: string;
}

interface Message {
  text: string;
  type: "send" | "receive";
}

interface GroupMessage {
  text: string;
  sender: string;
  type: "send" | "receive";
}

interface UserState {
  user: User | null;
  usersList: string[];
}

interface UserAction {
  userSet: (user: User | null) => void;
  usersListSet: (usersList: string[]) => void;
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];
  selectedUser: string | null;
  selectedGroup: string | null;
  groups: string[];
  groupMessages: GroupMessage[];
}

interface SocketAction {
  socketSet: (socket: Socket | null) => void;
  disconnect: () => void;
  sendMessage: (event: string, data: any) => void;
  selectedUserSet: (name: string | null) => void;
  selectedGroupSet: (name: string | null) => void;
  messageSet: (message: Message) => void;
  fetchMessages: (group: string) => void;
  groupMessageSet: (message: GroupMessage) => void;
  resetMessages: () => void;
}

type Store = UserState & UserAction & SocketState & SocketAction;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useStore = create<Store>()((set, get) => ({
  user: null,
  socket: null,
  isConnected: false,
  messages: [],
  usersList: [],
  selectedUser: null,
  selectedGroup: null,
  groups: [
    "Sports",
    "Entertainment",
    "Science",
    "Business",
    "History",
    "Games",
    "Nature",
    "DIY",
  ],
  groupMessages: [],

  userSet: (user) => {
    set({ user });
  },
  socketSet: (socket) => {
    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
  sendMessage: (event, data) => {
    const { socket, messages } = get();
    if (socket) {
      socket.emit(event, JSON.stringify(data));
      set({ messages: [...messages, { text: data.data, type: "send" }] });
      console.log(messages);
    }
  },
  usersListSet: (usersList: string[]) => {
    set({ usersList });
  },
  selectedUserSet: (selectedUser) => {
    set({ selectedUser, selectedGroup: null });
  },
  selectedGroupSet: (selectedGroup) => {
    set({ selectedGroup, selectedUser: null });
  },
  messageSet: (message) => {
    const { messages } = get();
    set({ messages: [...messages, message] });
  },
  groupMessageSet: (message) => {
    const { groupMessages } = get();
    set({ groupMessages: [...groupMessages, message] });
  },
  fetchMessages: async (group: string) => {
    const { user } = get();

    const response = await fetch(`${API_URL}/api/messages/${group}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    });

    const json: GroupMessage[] = await response.json();
    if (response.ok) {
      set({ groupMessages: [] });
      set({
        groupMessages: json.map(({ text, sender }) =>
          sender === user?.username
            ? { type: "send", text, sender }
            : { type: "receive", text, sender },
        ),
      });
      console.log(json);
    }
  },
  resetMessages: () => {
    set({ messages: [] });
  }, 
}));
