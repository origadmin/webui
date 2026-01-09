import * as icons from "@tabler/icons-react";

/**
 * A robust function to get an icon component from its name,
 * handling multiple possible name formats by using the library's own export.
 *
 * It can handle:
 * - `database` -> `IconDatabase`
 * - `shield-lock` -> `IconShieldLock`
 * - `IconHome` -> `IconHome`
 *
 * @param {string} iconName The name of the icon from the data source.
 * @returns {React.ComponentType<any>} The icon component or a default icon if not found.
 */
export const getIcon = (iconName: string): React.ComponentType<any> => {
  const defaultIcon = icons.IconMenu2;
  if (!iconName) {
    return defaultIcon;
  }

  // Strategy 1: Direct lookup (for names that are already in "IconPascalCase" format)
  if (iconName in icons) {
    return (icons as any)[iconName];
  }

  // Strategy 2: Convert from kebab-case or lowercase to "IconPascalCase"
  // "shield-lock" -> "IconShieldLock"
  // "database" -> "IconDatabase"
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const componentName = `Icon${pascalCaseName}`;

  if (componentName in icons) {
    return (icons as any)[componentName];
  }

  // Fallback to the default icon if no strategy works
  return defaultIcon;
};
