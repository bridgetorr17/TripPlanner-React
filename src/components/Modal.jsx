// src/components/Modal.jsx
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    // Close on Escape key press
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
        }
        if (isOpen) window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return <></>;
    }

    else { 
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <div
                    className="bg-white rounded-lg w-full max-w-md p-6 relative z-10"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {title && <h2 id="modal-title" className="text-lg font-semibold mb-4">{title}</h2>}
                    {children}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
            </div>
        );
    }
}
