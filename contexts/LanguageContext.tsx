import React, { createContext, useState, useEffect, useCallback } from 'react';

interface LanguageContextType {
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: string, replacements?: { [key: string]: string }) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState('en');
    const [translations, setTranslations] = useState<any>({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const response = await fetch(`/locales/${locale}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${locale}.json`);
                }
                const data = await response.json();
                setTranslations(data);
            } catch (error) {
                console.error("Could not load translations:", error);
                // Fallback to English if loading fails
                if (locale !== 'en') {
                    const fallbackResponse = await fetch('/locales/en.json');
                    const fallbackData = await fallbackResponse.json();
                    setTranslations(fallbackData);
                }
            }
        };

        fetchTranslations();
    }, [locale]);

    const t = useCallback((key: string, replacements?: { [key: string]: string }): string => {
        let translation = getNestedValue(translations, key);
        
        if (!translation) {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return the key itself as a fallback
        }

        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
            });
        }

        return translation;
    }, [translations]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
