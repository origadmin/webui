// This function builds a menu tree from a flat list of resource items.
export const buildMenuTree = (items?: API.System.Resource[]): API.MenuItem[] => {
  if (!items) {
    return [];
  }

  const map = new Map<string, API.MenuItem>();
  const roots: API.MenuItem[] = [];

  // First pass: create a map of all items and initialize them as menu items.
  items.forEach((item) => {
    // Only visible menu items should be part of the menu tree.
    if (!item.id || !item.visible || item.type !== "MENU") {
      return;
    }
    map.set(item.id, {
      id: item.id,
      icon: item.icon || undefined,
      keyword: item.keyword || "",
      title: item.name || "",
      type: item.type || "UNKNOWN",
      sequence: item.sequence || 0,
      path: item.path || "",
      children: [], // Initialize children array
    });
  });

  // Second pass: build the tree structure.
  map.forEach((menuItem) => {
    // Find the original item to get the parent_id
    const originalItem = items.find((i) => i.id === menuItem.id);
    const parentId = originalItem?.parent_id;

    if (parentId) {
      const parent = map.get(parentId);
      if (parent) {
        // Ensure children array exists (it should, from the first pass)
        parent.children = parent.children || [];
        parent.children.push(menuItem);
      } else {
        // If parent is not in the map (e.g., it's not a visible menu item), treat this as a root.
        roots.push(menuItem);
      }
    } else {
      // No parent_id means it's a root item.
      roots.push(menuItem);
    }
  });

  // Sort children of each node.
  map.forEach((node) => {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
    }
  });

  // Sort the root nodes.
  roots.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));

  return roots;
};
