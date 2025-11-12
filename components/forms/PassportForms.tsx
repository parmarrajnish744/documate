import React, { useState } from 'react';
import PassportNewForm from './PassportNewForm';
import PassportUpdateForm from './PassportUpdateForm';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void; 
    onProceedToPayment: () => void;
}

const PassportForms: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formType, setFormType] = useState<'chooser' | 'new' | 'update'>('chooser');

    const handleBackToChooser = () => setFormType('chooser');

    if (formType === 'new') {
        return <PassportNewForm onBack={handleBackToChooser} onProceedToPayment={onProceedToPayment} />;
    }
    if (formType === 'update') {
        return <PassportUpdateForm onBack={handleBackToChooser} onProceedToPayment={onProceedToPayment} />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-6 border-b dark:border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t('forms.passport.chooserTitle')}</h2>
                <Button onClick={onBack} variant="secondary">&larr; {t('forms.backToServices')}</Button>
            </div>
            <div className="text-center space-y-4 py-8">
                <h3 className="text-xl font-semibold dark:text-gray-200">{t('forms.passport.chooserPrompt')}</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                     <Button onClick={() => setFormType('new')}>{t('forms.passport.newButton')}</Button>
                     <Button onClick={() => setFormType('update')}>{t('forms.passport.updateButton')}</Button>
                </div>
            </div>
        </div>
    );
}

export default PassportForms;