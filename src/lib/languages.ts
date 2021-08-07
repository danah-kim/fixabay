export type Language = {
  keywords: string[];
  langCode: 'ko' | 'en' | 'ja';
};

interface SupportLanguages {
  korean: Language;
  english: Language;
  japanese: Language;
  getLocale: (value: string) => Language['langCode'];
}

const supportLanguages: SupportLanguages = {
  korean: {
    keywords: ['korean', 'ko', 'ko-kr', 'kr'],
    langCode: 'ko',
  },
  english: {
    keywords: ['english', 'en', 'en-us', 'us'],
    langCode: 'en',
  },
  japanese: {
    keywords: ['japanese', 'ja', 'ja-jp', 'jp'],
    langCode: 'ja',
  },
  getLocale(value: string): Language['langCode'] {
    const lowerValue = value.toLowerCase();
    let locale = this.english.langCode;

    [this.korean, this.english, this.japanese].forEach((lang) => {
      if (lang.keywords.includes(lowerValue)) locale = lang.langCode;
    });

    return locale;
  },
};

export default supportLanguages;
