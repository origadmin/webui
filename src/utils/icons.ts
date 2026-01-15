import { ComponentType } from "react";
import * as icons from "@tabler/icons-react";

// Define a more specific type for the icons module
type IconModule = {
  [key: string]: ComponentType<icons.TablerIconsProps>;
};

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
 * @returns {ComponentType<icons.TablerIconsProps>} The icon component or a default icon if not found.
 */
export const getIcon = (iconName: string): ComponentType<icons.TablerIconsProps> => {
  const typedIcons = icons as IconModule;
  const defaultIcon = typedIcons.IconMenu2;

  if (!iconName) {
    return defaultIcon;
  }

  // Strategy 1: Direct lookup (for names that are already in "IconPascalCase" format)
  if (iconName in typedIcons && typedIcons[iconName]) {
    return typedIcons[iconName];
  }

  // Strategy 2: Convert from kebab-case or lowercase to "IconPascalCase"
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const componentName = `Icon${pascalCaseName}`;

  if (componentName in typedIcons && typedIcons[componentName]) {
    return typedIcons[componentName];
  }

  // Fallback to the default icon if no strategy works
  return defaultIcon;
};
