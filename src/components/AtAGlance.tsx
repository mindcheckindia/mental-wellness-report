

import React from 'react';
import { Domain } from '../types';
import { getStylesForScore } from '../utils/helpers';
import { domainIcons } from './icons';

const AtAGlance: React.FC<{ domains: Domain[] }> = ({ domains }) => {
    return (
        <div className="mb-10 p-6 bg-blue-50 rounded-2xl border border-blue-200 shadow-inner">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-5 border-b pb-3 border-blue-300">Results Summary</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4 text-center">
                {domains.map((domain, index) => {
                    const IconComponent = domainIcons[domain.name];
                    const { bgColor, textColor, iconTextColor } = getStylesForScore(domain.score, domain.referenceIntervals);
                    
                    return (
                        <div key={index} title={`${domain.name}: ${domain.userInterpretation}`} className="flex flex-col items-center">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColor}`}>
                                {IconComponent ? <IconComponent className={`h-7 w-7 ${iconTextColor}`} /> : <div className={`h-7 w-7`}></div>}
                            </div>
                            <p className="mt-2 text-xs font-semibold text-gray-800 leading-tight w-full">{domain.name}</p>
                            <p className={`text-xs font-medium ${textColor}`}>{domain.userInterpretation}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AtAGlance;