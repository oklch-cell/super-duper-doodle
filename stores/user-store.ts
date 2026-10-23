import { create } from "zustand";

type User = {
  id: number;
  username: string;
  email: string;
  display_picture: string;
};

type UserState = {
  user: User | null;
};

type UserAction = {
  userSet: (user: User | null) => void;
};

export const useUser = create<UserState & UserAction>()((set) => ({
  user: null,

  userSet: (user) => {
    set({ user });
  },
}));