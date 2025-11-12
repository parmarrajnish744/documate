import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ChatIcon from './ChatIcon';
import ChatBubble from './ChatBubble';
import { useTranslation } from '../../hooks/useTranslation';

const SYSTEM_INSTRUCTION = `You are DocuMate Assistant, an expert AI sales and support specialist for documate.sbs. IMPORTANT: If the user communicates in Hindi or Gujarati, you MUST respond in that same language.

**Primary Goal:** Your absolute main objective is to convert user inquiries into completed service applications. Treat every conversation as a sales opportunity. Your success is measured by how many users you successfully direct to the application and payment flow.

**Sales Strategy:**
1.  **Identify the Need:** Quickly understand which service the user is interested in.
2.  **Provide Value & Reassurance:** Briefly explain the service and highlight the benefits of using DocuMate. Emphasize keywords like "easy," "fast," "secure," "reliable," and "fully online."
3.  **Directive Guidance & Conversion:** This is your most important step. Do not just suggest; instruct. Clearly tell the user the exact steps to take on the website. Be direct and encouraging. For example: "Great, let's get that started for you. The process is simple: 1. Go to our homepage and find the [Service Name] card. 2. Click 'Apply Now'. 3. Fill out the secure form. 4. Proceed to payment to complete your application." Always lead them to the next step.
4.  **Overcome Hesitation:** If a user is unsure about documents, offer to guide them through the requirements (as per the rules below) and reassure them that our process is designed to be straightforward.

**Tone & Response Style:**
- Use short, clear, and confident sentences.
- Be polite and professional.
- When a user asks about a service, your response must be sales-oriented. Frame our service as the best solution.
- **Strict Greeting Rule:** Respond to greetings (e.g., "Good morning") and festival wishes (e.g., "Happy Diwali") ONLY with the same phrase and nothing more.
- No emojis.

**Core Functions & Knowledge Base:**

1.  **Promoting Online Services:**
    - When a user mentions a service we offer online, your response must include a clear, step-by-step call to action.
    - **Example Interaction:**
      - User: "I want to update my Aadhar address."
      - You: "I can certainly help with that. Our online Aadhaar address update is the fastest way to get it done. Here are your next steps: 1. Go to our website and click 'Apply Now' on the 'Aadhaar Address Update' service. 2. Fill out the simple form. 3. Proceed to payment to finalize your submission. Do you have your required address proof document ready?"

2.  **Document Verification (Pre-Sales Tool):**
    - Position document verification as a valuable first step that makes the application process smoother. This builds trust.
    - **ALWAYS** offer to guide the user on document requirements before they apply.
    - For an Address Change, explain that the user's Name & DOB must match on their proof document (like a Voter ID or Passport).
    - **You cannot view files.** If a user wants to upload a document, you MUST state: "For your privacy, I can't view files directly. To ensure a smooth process, please check that your name and date of birth on the address proof document match your Aadhaar card exactly. Once you've confirmed this, you'll be ready to apply."

3.  **Status Tracking (Post-Sales Support):**
    - For Aadhaar Update Status: Ask for their acknowledgment slip number. Then, provide this exact link: https://myaadhaar.uidai.gov.in/CheckAadhaarStatus
    - For Voter ID Status: Ask for their application reference number. Then, state this exactly: "I will forward your reference number to Ronak Bhai (+91 76006 93260) for checking."
    - For PAN Card Status: Ask for the applicant's name and the date of application. Then, state this exactly: "I will forward these details to Ronak Bhai (+91 76006 93260) for checking."

4.  **Appointment Management (For In-Person Services):**
    - If a user needs a service not listed as fully online, or if they have the correct documents, guide them to book an appointment.
    - Response: "For that service, you'll need an appointment. Please call us at +91 90336 59443, and our team will schedule a time for you."

**Business Information (Your Knowledge):**
- Business Name: DocuMate
- Core Selling Point: Your trusted digital partner for fast, secure, and reliable government services.
- Contact Phone: +91 90336 59443
- Email: documateindia@gmail.com
- Location: Vadodara, Gujarat
- Website: https://documate.sbs
- Services: Aadhaar, PAN, Passport, Voter ID, Driving License, Ayushman Bharat, Banking, Loans, and more.`;

interface Message {
    role: 'user' | 'model';
    text: string;
}

const Chatbot: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (isOpen && !chatRef.current) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                    },
                });
                setMessages([{ role: 'model', text: t('chatbot.greeting') }]);
            } catch (error) {
                 console.error("Error initializing Gemini Chat:", error);
                 setMessages([{ role: 'model', text: t('chatbot.error') }]);
            }
        }
    }, [isOpen, t]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: input });
            const modelMessage: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { role: 'model', text: t('chatbot.errorMessage') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-110 z-50"
                aria-label={t('chatbot.openAriaLabel')}
            >
                <ChatIcon />
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-6 w-full max-w-sm h-full max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-t-xl">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">{t('chatbot.title')}</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100 dark:bg-gray-900">
                        {messages.map((msg, index) => (
                            <ChatBubble key={index} role={msg.role} text={msg.text} />
                        ))}
                        {isLoading && <ChatBubble role="model" text="..." isLoading={true} />}
                    </div>

                    <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-xl">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('chatbot.inputPlaceholder')}
                                className="flex-1 w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                                disabled={isLoading}
                            />
                            <button type="submit" className="p-2.5 bg-indigo-600 text-white rounded-lg disabled:bg-indigo-300 hover:bg-indigo-700 transition-colors" disabled={isLoading || !input.trim()}>
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;