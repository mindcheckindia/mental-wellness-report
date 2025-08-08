
import React from 'react';
import { ShieldCheckIcon } from './icons';

const VerificationSeal: React.FC = () => (
    <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-gray-800 shadow-inner w-full sm:max-w-sm lg:max-w-xs">
        <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 mr-2" />
            Verified By
        </h3>
        <div className="space-y-1.5 text-sm">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Name:</span>
                <span className="text-right">Dr. Evelyn Reed</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Qualification:</span>
                <span className="text-right">Clinical Psychologist</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Date:</span>
                <span className="text-right">July 26, 2024</span>
            </div>
        </div>
    </div>
);

export default VerificationSeal;
