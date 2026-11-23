import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, dictionaries } from '../i18n';
import { storage } from '../lib/storage';

const LanguageContext = createContext(null);
const KEY = 'nae-bizplan:lang';

const lookup = (dict, key) => key.split('.').reduce((v, k) => (v == null ? undefined : v[k]), dict);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = storage.get(KEY);
    return LANGUAGES.some((l) => l.code === saved) ? saved : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = LANGUAGES.find((l) => l.code === language)?.htmlLang || 'en';
  }, [language]);

  const setLanguage = useCallback((code) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLanguageState(code);
    storage.set(KEY, code);
  }, []);

  /** Raw value (string, array or object), falling back to English, then undefined. */
  const tv = useCallback((key) => lookup(dictionaries[language], key) ?? lookup(dictionaries.en, key), [language]);

  /** Translated string with {placeholder} substitution. Falls back to English, then the key itself. */
  const t = useCallback(
    (key, vars) => {
      let value = tv(key);
      if (typeof value !== 'string') return key;
      if (vars) for (const [k, v] of Object.entries(vars)) value = value.split(`{${k}}`).join(String(v));
      return value;
    },
    [tv],
  );

  const value = useMemo(() => ({ language, setLanguage, t, tv }), [language, setLanguage, t, tv]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
