export type UserRole = 'user' | 'operator' | 'admin';
export type ApplicationStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected' | 'Query';

export interface Service {
    id: string;
    // name is now handled by i18n
    charge: number;
    iconPath: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface Application {
    id: string;
    userId: string;
    userEmail: string;
    serviceId: string;
    serviceName: string; // Stored at time of creation for historical accuracy
    charge: number;
    status: ApplicationStatus;
    submittedAt: string; // ISO date string
    note?: string;
}
