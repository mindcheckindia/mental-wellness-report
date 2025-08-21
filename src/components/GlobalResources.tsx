import React from 'react';
import { GlobalResource } from '../types';
import { ArrowRightCircleIcon } from './icons';

interface GlobalResourcesProps {
    resources: GlobalResource[];
}

const GlobalResources: React.FC<GlobalResourcesProps> = ({ resources }) => (
    <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-200 shadow-inner">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-5 border-b pb-3 border-blue-300">Global Mental Wellness Resources</h2>
        <p className="text-gray-700 mb-5 text-lg leading-relaxed">For comprehensive information and support on various mental health topics, you can explore the following reputable organizations:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-gray-800 text-base">
            {resources.map((resource, index) => (
                <div key={index} className="flex items-center">
                    <ArrowRightCircleIcon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0" />
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        {resource.text}
                    </a>
                </div>
            ))}
        </div>
    </div>
);

export default GlobalResources;