import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import FormSelect from '../ui/FormSelect';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps {
    onBack: () => void;
    onProceedToPayment: () => void;
    isNoDocFlow?: boolean;
}

const AadhaarUpdateForm: React.FC<FormProps> = ({ onBack, onProceedToPayment, isNoDocFlow = false }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', aadhaarNumber: '', newAddress: '', proofDocumentName: '' });
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (name: string) => (file: File | null) => {
        setFiles(prev => ({ ...prev, [name]: file }));
    };
    
    const addressProofOptions = [
        { value: 'voter-id', label: t('forms.aadhaarUpdate.proofOptions.voterId') },
        { value: 'electricity-bill', label: t('forms.aadhaarUpdate.proofOptions.electricityBill') },
        { value: 'bank-statement', label: t('forms.aadhaarUpdate.proofOptions.bankStatement') },
        { value: 'gas-bill', label: t('forms.aadhaarUpdate.proofOptions.gasBill') },
        { value: 'uidai-format', label: t('forms.aadhaarUpdate.proofOptions.uidaiFormat') },
        { value: 'passport', label: t('forms.aadhaarUpdate.proofOptions.passport') },
        { value: 'postpaid-bill', label: t('forms.aadhaarUpdate.proofOptions.postpaidBill') },
    ];
    
    const formTitle = isNoDocFlow ? t('forms.aadhaarUpdate.titleNoDoc') : t('forms.aadhaarUpdate.title');

    return (
        <FormWrapper title={formTitle} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.aadhaarUpdate.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.aadhaarUpdate.aadhaarNumberLabel')} name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.aadhaarUpdate.newAddressLabel')} name="newAddress" value={formData.newAddress} onChange={handleInputChange} required />
            
            <FormSelect
                label={t('forms.aadhaarUpdate.proofDocumentNameLabel')}
                name="proofDocumentName"
                value={formData.proofDocumentName}
                onChange={handleInputChange}
                options={addressProofOptions}
                required={!isNoDocFlow}
                disabled={isNoDocFlow}
            />
            
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label={t('forms.aadhaarUpdate.uploadAadhaarLabel')} name="aadhaarCard" onFileSelect={handleFileChange('aadhaarCard')} required />
                    <FileUpload label={t('forms.aadhaarUpdate.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                    <FileUpload 
                        label={t('forms.aadhaarUpdate.uploadProofLabel')} 
                        name="addressProof" 
                        onFileSelect={handleFileChange('addressProof')} 
                        required={!isNoDocFlow} 
                        helpText={t('forms.aadhaarUpdate.uploadProofHelpText')} 
                    />
                </div>
            </div>
             <p className="mt-4 text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                📞 {t('forms.otpMessage')}
            </p>
        </FormWrapper>
    );
};

export default AadhaarUpdateForm;