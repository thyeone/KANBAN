import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); // localStorage

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const boardState = atom<string[]>({
  key: "boards",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});
