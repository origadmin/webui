export const buildMenuTree = (items?: API.System.Resource[]) => {
  const map = new Map<string, API.MenuItem>();
  const roots: API.MenuItem[] = [];

  if (!items) {
    return roots;
  }

  // create a map of id to item
  items.forEach((item) => {
    if (!item.id || !item.visible || item.status !== 1) {
      return;
    }
    const menu: API.MenuItem = {
      id: item.id,
      icon: item.icon || undefined,
      keyword: item.keyword || "",
      title: item.name || "",
      type: item.type || "M",
      sequence: item.sequence || 1,
      path: item.path || "",
      children: [],
    };
    map.set(item.id, menu);
  });

  // build the tree
  items.forEach((item) => {
    if (!item.id) return;

    const currentItem = map.get(item.id);
    if (!currentItem) return;

    if (!item.parent_id || !item.tree_path) {
      roots.push(currentItem);
      return;
    }
    const parent = map.get(item.parent_id);
    if (!parent || !parent.children) {
      return;
    }
    if (currentItem.type === "M" || currentItem.type === "P") {
      parent.children.push(currentItem);
      return;
    }
  });

  map.forEach((node) => {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
    }
  });

  roots.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
  return roots;
};
