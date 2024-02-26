import en from './locales/en';
import pt from './locales/pt';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Translations = {
	en: en,
	pt: pt,
};

export const i18n = new I18n(Translations);

i18n.locale = Localization.getLocales()[0]?.languageCode ?? 'en';
i18n.defaultLocale = 'en';

i18n.enableFallback = true;
