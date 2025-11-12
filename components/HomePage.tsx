import React from 'react';
import { Service } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface HomePageProps {
    services: Service[];
    onApply: (serviceId: string) => void;
}

const ServiceCard: React.FC<{ service: Service & { name: string }; onSelect: () => void }> = ({ service, onSelect }) => {
    const { t } = useTranslation();
    return (
        <div
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-black/20 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1.5 transform transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            onClick={onSelect}
        >
            <div className="bg-indigo-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
                </svg>
            </div>
            <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 flex-grow">{service.name}</h3>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">₹{service.charge}</p>
            <button className="w-full mt-auto px-4 py-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-sm rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition-colors">
                {t('home.applyNow')}
            </button>
        </div>
    );
};


const HomePage: React.FC<HomePageProps> = ({ services, onApply }) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">{t('home.mainHeading')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                    {t('home.subHeading')}
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {services.map(service => (
                    <ServiceCard
                        key={service.id}
                        service={{...service, name: t(`services.${service.id}.name`)}}
                        onSelect={() => onApply(service.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
