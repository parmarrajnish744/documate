import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import FormInput from '../ui/FormInput';
import FileUpload from '../ui/FileUpload';
import { useTranslation } from '../../hooks/useTranslation';

interface FormProps { 
    onBack: () => void;
    onProceedToPayment: () => void;
}

const PassportUpdateForm: React.FC<FormProps> = ({ onBack, onProceedToPayment }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', dob: '', gender: '', address: '', fatherName: '', motherName: '', spouseName: '', passportNumber: '', fileNumber: '', issueDate: '', expiryDate: '' });
    const [files, setFiles] = useState({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleFileChange = (name: string) => (file: File | null) => setFiles(p => ({ ...p, [name]: file }));

    return (
        <FormWrapper title={t('forms.passportUpdate.title')} onBack={onBack} onProceedToPayment={onProceedToPayment}>
             <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('forms.passportUpdate.oldDetailsTitle')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormInput label={t('forms.passportUpdate.passportNumberLabel')} name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportUpdate.fileNumberLabel')} name="fileNumber" value={formData.fileNumber} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.issueDateLabel')} name="issueDate" type="date" value={formData.issueDate} onChange={handleInputChange} required />
                <FormInput label={t('forms.passportUpdate.expiryDateLabel')} name="expiryDate" type="date" value={formData.expiryDate} onChange={handleInputChange} required />
             </div>

             <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 pt-6 border-t dark:border-gray-700">{t('forms.passportUpdate.updatedDetailsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label={t('forms.passportUpdate.nameLabel')} name="name" value={formData.name} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.dobLabel')} name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.genderLabel')} name="gender" value={formData.gender} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.fatherNameLabel')} name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.motherNameLabel')} name="motherName" value={formData.motherName} onChange={handleInputChange} />
                <FormInput label={t('forms.passportUpdate.spouseNameLabel')} name="spouseName" value={formData.spouseName} onChange={handleInputChange} />
            </div>
            <FormInput label={t('forms.passportUpdate.addressLabel')} name="address" value={formData.address} onChange={handleInputChange} className="mt-6" />

            <div className="pt-6 border-t dark:border-gray-700 mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">{t('forms.uploadsTitle')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FileUpload label={t('forms.passportUpdate.uploadOldPassportLabel')} name="oldPassport" onFileSelect={handleFileChange('oldPassport')} required />
                    <FileUpload label={t('forms.passportUpdate.uploadAadhaarLabel')} name="aadhaar" onFileSelect={handleFileChange('aadhaar')} required />
                    <FileUpload label={t('forms.passportUpdate.uploadPanLabel')} name="pan" onFileSelect={handleFileChange('pan')} />
                    <FileUpload label={t('forms.passportUpdate.uploadLcLabel')} name="lc" onFileSelect={handleFileChange('lc')} />
                    <FileUpload label={t('forms.passportUpdate.uploadMarksheetLabel')} name="marksheet" onFileSelect={handleFileChange('marksheet')} />
                </div>
            </div>
        </FormWrapper>
    );
};

export default PassportUpdateForm;