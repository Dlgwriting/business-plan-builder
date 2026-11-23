import en from './en';
import ko from './ko';
import zh from './zh';
import ru from './ru';
import enLearn from './learn/en';
import koLearn from './learn/ko';
import zhLearn from './learn/zh';
import ruLearn from './learn/ru';

// Missing keys in any language fall back to English automatically.
export const LANGUAGES = [
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'zh', label: '中文（简体）', htmlLang: 'zh-Hans' },
  { code: 'ko', label: '한국어', htmlLang: 'ko' },
  { code: 'ru', label: 'Русский', htmlLang: 'ru' },
];

export const dictionaries = {
  en: { ...en, learn: enLearn },
  ko: { ...ko, learn: koLearn },
  zh: { ...zh, learn: zhLearn },
  ru: { ...ru, learn: ruLearn },
};
