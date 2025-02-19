import { createContext, useContext, useMemo, useState } from "react";
import { defaultLocale } from "@/types";
import { noop } from "@/utils";
import { messages } from "@/utils/locale";
import { getLocaleLanguage, setLocaleLanguage } from "@/utils/storage";
import { IntlProvider } from "react-intl";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: getLocaleLanguage(),
  setLocale: noop,
});

export const useLocale = (locale?: string) => {
  const context = useContext(LocaleContext);
  if (!context) {
    return {
      locale: locale || getLocaleLanguage(),
      setLocale: noop,
    };
  }
  return context;
};

export const LocaleProvider: React.FC<{ children: React.ReactNode; locale?: string }> = ({ children, locale }) => {
  locale = locale || getLocaleLanguage();
  if (locale && !messages[locale]) {
    console.warn(`Invalid locale: ${locale}. Defaulting to ${defaultLocale}.`);
    locale = defaultLocale;
  }
  if (locale) {
    setLocaleLanguage(locale);
  }
  const [_locale, _setLocale] = useState<string>(locale);
  const curMsg = useMemo(() => messages[_locale] || messages[defaultLocale], [_locale]);

  const setLocale = (locale: string) => {
    setLocaleLanguage(locale);
    _setLocale(locale);
  };

  return (
    <LocaleContext.Provider value={{ locale: _locale, setLocale }}>
      <IntlProvider locale={_locale} messages={curMsg}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
