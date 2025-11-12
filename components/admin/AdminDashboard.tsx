import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Service, User, UserRole } from '../../types';
import ServiceManager from './ServiceManager';
import UserManager from './UserManager';

interface AdminDashboardProps {
    services: Service[];
    users: User[];
    onSaveService: (service: Service) => void;
    onUpdateUserRole: (userId: string, role: UserRole) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ services, users, onSaveService, onUpdateUserRole }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'services' | 'users'>('services');

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('admin.dashboardTitle')}</h1>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`${
                            activeTab === 'services'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        {t('admin.servicesTab')}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`${
                            activeTab === 'users'
                                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        {t('admin.usersTab')}
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'services' && <ServiceManager services={services} onSave={onSaveService} />}
                {activeTab === 'users' && <UserManager users={users} onUpdateRole={onUpdateUserRole} />}
            </div>
        </div>
    );
};

export default AdminDashboard;
