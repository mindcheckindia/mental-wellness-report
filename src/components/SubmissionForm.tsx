import React, { useState } from 'react';
import { MagnifyingGlassIcon } from './icons';

interface SubmissionFormProps {
  onGenerate: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onGenerate, isLoading, error }) => {
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionId.trim() && !isLoading) {
      onGenerate(submissionId.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <div className="max-w-2xl w-full text-center bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-blue-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-3 tracking-tight">Mental Wellness Report</h1>
        <p className="text-lg sm:text-xl text-gray-700 font-light mb-8">Enter your Submission ID to generate your personalized, AI-powered report.</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={submissionId}
              onChange={(e) => setSubmissionId(e.target.value)}
              placeholder="Enter your Submission ID..."
              aria-label="Submission ID"
              className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !submissionId.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
              <span>Generate</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="text-sm text-gray-500 mt-8 space-y-2">
            <p>
                After completing your assessment via the form, you will receive a Submission ID. Use that ID here to view your report.
            </p>
        </div>
      </div>
       <footer className="text-center p-4 mt-8 text-gray-600 text-xs max-w-3xl mx-auto">
            <p className="font-bold">System Architecture Note:</p>
            <p>This application is now live. It fetches data from a secure backend server that processes your assessment results and stores them in a database.</p>
        </footer>
    </div>
  );
};

export default SubmissionForm;