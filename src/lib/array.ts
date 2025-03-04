import { Dispatch, SetStateAction } from "react";

/**
 * Unify the way all mobile operations are implemented
 * @param arr array to be manipulated
 * @param from start position
 * @param to target position
 * @returns new array
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const newArr = [...arr];
  const [removed] = newArr.splice(from, 1);
  newArr.splice(to, 0, removed);
  return newArr;
}

export type SequenceAble = {
  id?: string;
  sequence: number;
};

// Create a mobile operations processor
export const createMoveHandlers = <T extends SequenceAble>(
  setItems: Dispatch<SetStateAction<T[]>>,
  getSelectedId: () => string | null,
) => ({
  ToTop: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;

    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      if (index <= 0) return items;

      return [items[index], ...items.filter((_, i) => i !== index)].map((item, idx) => ({
        ...item,
        sequence: idx + 1,
      }));
    });
  },

  Up: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;

    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      if (index <= 0) return items;

      const newItems = move(items, index, index - 1);
      return newItems.map((item, idx) => ({ ...item, sequence: idx + 1 }));
    });
  },

  Down: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;

    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      if (index === -1 || index >= items.length - 1) return items;

      const newItems = move(items, index, index + 1);
      return newItems.map((item, idx) => ({ ...item, sequence: idx + 1 }));
    });
  },

  ToBottom: () => {
    const selectedId = getSelectedId();
    if (!selectedId) return;

    setItems((items) => {
      const index = items.findIndex((i) => i.id === selectedId);
      if (index === -1 || index >= items.length - 1) return items;

      const newItems = [...items.filter((_, i) => i !== index), items[index]];
      return newItems.map((item, idx) => ({ ...item, sequence: idx + 1 }));
    });
  },
});
