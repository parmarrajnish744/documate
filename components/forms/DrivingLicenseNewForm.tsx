import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void; 
    onProceedToPayment: () => void;
}

const DrivingLicenseNewForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', fatherName: '', dob: '', gender: '', address: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.dlNew.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.dlNew.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlNew.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlNew.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                <FormInput label={t('forms.dlNew.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} required />
            </div>
            <FormInput label={t('forms.dlNew.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} required />
            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload label={t('forms.dlNew.uploadDobProofLabel')} name="dobProof" onFileSelect={handleFileChange('dobProof')} required helpText={t('forms.dlNew.uploadDobProofHelpText')} />
                    <FileUpload label={t('forms.dlNew.uploadAddressProofLabel')} name="addressProof" onFileSelect={handleFileChange('addressProof')} required helpText={t('forms.dlNew.uploadAddressProofHelpText')} />
                    <FileUpload label={t('forms.dlNew.uploadPhotoLabel')} name="photo" onFileSelect={handleFileChange('photo')} required />
                    <FileUpload label={t('forms.dlNew.uploadSignatureLabel')} name="signature" onFileSelect={handleFileChange('signature')} required />
                </div>
            </div>
        </FormWrapper>
    );
};

export default DrivingLicenseNewForm;