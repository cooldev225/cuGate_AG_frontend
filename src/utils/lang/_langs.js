import en from './en';
//import ru from './ru';

const strings = {en/*, ru*/};
export function GetLocale(lang) {
	if(strings[lang] === undefined) return strings.en();
	return strings[lang]();
}