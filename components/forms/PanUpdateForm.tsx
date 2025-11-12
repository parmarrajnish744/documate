import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps {
    onBack: () => void;
    title: string;
    onProceedToPayment: () => void;
}

const PanUpdateForm: React.FC<FormProps> = ({ onBack, title, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', dob: '', gender: '', address: '', mobile: '', email: '' });
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleFileChange = (name: string) => (file: File | null) => {
        setFiles(prev => ({ ...prev, [name]: file }));
    };

    return (
        <FormWrapper title={title} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <p className="text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg mb-6 border border-indigo-200 dark:border-indigo-800">{t('forms.panUpdate.infoText')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.panUpdate.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} />
                <FormInput label={t('forms.panUpdate.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                <FormInput label={t('forms.panUpdate.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} />
                <FormInput label={t('forms.panUpdate.mobileLabel')} name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} />
                <FormInput label={t('forms.panUpdate.emailLabel')} name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
            <FormInput label={t('forms.panUpdate.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitleRequired')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FileUpload label={t('forms.panUpdate.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required helpText={t('forms.panUpdate.uploadAadhaarHelpText')} />
                    <FileUpload label={t('forms.panUpdate.uploadPanLabel')} name="pan" onFileSelect={handleFileChange('pan')} required />
                    <FileUpload label={t('forms.panUpdate.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                    <FileUpload label={t('forms.panUpdate.uploadSignatureLabel')} name="signature" onFileSelect={handleFileChange('signature')} required helpText={t('forms.panUpdate.uploadSignatureHelpText')} />
                </div>
            </div>
        </FormWrapper>
    );
};

export default PanUpdateForm;