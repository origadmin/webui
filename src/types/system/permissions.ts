// Get type badge color
export const permissionTypeBadgeColor = (type?: string) => {
  switch (type) {
    case "self":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "role":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "dept":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    // case "all":
    //   return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    case "all":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case "default":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
