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

const DrivingLicenseUpdateForm: React.FC<FormProps> = ({ onBack, title, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', fatherName: '', dob: '', gender: '', updatedAddress: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={title} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <p className="text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg mb-6 border border-indigo-200 dark:border-indigo-800">{t('forms.dlUpdate.infoText')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.dlUpdate.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlUpdate.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlUpdate.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlUpdate.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.dlUpdate.updatedAddressLabel')} name="updatedAddress" value={formData.updatedAddress} onChange={handleInputChange} />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label={t('forms.dlUpdate.uploadDlLabel')} name="dl" onFileSelect={handleFileChange('dl')} required />
                    <FileUpload label={t('forms.dlUpdate.uploadAddressProofLabel')} name="addressProof" onFileSelect={handleFileChange('addressProof')} required helpText={t('forms.dlUpdate.uploadAddressProofHelpText')} />
                    <FileUpload label={t('forms.dlUpdate.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                    <FileUpload label={t('forms.dlUpdate.uploadSignatureLabel')} name="signature" onFileSelect={handleFileChange('signature')} required />
                </div>
            </div>
        </FormWrapper>
    );
};

export default DrivingLicenseUpdateForm;