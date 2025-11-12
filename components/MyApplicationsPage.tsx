import React, { useState } from 'react';
import { Application, ApplicationStatus } from '../types';
import Button from './ui/Button';
import { useTranslation } from '../hooks/useTranslation';

interface MyApplicationsPageProps {
    applications: Application[];
    onBack: () => void;
}

const statusStyles: { [key in ApplicationStatus]: string } = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    Query: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
};

const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => {
    const { t } = useTranslation();
    
    const getStatusKey = (status: ApplicationStatus) => {
        return `myApplications.statusValues.${status.toLowerCase().replace(' ', '')}`;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{application.serviceName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t('myApplications.submittedOn', { date: new Date(application.submittedAt).toLocaleDateString() })}
                </p>
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('myApplications.applicationId')}: {application.id}
                </p>
                {application.note && (
                     <div className="mt-3 text-sm bg-gray-100 dark:bg-gray-700/50 p-3 rounded-md border dark:border-gray-600">
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{t('myApplications.operatorNote')}:</p>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{application.note}</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                 <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[application.status]}`}>
                    {t(getStatusKey(application.status))}
                </span>
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">₹{application.charge}</p>
            </div>
        </div>
    );
};

const MyApplicationsPage: React.FC<MyApplicationsPageProps> = ({ applications, onBack }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const paginatedApplications = applications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('myApplications.title')}</h2>
                <Button onClick={onBack} variant="secondary">
                    &larr; {t('myApplications.backToHome')}
                </Button>
            </div>

            {applications.length > 0 ? (
                <>
                    <div className="space-y-4">
                        {paginatedApplications.map(app => <ApplicationCard key={app.id} application={app} />)}
                    </div>
                    {totalPages > 1 && (
                         <div className="flex justify-between items-center mt-8">
                            <Button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1} variant="secondary">
                                {t('myApplications.previous')}
                            </Button>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {t('myApplications.page', { currentPage: currentPage.toString(), totalPages: totalPages.toString() })}
                            </span>
                            <Button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages} variant="secondary">
                               {t('myApplications.next')}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center bg-gray-100 dark:bg-gray-800/50 p-12 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-lg text-gray-600 dark:text-gray-400">{t('myApplications.noApplications')}</p>
                </div>
            )}
        </div>
    );
};

export default MyApplicationsPage;
