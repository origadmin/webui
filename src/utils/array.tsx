import { Dispatch, SetStateAction } from "react";

// 统一所有移动操作的实现方式
const move = <T,>(arr: T[], from: number, to: number): T[] => {
  const newArr = [...arr];
  const [removed] = newArr.splice(from, 1);
  newArr.splice(to, 0, removed);
  return newArr;
};

export const createMoveHandlers = (
  setItems: Dispatch<SetStateAction<API.System.Resource[]>>,
  getSelectedId: () => string | null,
) => ({
  Up: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;
    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      return index > 0 ? move(items, index, index - 1) : items;
    });
  },
  Down: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;
    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      return index < items.length - 1 ? move(items, index, index + 1) : items;
    });
  },
  ToTop: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;
    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      return index > 0 ? move(items, index, 0) : items;
    });
  },
  ToBottom: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;
    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      return index < items.length - 1 ? move(items, index, items.length - 1) : items;
    });
  },
});
