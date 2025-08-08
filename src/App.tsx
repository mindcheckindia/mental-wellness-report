
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { IndividualData } from '../api/_lib/types';
import { fetchDynamicReportData, fetchInsights } from './services/api';
import { globalResources } from './data/globalData';

import Header from './components/Header';
import IndividualInfo from './components/IndividualInfo';
import DomainCard from './components/DomainCard';
import GlobalResources from './components/GlobalResources';
import { GeneralDisclaimer, IndividualsDisclaimer } from './components/Disclaimer';
import DownloadButton from './components/DownloadButton';
import AtAGlance from './components/AtAGlance';
import { MagnifyingGlassIcon } from './components/icons';
import { mockReportData } from './data/mockData';
import VerificationSeal from './components/VerificationSeal';

declare const html2pdf: any;

const App: React.FC = () => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Generating your personalized report...');
    const [error, setError] = useState<string | null>(null);
    const [reportData, setReportData] = useState<IndividualData | null>(null);

    const handleGenerateReport = useCallback(async (id: string) => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        setReportData(null);

        try {
            setLoadingMessage('Fetching your assessment results...');
            const userData = await fetchDynamicReportData(id);

            setLoadingMessage('Generating AI-powered insights...');
            const insights = await fetchInsights(userData);
            
            const updatedDomains = userData.domains.map((domain, index) => ({
                ...domain,
                insightsAndSupport: insights[index] || domain.insightsAndSupport,
            }));
            
            const finalReportData = { ...userData, domains: updatedDomains };
            setReportData(finalReportData);
        } catch (apiError: any) {
            console.error("Failed to generate report:", apiError);
            setError(apiError.message || "An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // This useEffect hook runs once when the component mounts.
    // It's the key to the automatic report generation.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const submissionId = params.get('submissionId');
        if (submissionId) {
            handleGenerateReport(submissionId);
        }
    }, [handleGenerateReport]);


    const handleDownloadPdf = useCallback(() => {
        setIsGeneratingPdf(true);
        const element = reportRef.current;
        if (element) {
            const opt = {
                margin: 0.5,
                filename: `Mental_Wellness_Report_${reportData?.individualId}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            if (typeof html2pdf !== 'undefined') {
                html2pdf().set(opt).from(element).save().then(() => setIsGeneratingPdf(false));
            } else {
                setIsGeneratingPdf(false);
            }
        } else {
            setIsGeneratingPdf(false);
        }
    }, [reportData]);

    const handleReset = () => {
        // Clear the URL parameter and reload the page to the welcome screen
        window.location.href = window.location.pathname;
    };

    const handleViewSample = () => {
        setReportData(mockReportData);
    };
    
    if (isLoading) {
        return (
             <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
                <div className="flex items-center text-blue-800 text-xl font-semibold">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingMessage}
                </div>
                 <p className="mt-4 text-gray-600">This may take a moment...</p>
            </div>
        )
    }

    if (reportData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-inter flex flex-col items-center">
                 <div className="max-w-7xl w-full">
                    <div className="flex justify-between items-center mb-4">
                        <button 
                            onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            &larr; Return to Welcome Screen
                        </button>
                    </div>
                    <div ref={reportRef} className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12 border border-blue-200">
                        <Header />
                        <IndividualInfo data={reportData} />
                        <AtAGlance domains={reportData.domains} />

                        <div className="mt-12">
                            <h2 className="text-3xl font-bold text-blue-800 mb-6 border-b pb-3 border-blue-300">Your Detailed Results</h2>
                            <div className="space-y-8 mt-8">
                                {reportData.domains.map((domain, index) => (
                                    <DomainCard key={index} domain={domain} index={index} firstName={reportData.firstName} />
                                ))}
                            </div>
                            <IndividualsDisclaimer />
                        </div>

                        <GlobalResources resources={globalResources} />
                        
                        {/* Report Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:justify-between gap-8">
                            <VerificationSeal />
                            <div className="flex-1">
                                 <GeneralDisclaimer />
                            </div>
                        </div>
                    </div>
                    <DownloadButton onClick={handleDownloadPdf} isGenerating={isGeneratingPdf} />
                </div>
            </div>
        );
    }

    // Default View: Welcome screen with instructions OR error display
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
            <div className="max-w-2xl w-full text-center bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-blue-200">
                <MagnifyingGlassIcon className="h-16 w-16 mx-auto text-blue-400 mb-4" />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-3 tracking-tight">Mental Wellness Report</h1>
                
                {error ? (
                     <div className="mt-6">
                        <p className="text-lg text-red-700 font-semibold mb-4">There was a problem generating your report.</p>
                        <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg" role="alert">
                           <strong>Error:</strong> {error}
                        </div>
                         <button 
                            onClick={handleReset}
                            className="mt-6 px-6 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="text-lg text-gray-700 font-light mb-8">This application generates your personalized, AI-powered report automatically after you complete your assessment.</p>
                        
                        <button
                            onClick={handleViewSample}
                            className="mb-4 px-6 py-3 bg-teal-600 text-white font-bold rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300"
                        >
                            View a Sample Report
                        </button>

                        <p className="text-gray-600">Alternatively, complete the assessment through the provided Jotform link. You will be redirected here automatically to view your results.</p>
                    </div>
                )}
            </div>
             <footer className="text-center p-4 mt-8 text-gray-600 text-xs max-w-3xl mx-auto">
                <p>If you have been redirected here from Jotform and your report is not loading, please check the URL for a `submissionId` or try submitting the form again.</p>
            </footer>
        </div>
    );
};

export default App;
