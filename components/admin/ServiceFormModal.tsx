import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Service } from '../../types';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';

interface ServiceFormModalProps {
    service: Service | null;
    onClose: () => void;
    onSave: (service: Service) => void;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ service, onClose, onSave }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        id: '',
        charge: 0,
        iconPath: '',
    });

    useEffect(() => {
        if (service) {
            setFormData({
                id: service.id,
                charge: service.charge,
                iconPath: service.iconPath,
            });
        }
    }, [service]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: formData.id,
            charge: formData.charge,
            iconPath: formData.iconPath,
        });
    };
    
    const title = service ? t('admin.serviceForm.editTitle') : t('admin.serviceForm.addTitle');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full relative">
                <h3 className="text-lg font-bold mb-4">{title}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label={t('admin.serviceForm.idLabel')}
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        required
                        className={service ? 'pointer-events-none opacity-50' : ''}
                    />
                    <FormInput
                        label={t('admin.serviceForm.priceLabel')}
                        name="charge"
                        type="number"
                        value={String(formData.charge)}
                        onChange={handleInputChange}
                        required
                    />
                     <FormInput
                        label={t('admin.serviceForm.iconPathLabel')}
                        name="iconPath"
                        value={formData.iconPath}
                        onChange={handleInputChange}
                        required
                    />
                     <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>{t('admin.serviceForm.cancel')}</Button>
                        <Button type="submit">{t('admin.serviceForm.save')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceFormModal;