import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void; 
    onProceedToPayment: () => void;
}

const PassportNewForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', dob: '', gender: '', address: '', fatherName: '', motherName: '', spouseName: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.passportNew.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.passportNew.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportNew.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportNew.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportNew.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportNew.motherNameLabel')} name="motherName" value={formData.motherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportNew.spouseNameLabel')} name="spouseName" value={formData.spouseName} onChange={handleInputChange} />
            </div>
            <FormInput label={t('forms.passportNew.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} required />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FileUpload label={t('forms.passportNew.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required />
                    <FileUpload label={t('forms.passportNew.uploadPanLabel')} name="pan" onFileSelect={handleFileChange('pan')} required />
                    <FileUpload label={t('forms.passportNew.uploadLcLabel')} name="lc" onFileSelect={handleFileChange('lc')} required />
                    <FileUpload label={t('forms.passportNew.uploadMarksheetLabel')} name="marksheet" onFileSelect={handleFileChange('marksheet')} required />
                </div>
            </div>
        </FormWrapper>
    );
};

export default PassportNewForm;