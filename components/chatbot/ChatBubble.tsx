import React from 'react';

interface ChatBubbleProps {
    role: 'user' | 'model';
    text: string;
    isLoading?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, text, isLoading = false }) => {
    const isUser = role === 'user';

    const bubbleClasses = isUser
        ? 'bg-indigo-600 text-white self-end'
        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start';
        
    const containerClasses = isUser
        ? 'flex justify-end'
        : 'flex justify-start';

    return (
        <div className={containerClasses}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${bubbleClasses}`}>
                 {isLoading ? (
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                ) : (
                   <p className="text-sm whitespace-pre-wrap">{text}</p>
                )}
            </div>
        </div>
    );
};

export default ChatBubble;