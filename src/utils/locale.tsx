import enUS from "@/locales/en-US";
import jaJP from "@/locales/ja-JP";
import zhCN from "@/locales/zh-CN";
import zhTW from "@/locales/zh-TW";
import { defaultLocale } from "@/types";
import { getLocaleLanguage } from "@/utils/storage";
import { PrimitiveType, FormatXMLElementFn } from "intl-messageformat";
import { createIntl, createIntlCache } from "react-intl";

export const messages: {
  [key: string]: Record<string, string>;
} = {
  "en-US": enUS,
  "ja-JP": jaJP,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
};

const cache = createIntlCache();
export const getCreatedIntl = (locale = defaultLocale) => {
  return createIntl({ locale, messages: messages[locale] }, cache);
};

export const intl = getCreatedIntl(getLocaleLanguage());
export const t = (id: string, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>) => {
  return intl.formatMessage({ id }, values);
};
