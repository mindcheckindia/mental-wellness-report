import React from 'react';
import { IndividualData } from '../types';
import { formatAssessmentDate } from '../utils/helpers';

interface IndividualInfoProps {
  data: Pick<IndividualData, 'firstName' | 'lastName' | 'individualId' | 'email' | 'assessmentDate'>;
}

const IndividualInfo: React.FC<IndividualInfoProps> = ({ data }) => (
  <div className="mb-10 p-6 bg-blue-50 rounded-2xl border border-blue-200 shadow-inner">
    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-5 border-b pb-3 border-blue-300">Individual Snapshot</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-800 text-lg">
      <p><strong className="font-semibold text-blue-700">Name:</strong> {data.firstName} {data.lastName}</p>
      <p><strong className="font-semibold text-blue-700">Individual ID:</strong> {data.individualId}</p>
      <p><strong className="font-semibold text-blue-700">Email:</strong> {data.email}</p>
      <p><strong className="font-semibold text-blue-700">Assessment Date:</strong> {formatAssessmentDate(data.assessmentDate)}</p>
    </div>
  </div>
);

export default IndividualInfo;