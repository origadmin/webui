/**
 * A generic type for items that can be arranged in a tree.
 * Requires id, parent_id, and a children array.
 */
export type TreeItem = {
  id: string;
  parent_id?: string;
  children?: TreeItem[];
  [key: string]: any; // Allow other properties
};

/**
 * Builds a tree structure from a flat list of items.
 *
 * @param {T[]} items The flat list of items, where each item must have an `id` and an optional `parent_id`.
 * @returns {T[]} A new array containing only the root items, with children nested under them.
 */
export const buildTree = <T extends TreeItem>(items?: T[]): T[] => {
  const map = new Map<string, T>();
  const roots: T[] = [];

  if (!items) {
    return roots;
  }

  // First pass: create a map of all items and initialize children arrays.
  items.forEach((item) => {
    if (item.id) {
      item.children = [];
      map.set(item.id, item);
    }
  });

  // Second pass: build the tree by linking children to their parents.
  items.forEach((item) => {
    if (item.parent_id && map.has(item.parent_id)) {
      const parent = map.get(item.parent_id);
      parent?.children?.push(item);
    } else {
      // If an item has no parent_id or its parent is not in the map, it's a root.
      roots.push(item);
    }
  });

  // Sort children within each node and sort the root nodes by sequence.
  const sortBySequence = (a: T, b: T) => (a.sequence || 0) - (b.sequence || 0);
  map.forEach((node) => {
    node.children?.sort(sortBySequence);
  });
  roots.sort(sortBySequence);

  return roots;
};
