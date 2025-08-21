

import { ReferenceInterval } from '../types';

/**
 * Generates a consistent set of Tailwind CSS color classes based on a score and its reference intervals.
 * This ensures that all UI elements related to a score (borders, text, backgrounds) are visually synchronized.
 * @param score The numerical score.
 * @param intervals The reference intervals for the score.
 * @returns An object with `bgColor`, `textColor`, `borderColor`, and `iconTextColor` classes.
 */
export const getStylesForScore = (score: number | null, intervals: ReferenceInterval[]): { bgColor: string, textColor: string, borderColor: string, iconTextColor: string } => {
    if (score === null || intervals.length === 0) {
        return {
            bgColor: 'bg-gray-300',
            textColor: 'text-gray-800',
            borderColor: 'border-gray-300',
            iconTextColor: 'text-gray-800'
        };
    }

    // Find the matching interval for the score
    let matchingInterval = [...intervals].reverse().find(i => score >= i.min && (i.max === null || score <= i.max));
    
    // Fallback for edge cases, e.g., if score is below the min of all intervals
    if (!matchingInterval) {
        matchingInterval = intervals.find(i => score <= (i.max ?? i.min));
    }
    
    const baseColor = matchingInterval ? matchingInterval.color : 'bg-gray-300';

    const textColors: { [key: string]: string } = {
        'bg-green-500': 'text-green-700',
        'bg-yellow-500': 'text-yellow-600',
        'bg-amber-400': 'text-amber-600',
        'bg-orange-500': 'text-orange-700',
        'bg-red-500': 'text-red-700',
        'bg-gray-300': 'text-gray-800'
    };

    const isDarkBg = ['bg-red-500', 'bg-orange-500', 'bg-green-500'].includes(baseColor);
    
    return {
        bgColor: baseColor,
        textColor: textColors[baseColor] || 'text-gray-800',
        borderColor: baseColor.replace('bg-', 'border-'),
        iconTextColor: isDarkBg ? 'text-white' : 'text-gray-800'
    };
};


// Function to format the assessment date to "DD Month YYYY"
export const formatAssessmentDate = (dateTimeString: string): string => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};