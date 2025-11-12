import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', children, className = '', variant = 'primary', disabled = false }) => {
    const baseClasses = "px-5 py-2.5 rounded-lg font-semibold text-sm focus:outline-none focus:ring-4 focus:ring-offset-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-px";
    const variantClasses = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-300 dark:focus:ring-indigo-800',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-600',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;