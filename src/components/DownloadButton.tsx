import React from 'react';
import { DocumentArrowDownIcon } from './icons';

interface DownloadButtonProps {
    onClick: () => void;
    isGenerating: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, isGenerating }) => (
    <div className="text-center mt-12 mb-4">
        <button
            onClick={onClick}
            disabled={isGenerating}
            className={`inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105
              ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isGenerating ? (
                'Generating PDF...'
            ) : (
                <>
                    <DocumentArrowDownIcon className="h-6 w-6 mr-2" />
                    Download as PDF
                </>
            )}
        </button>
    </div>
);

export default DownloadButton;