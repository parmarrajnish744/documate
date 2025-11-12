import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps {
    onBack: () => void;
    onProceedToPayment: () => void;
}

const PanNewForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', fatherName: '', dob: '', gender: '', address: '', mobile: '', email: '' });
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleFileChange = (name: string) => (file: File | null) => {
        setFiles(prev => ({ ...prev, [name]: file }));
    };

    return (
        <FormWrapper title={t('forms.panNew.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.panNew.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.panNew.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.panNew.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                <FormInput label={t('forms.panNew.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} required />
                <FormInput label={t('forms.panNew.mobileLabel')} name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} required />
                <FormInput label={t('forms.panNew.emailLabel')} name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.panNew.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} required />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FileUpload label={t('forms.panNew.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required helpText={t('forms.panNew.uploadAadhaarHelpText')} />
                    <FileUpload label={t('forms.panNew.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                    <FileUpload label={t('forms.panNew.uploadSignatureLabel')} name="signature" onFileSelect={handleFileChange('signature')} required helpText={t('forms.panNew.uploadSignatureHelpText')} />
                </div>
            </div>
        </FormWrapper>
    );
};

export default PanNewForm;