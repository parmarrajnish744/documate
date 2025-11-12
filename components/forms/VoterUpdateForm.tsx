import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void; 
    onProceedToPayment: () => void;
}

const VoterUpdateForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', dob: '', gender: '', address: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.voterUpdate.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <p className="text-sm text-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-300 p-4 rounded-lg mb-6 border border-indigo-200 dark:border-indigo-800">{t('forms.voterUpdate.infoText')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.voterUpdate.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} />
                <FormInput label={t('forms.voterUpdate.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                <FormInput label={t('forms.voterUpdate.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} />
            </div>
            <FormInput label={t('forms.voterUpdate.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label={t('forms.voterUpdate.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required />
                    <FileUpload label={t('forms.voterUpdate.uploadVoterIdLabel')} name="voterId" onFileSelect={handleFileChange('voterId')} required />
                    <FileUpload label={t('forms.voterUpdate.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} />
                    <FileUpload label={t('forms.voterUpdate.uploadAddressProofLabel')} name="addressProof" onFileSelect={handleFileChange('addressProof')} helpText={t('forms.voterUpdate.uploadAddressProofHelpText')} />
                    <FileUpload label={t('forms.voterUpdate.uploadDobProofLabel')} name="dobProof" onFileSelect={handleFileChange('dobProof')} helpText={t('forms.voterUpdate.uploadDobProofHelpText')} />
                </div>
            </div>
        </FormWrapper>
    );
};

export default VoterUpdateForm;