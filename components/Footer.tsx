import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
    onAdminLogin: () => void;
    onOperatorLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminLogin, onOperatorLogin }) => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                <div className="flex justify-center gap-x-6 text-sm mb-4">
                    <button onClick={onOperatorLogin} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">{t('footer.operatorLogin')}</button>
                    <button onClick={onAdminLogin} className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">{t('footer.adminLogin')}</button>
                </div>
                <p>&copy; {currentYear} {t('footer.copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer;
