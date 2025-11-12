import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AadhaarUpdateForm from './components/forms/AadhaarUpdateForm';
import PanNewForm from './components/forms/PanNewForm';
import PanUpdateForm from './components/forms/PanUpdateForm';
import VoterForms from './components/forms/VoterForms';
import PassportForms from './components/forms/PassportForms';
import DrivingLicenseNewForm from './components/forms/DrivingLicenseNewForm';
import DrivingLicenseUpdateForm from './components/forms/DrivingLicenseUpdateForm';
import GasNewConnectionForm from './components/forms/GasNewConnectionForm';
import PaymentGatewayPage from './components/PaymentGatewayPage';
import MyApplicationsPage from './components/MyApplicationsPage';
import AuthModal from './components/auth/AuthModal';
import Chatbot from './components/chatbot/Chatbot';
import AdminLoginPage from './components/AdminLoginPage';
import OperatorLoginPage from './components/OperatorLoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import OperatorDashboard from './components/operator/OperatorDashboard';

import { User, Service, Application, ApplicationStatus, UserRole } from './types';
import { INITIAL_SERVICES } from './constants';
import { useTranslation } from './hooks/useTranslation';

type Page = 'home' | 'form' | 'payment' | 'my-applications' | 'admin-login' | 'operator-login' | 'admin-dashboard' | 'operator-dashboard';

// Mock Data
const MOCK_USERS: User[] = [
    { id: 'user1', name: 'Regular User', email: 'user@example.com', role: 'user' },
    { id: 'op1', name: 'Ronak Bhai', email: 'operator@example.com', role: 'operator' },
    { id: 'admin1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

const App: React.FC = () => {
    // State management
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');
    
    // Master data state (would be in a DB in a real app)
    const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
    const [applications, setApplications] = useState<Application[]>([]);
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    
    const { t, locale } = useTranslation();

    // Effect to redirect if not authorized
    useEffect(() => {
        if (currentPage === 'admin-dashboard' && currentUser?.role !== 'admin') {
            setCurrentPage('home');
        }
        if (currentPage === 'operator-dashboard' && currentUser?.role !== 'operator') {
            setCurrentPage('home');
        }
         if (currentPage === 'my-applications' && currentUser?.role !== 'user') {
            setCurrentPage('home');
        }
    }, [currentPage, currentUser]);
    
    // Handlers
    const handleApply = (serviceId: string) => {
        if (!currentUser) {
            setAuthModalView('login');
            setIsAuthModalOpen(true);
            return;
        }
        setSelectedServiceId(serviceId);
        setCurrentPage('form');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setSelectedServiceId(null);
    };

    const handleProceedToPayment = () => {
        setCurrentPage('payment');
    };
    
    const handlePaymentSuccess = () => {
        const selectedService = services.find(s => s.id === selectedServiceId);
        if (selectedService && currentUser) {
            const newApplication: Application = {
                id: `APP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                userId: currentUser.id,
                userEmail: currentUser.email,
                serviceId: selectedService.id,
                serviceName: t(`services.${selectedService.id}.name`),
                charge: selectedService.charge,
                status: 'Pending',
                submittedAt: new Date().toISOString(),
            };
            setApplications(prev => [...prev, newApplication]);
        }
        handleBackToHome();
    };

    // Auth Handlers
    const handleLoginSuccess = (loggedInUser: User) => {
        setCurrentUser(loggedInUser);
        setIsAuthModalOpen(false);
        // Redirect based on role
        if(loggedInUser.role === 'admin') setCurrentPage('admin-dashboard');
        else if(loggedInUser.role === 'operator') setCurrentPage('operator-dashboard');
        else setCurrentPage('home');
    };
    
    const handleRegisterSuccess = (registeredUser: User) => {
        const newUser = { ...registeredUser, id: `user-${Date.now()}`, role: 'user' as UserRole };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsAuthModalOpen(false);
        setCurrentPage('home');
    };
    
    const handleLogoutClick = () => {
        setCurrentUser(null);
        setCurrentPage('home');
    };

    // Page Navigation Handlers
    const navigateTo = (page: Page) => setCurrentPage(page);

    // Operator Handlers
    const handleUpdateApplication = (updatedApp: Application) => {
        setApplications(apps => apps.map(app => app.id === updatedApp.id ? updatedApp : app));
    };
    
    // Admin Handlers
    const handleSaveService = (service: Service) => {
         setServices(prev => {
            const exists = prev.some(s => s.id === service.id);
            if (exists) {
                return prev.map(s => s.id === service.id ? service : s);
            }
            return [...prev, service];
        });
    }
    
    const handleUpdateUserRole = (userId: string, role: UserRole) => {
        setUsers(prev => prev.map(u => u.id === userId ? {...u, role} : u));
    }

    const selectedService = services.find(s => s.id === selectedServiceId);

    const renderForm = () => {
        if (!selectedService) return <HomePage services={services} onApply={handleApply} />;

        const formProps = {
            onBack: handleBackToHome,
            onProceedToPayment: handleProceedToPayment,
        };

        switch (selectedService.id) {
            case 'aadhaar-update': return <AadhaarUpdateForm {...formProps} />;
            case 'aadhaar-update-no-doc': return <AadhaarUpdateForm {...formProps} isNoDocFlow />;
            case 'pan-new': return <PanNewForm {...formProps} />;
            case 'pan-update': return <PanUpdateForm {...formProps} title={t('forms.panUpdate.title')} />;
            case 'pan-update-father': return <PanUpdateForm {...formProps} title={t('forms.panUpdate.titleFather')} />;
            case 'pan-update-name-mismatch': return <PanUpdateForm {...formProps} title={t('forms.panUpdate.titleMismatch')} />;
            case 'voter-new-update': return <VoterForms {...formProps} />;
            case 'passport-new-update': return <PassportForms {...formProps} />;
            case 'dl-new': return <DrivingLicenseNewForm {...formProps} />;
            case 'dl-address': return <DrivingLicenseUpdateForm {...formProps} title={t('forms.dlUpdate.titleAddress')} />;
            case 'dl-renewal': return <DrivingLicenseUpdateForm {...formProps} title={t('forms.dlUpdate.titleRenewal')} />;
            case 'dl-renewal-address': return <DrivingLicenseUpdateForm {...formProps} title={t('forms.dlUpdate.titleRenewalAddress')} />;
            case 'gas-new-single': return <GasNewConnectionForm {...formProps} defaultSelection="single" />;
            case 'gas-new-double': return <GasNewConnectionForm {...formProps} defaultSelection="double" />;
            default: return <HomePage services={services} onApply={handleApply} />;
        }
    };
    
    const renderContent = () => {
        switch (currentPage) {
            case 'home': return <HomePage services={services} onApply={handleApply} />;
            case 'form': return renderForm();
            case 'payment':
                if (!selectedService) return <HomePage services={services} onApply={handleApply} />;
                return <PaymentGatewayPage service={{...selectedService, name: t(`services.${selectedService.id}.name`)}} onPaymentSuccess={handlePaymentSuccess} onBack={() => setCurrentPage('form')} />;
            case 'my-applications':
                 return <MyApplicationsPage applications={applications.filter(a => a.userId === currentUser?.id)} onBack={handleBackToHome} />;
            case 'admin-login': return <AdminLoginPage onLogin={handleLoginSuccess} users={users} onBack={handleBackToHome} />;
            case 'operator-login': return <OperatorLoginPage onLogin={handleLoginSuccess} users={users} onBack={handleBackToHome} />;
            case 'admin-dashboard': return <AdminDashboard services={services} users={users} onSaveService={handleSaveService} onUpdateUserRole={handleUpdateUserRole} />;
            case 'operator-dashboard': return <OperatorDashboard applications={applications} onUpdateApplication={handleUpdateApplication} />;
            default: return <HomePage services={services} onApply={handleApply} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <Header
                user={currentUser}
                onLoginClick={() => { setAuthModalView('login'); setIsAuthModalOpen(true); }}
                onRegisterClick={() => { setAuthModalView('register'); setIsAuthModalOpen(true); }}
                onLogoutClick={handleLogoutClick}
                onMyApplicationsClick={() => navigateTo('my-applications')}
                onHomeClick={handleBackToHome}
            />
            <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
                {renderContent()}
            </main>
            <Footer onAdminLogin={() => navigateTo('admin-login')} onOperatorLogin={() => navigateTo('operator-login')} />
            {isAuthModalOpen && (
                <AuthModal
                    onClose={() => setIsAuthModalOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                    onRegisterSuccess={handleRegisterSuccess}
                    initialView={authModalView}
                    users={users}
                />
            )}
            <Chatbot />
        </div>
    );
};

export default App;
