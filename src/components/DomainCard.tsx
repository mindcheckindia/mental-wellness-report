

import React from 'react';
import { Domain } from '../types';
import { getStylesForScore } from '../utils/helpers';
import { InformationCircleIcon, LightbulbIcon, UsersIcon, domainIcons } from './icons';
import ScoreBar from './ScoreBar';

interface DomainCardProps {
  domain: Domain;
  index: number;
  firstName: string;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, index, firstName }) => {
  // Get all style classes from the centralized helper function
  const { textColor, borderColor } = getStylesForScore(domain.score, domain.referenceIntervals);
  const IconComponent = domainIcons[domain.name];

  return (
    <div id={`domain-${index}`} className={`bg-white rounded-2xl shadow-lg border-l-8 transition-shadow duration-300 hover:shadow-xl ${borderColor}`}>
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4 sm:gap-x-4">
                 <div className="flex items-center mb-2 sm:mb-0">
                    {IconComponent && <IconComponent className="h-7 w-7 mr-3 text-blue-800 flex-shrink-0" />}
                     <h3 className="text-2xl font-bold text-blue-800 text-left">
                        {domain.name}
                     </h3>
                 </div>
                 <p className={`text-xl font-bold ${textColor} text-left sm:text-right sm:mt-1 flex-shrink-0`}>
                    {domain.userInterpretation}
                </p>
            </div>

            {/* Score Visualization */}
             {domain.score !== null && domain.referenceIntervals.length > 0 ? (
                <div className="mb-6">
                    <ScoreBar score={domain.score} intervals={domain.referenceIntervals} />
                </div>
            ) : (
                 <div className="mb-6 p-3 bg-gray-50 rounded-lg text-center text-gray-600 italic">Score not available</div>
            )}


            {/* Details Sections */}
            <div className="space-y-6">
                {/* About This Domain */}
                <div className="space-y-2">
                     <div className="flex items-center">
                         <InformationCircleIcon className="h-6 w-6 text-blue-500 mr-2" />
                        <h4 className="text-lg font-semibold text-gray-800">About This Domain</h4>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed pl-8">{domain.about}</p>
                    {domain.aboutLink && (
                        <a href={domain.aboutLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium mt-1 inline-block pl-8">
                        Learn More <span aria-hidden="true">&rarr;</span>
                        </a>
                    )}
                </div>
                
                {/* Insights & Support */}
                <div className="space-y-2">
                    <div className="flex items-center">
                        <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-2" />
                        <h4 className="text-lg font-semibold text-gray-800">Insights & Support</h4>
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed pl-8 whitespace-pre-wrap">{domain.insightsAndSupport}</p>
                </div>

                {/* Individuals Who Experienced This */}
                <div className="space-y-2">
                    <div className="flex items-center">
                        <UsersIcon className="h-6 w-6 text-teal-500 mr-2" />
                        <h4 className="text-lg font-semibold text-gray-700">Notable Figures with Similar Experiences</h4>
                    </div>
                    {domain.individualsExperienced && domain.individualsExperienced.length > 0 ? (
                    <div className="space-y-1 text-base pl-8">
                        {domain.individualsExperienced.map((person, pIndex) => (
                        <div key={pIndex}>
                            <a href={person.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                            {person.name}
                            </a>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-gray-600 italic text-base pl-8">N/A</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default DomainCard;