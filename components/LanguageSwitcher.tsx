import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'gu', name: 'ગુજરાતી' },
];

const LanguageSwitcher: React.FC = () => {
    const { locale, setLocale } = useTranslation();

    return (
        <div className="flex items-center bg-gray-100 dark:bg-gray-900/50 rounded-full p-1">
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
                        locale === lang.code 
                        ? 'bg-indigo-600 text-white shadow' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    {lang.name}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;