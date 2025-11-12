import React, { useState } from 'react';
import { User } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import FormInput from './ui/FormInput';
import Button from './ui/Button';

interface AdminLoginPageProps {
    onLogin: (user: User) => void;
    users: User[];
    onBack: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin, users, onBack }) => {
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
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === 'admin');
            if (user) {
                onLogin(user);
            } else {
                setError(t('auth.loginError'));
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
             <button onClick={onBack} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors mb-6">
                &larr; {t('myApplications.backToHome')}
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-100">{t('admin.loginTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                    label={t('auth.emailLabel')}
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
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
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t('auth.loggingInButton') : t('auth.loginButton')}
                </Button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
