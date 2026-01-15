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

// This function is now the single source of truth for creating an intl instance.
export const getCreatedIntl = (locale = defaultLocale) => {
  // Fallback to default locale if the given locale is not supported
  const effectiveLocale = messages[locale] ? locale : defaultLocale;
  return createIntl(
    {
      locale: effectiveLocale,
      messages: messages[effectiveLocale],
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

// The global `intl` instance, useful for non-component logic, but it's static.
export const intl = getCreatedIntl(getLocaleLanguage());

// The dynamic translation function `t` that should be used everywhere.
export const t = (
  id: string,
  defaultMessageOrValues?: string | Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
  maybeValues?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
) => {
  let defaultMessage: string | undefined;
  let values: Record<string, PrimitiveType | FormatXMLElementFn<string, string>> | undefined;

  if (typeof defaultMessageOrValues === "string") {
    defaultMessage = defaultMessageOrValues;
    values = maybeValues;
  } else {
    values = defaultMessageOrValues;
  }

  // 1. Get the current language dynamically on each call.
  const currentLocale = getLocaleLanguage();
  const currentIntl = getCreatedIntl(currentLocale);

  // 2. Try to format the message with the current locale.
  let message = currentIntl.formatMessage({ id, defaultMessage: id }, values);

  // 3. If translation is missing in the current locale, fall back to English.
  if (message === id && currentLocale !== "en-US") {
    const enIntl = getCreatedIntl("en-US");
    message = enIntl.formatMessage({ id, defaultMessage: id }, values);
  }

  // 4. If still missing, warn and return the ID.
  if (message === id) {
    if (defaultMessage !== undefined) {
      return defaultMessage;
    }
    console.warn(
      `[@locale] Missing translation for "${id}" in all locales (current: ${currentLocale}, fallback: en-US), using id as fallback.`
    );
  }

  return message;
};
