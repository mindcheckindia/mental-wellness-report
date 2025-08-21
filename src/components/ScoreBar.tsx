import React, { useMemo } from 'react';
import { ReferenceInterval } from '../types';

interface ScoreBarProps {
    score: number | null;
    intervals: ReferenceInterval[];
}

interface DisplaySegment {
    type: 'interval' | 'gap';
    width: number;
    label?: string;
    range?: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, intervals }) => {
    const { scorePercentage, gradient, displaySegments, gridTemplateColumns } = useMemo(() => {
        if (intervals.length === 0) {
            return { scorePercentage: 0, gradient: '', displaySegments: [], gridTemplateColumns: '' };
        }

        const validIntervals = intervals.filter(i => i.max !== null);
        if (validIntervals.length === 0) {
             const singlePointMax = Math.max(...intervals.map(i => i.min));
             validIntervals.push({label: 'All Perfect', min: 0, max: singlePointMax, color: 'bg-green-500'});
        }

        const maxVal = Math.max(...validIntervals.map(i => i.max as number), ...intervals.map(i => i.min));
        const totalScoreRange = maxVal > 0 ? maxVal : 1; // e.g. 0-40 scale has range of 40

        const percentage = score !== null ? (score / totalScoreRange) * 100 : 0;
        const scorePerc = Math.max(0, Math.min(100, percentage));

        const sortedIntervals = [...intervals].sort((a, b) => a.min - b.min);

        const colorMap: { [key: string]: string } = {
            'bg-green-500': '#22c55e',
            'bg-yellow-500': '#eab308',
            'bg-orange-500': '#f97316',
            'bg-red-500': '#ef4444',
            'bg-amber-400': '#fbbd23', 
        };

        const colorStops = sortedIntervals.flatMap((interval) => {
            const color = colorMap[interval.color] || '#d1d5db';
            const startPercent = (interval.min / totalScoreRange) * 100;
            const endPercent = ((interval.max ?? totalScoreRange) / totalScoreRange) * 100;
            
            if (startPercent === endPercent) {
                 return [`${color} ${startPercent}%`, `${color} ${startPercent + 0.1}%`];
            }
            return [`${color} ${startPercent}%`, `${color} ${endPercent}%`];
        });

        const gradientCss = `linear-gradient(to right, ${colorStops.join(', ')})`;

        // --- New Grid Calculation Logic ---
        const segments: DisplaySegment[] = [];
        let lastMax = -1;

        for (const interval of sortedIntervals) {
            // Check for a gap before this interval
            if (interval.min > lastMax + 1) {
                segments.push({
                    type: 'gap',
                    width: interval.min - (lastMax + 1),
                });
            }

            // Add the current interval
            const maxLabel = interval.max !== null ? `-${interval.max}` : '+';
            const rangeLabel = interval.min === interval.max ? `${interval.min}` : `${interval.min}${maxLabel}`;
            segments.push({
                type: 'interval',
                width: (interval.max ?? totalScoreRange) - interval.min + (interval.max === null ? 0 : 1),
                label: interval.label,
                range: rangeLabel,
            });

            lastMax = interval.max ?? lastMax;
        }

        const gridCols = segments.map(s => `${s.width}fr`).join(' ');
        
        return {
            scorePercentage: scorePerc,
            gradient: gradientCss,
            displaySegments: segments,
            gridTemplateColumns: gridCols,
        };
    }, [score, intervals]);

    if (intervals.length === 0) return null;

    return (
        <div className="w-full">
            <div className="relative pt-8">
                {/* Score Pointer */}
                {score !== null && (
                    <div className="absolute top-0 flex flex-col items-center transition-all duration-500 z-10"
                         style={{ 
                            left: `clamp(4em, ${scorePercentage}%, calc(100% - 4em))`, 
                            transform: 'translateX(-50%)' 
                         }}>
                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Your Score ({score})</span>
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-700 mt-1" />
                    </div>
                )}
                
                {/* Gradient Bar */}
                <div className="h-3 rounded-full" style={{ background: gradient }} />

                {/* Labels Container using CSS Grid */}
                <div 
                    className="grid w-full mt-1 items-start"
                    style={{ gridTemplateColumns: gridTemplateColumns }}
                >
                    {displaySegments.map((seg, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-1">
                            {seg.type === 'interval' ? (
                                <>
                                    <span className="text-xs font-semibold text-gray-600 leading-tight">{seg.label}</span>
                                    <span className="text-xs text-gray-500">({seg.range})</span>
                                </>
                            ) : (
                                // Render a non-breaking space to hold the gap space in the grid
                                <>&nbsp;</>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoreBar;