import { createContext, useContext, useMemo, useState } from "react";
import enUS from "@/locales/en-US";
import jaJP from "@/locales/ja-JP";
import zhCN from "@/locales/zh-CN";
import zhTW from "@/locales/zh-TW";
import { noop } from "@/utils";
import { IntlProvider } from "react-intl";

const defaultLocale = "en-US";
const systemLocale = navigator?.language || defaultLocale;

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: systemLocale,
  setLocale: noop,
});

export const useLocale = (locale?: string) => {
  const context = useContext(LocaleContext);
  if (!context) {
    return {
      locale: locale || defaultLocale,
      setLocale: noop,
    };
  }
  return context;
};

const messages: {
  [key: string]: Record<string, string>;
} = {
  "en-US": enUS,
  "ja-JP": jaJP,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
};

export const LocaleProvider: React.FC<{ children: React.ReactNode; locale?: string }> = ({ children, locale }) => {
  if (locale && !messages[locale]) {
    console.warn(`Invalid locale: ${locale}. Defaulting to ${systemLocale}.`);
  }
  const [_locale, _setLocale] = useState<string>(locale || systemLocale);
  const currentMessages = useMemo(() => messages[_locale] || messages[defaultLocale], [_locale]);

  return (
    <LocaleContext.Provider value={{ locale: _locale, setLocale: _setLocale }}>
      <IntlProvider locale={_locale} messages={currentMessages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
