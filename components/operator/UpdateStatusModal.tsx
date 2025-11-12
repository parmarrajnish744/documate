import React, { useState, useMemo } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Application, ApplicationStatus } from '../../types';
import Button from '../ui/Button';

interface UpdateStatusModalProps {
    application: Application;
    onClose: () => void;
    onUpdate: (updatedApplication: Application) => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ application, onClose, onUpdate }) => {
    const { t } = useTranslation();
    const [newStatus, setNewStatus] = useState<ApplicationStatus>(application.status);
    const [note, setNote] = useState(application.note || '');
    
    const statusOptions: ApplicationStatus[] = ['Pending', 'In Progress', 'Completed', 'Rejected', 'Query'];

    const handleUpdate = () => {
        if (!note.trim()) {
            alert('Note is required.');
            return;
        }
        onUpdate({ ...application, status: newStatus, note });
    };
    
    const notePlaceholder = useMemo(() => {
        switch(newStatus) {
            case 'Completed': return t('operator.updateStatusModal.notePlaceholderCompleted');
            case 'Rejected': return t('operator.updateStatusModal.notePlaceholderRejected');
            case 'Query': return t('operator.updateStatusModal.notePlaceholderQuery');
            default: return t('operator.updateStatusModal.notePlaceholderDefault');
        }
    }, [newStatus, t]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full relative">
                <h3 className="text-lg font-bold mb-4">{t('operator.updateStatusModal.title')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('operator.updateStatusModal.appId')}: {application.id}</p>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('operator.updateStatusModal.newStatusLabel')}</label>
                        <select
                            id="status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{t(`myApplications.statusValues.${status.toLowerCase().replace(' ', '')}`)}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('operator.updateStatusModal.noteLabel')}</label>
                         <textarea
                            id="note"
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder={notePlaceholder}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={onClose}>{t('operator.updateStatusModal.cancelButton')}</Button>
                    <Button onClick={handleUpdate}>{t('operator.updateStatusModal.updateButton')}</Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatusModal;