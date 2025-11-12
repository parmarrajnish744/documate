import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options, required = false, className = '', disabled = false }) => {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="mt-1 block w-full pl-3 pr-10 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition disabled:bg-gray-100 dark:disabled:bg-gray-700/50 dark:disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                <option value="" disabled>Select a document</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;