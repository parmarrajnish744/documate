import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void; 
    onProceedToPayment: () => void;
}

const VoterNewForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', relativeName: '', dob: '', gender: '', address: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.voterNew.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.voterNew.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.voterNew.relativeNameLabel')} name="relativeName" value={formData.relativeName} onChange={handleInputChange} required />
                <FormInput label={t('forms.voterNew.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                <FormInput label={t('forms.voterNew.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.voterNew.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} required />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FileUpload label={t('forms.voterNew.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required />
                    <FileUpload label={t('forms.voterNew.uploadPanLabel')} name="pan" onFileSelect={handleFileChange('pan')} required />
                    <FileUpload label={t('forms.voterNew.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                </div>
            </div>
            <p className="mt-4 text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                📞 {t('forms.voterNew.otpMessage')}
            </p>
        </FormWrapper>
    );
};

export default VoterNewForm;