import { Service } from './types';

// The 'name' property will be handled by the i18n system via service.id
export const INITIAL_SERVICES: Omit<Service, 'name'>[] = [
    { id: 'aadhaar-update', charge: 350, iconPath: 'M15 9h-3v3h3V9zm-6 0H6v3h3V9zm6 5h-3v3h3v-3zm-6 0H6v3h3v-3z M15 5H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2z' },
    { id: 'aadhaar-update-no-doc', charge: 750, iconPath: 'M15 9h-3v3h3V9zm-6 0H6v3h3V9zm6 5h-3v3h3v-3zm-6 0H6v3h3v-3z M15 5H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2z' },
    { id: 'pan-new', charge: 300, iconPath: 'M3 10h18M3 6h18M3 14h18M3 18h18' },
    { id: 'pan-update', charge: 300, iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'pan-update-father', charge: 500, iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'pan-update-name-mismatch', charge: 1000, iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { id: 'voter-new-update', charge: 200, iconPath: 'M11 11V5.05C11 4.47 10.53 4 9.95 4H5.05C4.47 4 4 4.47 4 5.05V11h7zm-5.5-2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM19.95 11H15V5.05C15 4.47 15.47 4 16.05 4h3.9C20.53 4 21 4.47 21 5.05V11h-1.05zM12 21v-5.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5V21h-6z' },
    { id: 'passport-new-update', charge: 2000, iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945C20.43 14.333 16.697 17 12 17s-8.43-2.667-8.945-6zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z' },
    { id: 'dl-new', charge: 1500, iconPath: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.707 4.293a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z' },
    { id: 'dl-address', charge: 800, iconPath: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.707 4.293a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z' },
    { id: 'dl-renewal', charge: 800, iconPath: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.707 4.293a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z' },
    { id: 'dl-renewal-address', charge: 1000, iconPath: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-6.707 4.293a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z' },
    { id: 'gas-new-single', charge: 6600, iconPath: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.5 7-6.343 6.657z M11 15a1 1 0 100-2 1 1 0 000 2z' },
    { id: 'gas-new-double', charge: 9700, iconPath: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0122 12c0 3.771-2.5 7-6.343 6.657z M11 15a1 1 0 100-2 1 1 0 000 2z' },
];
