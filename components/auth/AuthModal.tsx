import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useTranslation } from '../../hooks/useTranslation';
import { User } from '../../types';

interface AuthModalProps {
    onClose: () => void;
    onLoginSuccess: (user: User) => void;
    onRegisterSuccess: (user: User) => void;
    initialView?: 'login' | 'register';
    users: User[];
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, onRegisterSuccess, initialView = 'login', users }) => {
    const [isLoginView, setIsLoginView] = useState(initialView === 'login');
    const { t } = useTranslation();

    useEffect(() => {
        setIsLoginView(initialView === 'login');
    }, [initialView]);

    const toggleView = () => setIsLoginView(!isLoginView);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {isLoginView ? (
                    <LoginForm onSwitchToRegister={toggleView} onLoginSuccess={onLoginSuccess} users={users} />
                ) : (
                    <RegisterForm onSwitchToLogin={toggleView} onRegisterSuccess={onRegisterSuccess} />
                )}
            </div>
        </div>
    );
};

export default AuthModal;
