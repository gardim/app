import common from './common';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const Translations = {
	pt: {
		...common.pt,
	},
	en: {
		...common.en,
	},
};

export const i18n = new I18n(Translations);
i18n.locale = Localization.getLocales()[0].languageCode;
i18n.enableFallback = true;
