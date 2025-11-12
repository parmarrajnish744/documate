

import React, { useState, useRef } from 'react';

interface FileUploadProps {
    label: string;
    name: string;
    onFileSelect: (file: File | null) => void;
    required?: boolean;
    helpText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, name, onFileSelect, required = false, helpText }) => {
    const [fileName, setFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file ? file.name : '');
        onFileSelect(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1 flex items-center">
                <input
                    type="file"
                    name={name}
                    id={name}
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                />
                <button
                    type="button"
                    onClick={handleButtonClick}
                    className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Choose File
                </button>
                <span className="ml-3 text-sm text-gray-500 dark:text-gray-400 truncate">{fileName || 'No file chosen'}</span>
            </div>
            {helpText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</p>}
        </div>
    );
};

export default FileUpload;