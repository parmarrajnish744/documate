import React, { useState } from 'react';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import { useTranslation } from '../../hooks/useTranslation';
import { User } from '../../types';

interface LoginFormProps {
    onSwitchToRegister: () => void;
    onLoginSuccess: (user: User) => void;
    users: User[];
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onLoginSuccess, users }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setTimeout(() => {
            // Mock login: find user by email. Ignore password.
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (user) {
                onLoginSuccess(user);
            } else {
                setError(t('auth.loginError'));
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleForgotPassword = () => {
        // In a real app, this would trigger a modal or a new view for password reset.
        alert('A password reset link would be sent to your email address if it exists in our system.');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-100">{t('auth.loginTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    label={t('auth.emailLabel')}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('auth.emailPlaceholder')}
                />
                <div>
                    <div className="flex justify-between items-baseline mb-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                           {t('auth.passwordLabel')} <span className="text-red-500">*</span>
                        </label>
                         <button 
                            type="button" 
                            onClick={handleForgotPassword}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
                        >
                            {t('auth.forgotPassword')}
                        </button>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('auth.loggingInButton') : t('auth.loginButton')}
                </Button>
            </form>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                {t('auth.noAccountPrompt')}{' '}
                <button onClick={onSwitchToRegister} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none">
                    {t('auth.registerLink')}
                </button>
            </p>
        </div>
    );
};

export default LoginForm;