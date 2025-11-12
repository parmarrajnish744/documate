import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Application, ApplicationStatus } from '../../types';
import Button from '../ui/Button';
import UpdateStatusModal from './UpdateStatusModal';

interface OperatorDashboardProps {
    applications: Application[];
    onUpdateApplication: (updatedApplication: Application) => void;
}

const statusStyles: { [key in ApplicationStatus]: string } = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    Query: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
};

const OperatorDashboard: React.FC<OperatorDashboardProps> = ({ applications, onUpdateApplication }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<ApplicationStatus | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);

    const filteredApplications = applications
        .filter(app => filter === 'All' || app.status === filter)
        .filter(app => {
            const query = searchQuery.toLowerCase().trim();
            if (!query) return true;
            return (
                app.id.toLowerCase().includes(query) ||
                app.userEmail.toLowerCase().includes(query)
            );
        });
    
    const getStatusKey = (status: ApplicationStatus) => {
        return `myApplications.statusValues.${status.toLowerCase().replace(' ', '')}`;
    }
    
    const handleUpdate = (updatedApp: Application) => {
        onUpdateApplication(updatedApp);
        setSelectedApp(null);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('operator.dashboardTitle')}</h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div>
                    <label htmlFor="status-filter" className="sr-only">{t('operator.filterByStatus')}</label>
                    <select 
                        id="status-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as ApplicationStatus | 'All')}
                        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 pl-3 pr-10 text-sm focus:ring-indigo-500 focus:border-indigo-500 h-full"
                    >
                        <option value="All">{t('operator.allStatuses')}</option>
                        {Object.keys(statusStyles).map(status => (
                            <option key={status} value={status}>{t(getStatusKey(status as ApplicationStatus))}</option>
                        ))}
                    </select>
                </div>
                <div className="relative flex-grow">
                     <label htmlFor="search-applications" className="sr-only">Search Applications</label>
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                     </div>
                    <input
                        id="search-applications"
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('operator.searchPlaceholder')}
                        className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.appIdHeader')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.userHeader')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.serviceHeader')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.submittedHeader')}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.statusHeader')}</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('operator.actionsHeader')}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                       {filteredApplications.map(app => (
                           <tr key={app.id}>
                               <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">{app.id}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{app.userEmail}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{app.serviceName}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(app.submittedAt).toLocaleDateString()}</td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm">
                                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[app.status]}`}>
                                       {t(getStatusKey(app.status))}
                                   </span>
                               </td>
                               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                   <Button variant="secondary" onClick={() => setSelectedApp(app)}>{t('operator.updateStatus')}</Button>
                               </td>
                           </tr>
                       ))}
                    </tbody>
                </table>
                 {filteredApplications.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">No applications found.</p>}
            </div>

            {selectedApp && (
                <UpdateStatusModal 
                    application={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default OperatorDashboard;