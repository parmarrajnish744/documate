import React from 'react';
import { User } from '../types';
import Button from './ui/Button';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
    user: User | null;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onLogoutClick: () => void;
    onMyApplicationsClick: () => void;
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onRegisterClick, onLogoutClick, onMyApplicationsClick, onHomeClick }) => {
    const { t } = useTranslation();
    
    return (
        <header className="bg-white dark:bg-gray-800/80 dark:backdrop-blur-sm shadow-sm dark:shadow-none dark:border-b dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={onHomeClick}
                >
                    <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('header.title')}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    {user ? (
                        <>
                            <Button variant="secondary" onClick={onMyApplicationsClick}>{t('header.myApplications')}</Button>
                            <span className="text-gray-600 dark:text-gray-300">{t('header.greeting', { name: user.name })}</span>
                            <Button onClick={onLogoutClick} variant="secondary">{t('header.logout')}</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={onLoginClick} variant="secondary">{t('header.login')}</Button>
                            <Button onClick={onRegisterClick}>{t('header.register')}</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;