import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';

export const useTranslation = () => {
  const language = useStore(state => state.language) || 'en';
  return translations[language] || translations.en;
};
