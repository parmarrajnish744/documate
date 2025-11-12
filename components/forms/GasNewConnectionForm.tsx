import React, { useState, useEffect } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps {
    onBack: () => void;
    defaultSelection: 'single' | 'double';
    onProceedToPayment: () => void;
}

const GasNewConnectionForm: React.FC<FormProps> = ({ onBack, defaultSelection, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', fatherName: '', dob: '', address: '' });
    const [connectionType, setConnectionType] = useState(defaultSelection);
    const [files, setFiles] = useState({});

    useEffect(() => {
        setConnectionType(defaultSelection);
    }, [defaultSelection]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.gasNew.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.gasNew.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.gasNew.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.gasNew.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.gasNew.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} required className="mt-6"/>

            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.gasNew.optionsTitle')}</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <input type="radio" name="connectionType" value="single" checked={connectionType === 'single'} onChange={() => setConnectionType('single')} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('forms.gasNew.singleBottleLabel')}</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <input type="radio" name="connectionType" value="double" checked={connectionType === 'double'} onChange={() => setConnectionType('double')} className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t('forms.gasNew.doubleBottleLabel')}</span>
                    </label>
                </div>
            </div>

            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label={t('forms.gasNew.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required />
                    <FileUpload label={t('forms.gasNew.uploadAddressProofLabel')} name="addressProof" onFileSelect={handleFileChange('addressProof')} required helpText={t('forms.gasNew.uploadAddressProofHelpText')} />
                </div>
            </div>
            <p className="mt-4 text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                📞 {t('forms.otpMessage')}
            </p>
        </FormWrapper>
    );
};

export default GasNewConnectionForm;