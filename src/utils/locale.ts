import enUS from "@/locales/en-US";
import jaJP from "@/locales/ja-JP";
import zhCN from "@/locales/zh-CN";
import zhTW from "@/locales/zh-TW";
import { defaultLocale } from "@/types";
import { getLocaleLanguage } from "@/utils/storage";
import { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
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
  return createIntl(
    {
      locale,
      messages: messages[locale],
      onError: (err) => {
        if (err.code === "MISSING_TRANSLATION") {
          return;
        }
        console.error(err);
      },
    },
    cache,
  );
};

export const intl = getCreatedIntl(getLocaleLanguage());

// 创建英语回退的 intl 实例
const enIntl = createIntl(
  {
    locale: "en-US",
    messages: messages["en-US"],
    onError: (err) => {
      if (err.code === "MISSING_TRANSLATION") {
        return;
      }
      console.error(err);
    },
  },
  cache,
);

export const t = (id: string, values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>) => {
  // Start by trying the user language
  try {
    const message = intl.formatMessage({ id }, values);
    // If the returned value is the id itself, no translation was found
    if (message === id) {
      // Revert to English
      try {
        const enMessage = enIntl.formatMessage({ id }, values);
        // If the English language is not found either, return the id and output the warning
        if (enMessage === id) {
          console.warn(
            `[@locale] Missing translation for "${id}" in all locales (user language and en-US), using id as fallback`,
          );
          return id;
        }
        return enMessage;
      } catch {
        return id;
      }
    }
    return message;
  } catch {
    // If formatting is wrong, try English
    try {
      const enMessage = enIntl.formatMessage({ id }, values);
      return enMessage;
    } catch {
      return id;
    }
  }
};
