import Constants from 'expo-constants';

interface TranslationOptions {
	tld: string;
	to: string;
}

export async function translate(text: string, options: TranslationOptions): Promise<string> {
	const { translateUrl, translateKey } = Constants.manifest.extra;

	const url = `${translateUrl}/language/translate/v2?key=${translateKey}`;
	const body = {
		q: text,
		source: options.tld,
		target: options.to,
	};
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const json = await response.json();
	return json.data.translations[0].translatedText;
}
