import React, { useState } from 'react';
import Button from './ui/Button';
import { Service } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface PaymentGatewayPageProps {
    service: Service & { name: string };
    onPaymentSuccess: () => void;
    onBack: () => void;
}

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PaymentGatewayPage: React.FC<PaymentGatewayPageProps> = ({ service, onPaymentSuccess, onBack }) => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending');

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStatus('success');
        }, 2000);
    };

    if (paymentStatus === 'success') {
        return (
            <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
                <SuccessIcon />
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{t('payment.successTitle')}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">{t('payment.successMessage', { serviceName: service.name })}</p>
                <Button onClick={onPaymentSuccess}>{t('payment.returnHomeButton')}</Button>
            </div>
        );
    }
    
    return (
        <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-lg mx-auto">
            <button onClick={onBack} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors mb-6 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('payment.backToForm')}
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-4">{t('payment.title')}</h2>
            <div className="border dark:border-gray-700 rounded-lg p-6 my-6 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-300">{t('payment.serviceLabel')}:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-right">{service.name}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold border-t dark:border-gray-600 pt-4 mt-4">
                    <span className="text-gray-800 dark:text-gray-200">{t('payment.totalAmountLabel')}:</span>
                    <span className="text-indigo-600 dark:text-indigo-400">₹{service.charge}</span>
                </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">{t('payment.redirectMessage')}</p>

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full text-lg py-3">
                {isProcessing ? t('payment.processingButton') : t('payment.payButton', { amount: `₹${service.charge}` })}
            </Button>
        </div>
    );
};

export default PaymentGatewayPage;
