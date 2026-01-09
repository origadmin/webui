/**
 * A generic type for items that can be arranged in a tree.
 * The type parameter T allows children to be of the same specific subtype.
 */
export type TreeItem<T> = {
  id: string;
  parent_id?: string;
  children?: T[];
  [key: string]: unknown; // Allow other properties, but safely
};

/**
 * Builds a tree structure from a flat list of items.
 */
export const buildTree = <T extends TreeItem<T>>(items?: T[]): T[] => {
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
      // The 'parent.children' is guaranteed to be T[] here because we initialized it.
      parent?.children?.push(item);
    } else {
      // If an item has no parent_id or its parent is not in the map, it's a root.
      roots.push(item);
    }
  });

  // Sort children within each node and sort the root nodes by sequence.
  const sortBySequence = (a: T, b: T) => {
    const seqA = typeof a.sequence === "number" ? a.sequence : 0;
    const seqB = typeof b.sequence === "number" ? b.sequence : 0;
    return seqA - seqB;
  };

  map.forEach((node) => {
    // Now node.children is T[], which is compatible with sortBySequence's parameters.
    node.children?.sort(sortBySequence);
  });
  roots.sort(sortBySequence);

  return roots;
};
