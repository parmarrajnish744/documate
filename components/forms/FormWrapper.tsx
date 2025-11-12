import React, { useState } from 'react';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

interface FormWrapperProps {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
    onProceedToPayment: () => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, onBack, children, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            onProceedToPayment();
        }, 500);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/25 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-5 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                <Button onClick={onBack} variant="secondary">
                    &larr; {t('forms.backToServices')}
                </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {children}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-8 flex justify-end">
                    <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? t('forms.processing') : t('forms.proceedToPay')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormWrapper;