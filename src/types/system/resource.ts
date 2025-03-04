import { t } from "@/utils/locale";

export const resourceTypeValues = new Map<string, string>([
  ["M", t("pages.system.resources.columns.type.menu")],
  ["A", t("pages.system.resources.columns.type.api")],
  ["B", t("pages.system.resources.columns.type.button")],
  ["P", t("pages.system.resources.columns.type.page")],
  ["R", t("pages.system.resources.columns.type.redirect")],
  ["G", t("pages.system.resources.columns.type.group")],
  ["ROOT", t("pages.system.resources.columns.type.root")],
  ["U", t("pages.system.resources.columns.type.unknown")],
]);

export {};
