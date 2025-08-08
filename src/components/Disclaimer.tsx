
import React from 'react';
import { ExclamationTriangleIcon } from './icons';

const GeneralDisclaimer: React.FC = () => (
    <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200 text-yellow-900 text-base shadow-inner">
        <div className="flex items-start">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
            <div>
                <p className="font-bold mb-2">Important Note:</p>
                <p className="leading-relaxed">This report is based on self-assessment data and is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. The scoring methodologies used in this assessment are derived from established clinical frameworks, including the DSM-5-TR Level 1 measures, PROMIS® (Patient-Reported Outcomes Measurement Information System), the Altman Self-Rating Mania Scale (ASRM), the Patient Health Questionnaire (PHQ-15), and the Florida Obsessive-Compulsive Inventory (FOCI). If you have concerns about your mental health, please consult with a qualified healthcare professional.</p>
            </div>
        </div>
    </div>
);

const IndividualsDisclaimer: React.FC = () => (
    <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm italic">
        <p className="font-semibold mb-2">Note on "Notable Figures":</p>
        <p>The individuals listed are public figures who have openly discussed their experiences or are widely associated with them based on public information. This is for general awareness and to show that these experiences are common. It is not a comprehensive list, and mental health journeys are unique to each individual.</p>
    </div>
);

export { GeneralDisclaimer, IndividualsDisclaimer };
