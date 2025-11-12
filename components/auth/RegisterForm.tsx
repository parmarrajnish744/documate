import React, { useState } from 'react';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import { useTranslation } from '../../hooks/useTranslation';

interface User {
    name: string;
    email: string;
}

interface RegisterFormProps {
    onSwitchToLogin: () => void;
    onRegisterSuccess: (user: User) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onRegisterSuccess({ name, email });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-100">{t('auth.registerTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    label={t('auth.fullNameLabel')}
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder={t('auth.fullNamePlaceholder')}
                />
                <FormInput
                    label={t('auth.emailLabel')}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('auth.emailPlaceholder')}
                />
                <FormInput
                    label={t('auth.passwordLabel')}
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('auth.creatingAccountButton') : t('auth.registerButton')}
                </Button>
            </form>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                {t('auth.hasAccountPrompt')}{' '}
                <button onClick={onSwitchToLogin} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none">
                    {t('auth.loginLink')}
                </button>
            </p>
        </div>
    );
};

export default RegisterForm;