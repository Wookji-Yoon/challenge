import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export interface IToDo {
  id: number;
  text: string;
  category: string;
}
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const toDoListState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoListState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const categorySelector = selector({
  key: "categorySelector",
  get: ({ get }) => {
    const categories = get(categoriesState);
    const category = get(categoryState);
    return categories.filter((c) => c !== category);
  },
});
