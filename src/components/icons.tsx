
import React from 'react';

// Props type for all icons
type IconProps = React.SVGProps<SVGSVGElement>;

export const InformationCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12v-.008z" />
  </svg>
);

export const LightbulbIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5c.621 0 1.125-.504 1.125-1.125v-2.625c0-.621-.504-1.125-1.125-1.125H6.375c-.621 0-1.125.504-1.125 1.125v2.625c0 .621.504 1.125 1.125 1.125zM10.5 16.5V9a2.25 2.25 0 0 1 2.25-2.25 2.25 2.25 0 0 1 2.25 2.25v7.5m-4.5 0h4.5" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM10.5 18.75a9 9 0 00-9-9.75 9 9 0 009-9.75M3.75 18a9.094 9.094 0 013.741-.479 3 3 0 014.682-2.72M13.5 18.75a9 9 0 01-9-9.75" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const DocumentArrowDownIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const ArrowRightCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const MagnifyingGlassIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
  </svg>
);

export const FeatherIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" opacity="0.4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-7.5 7.5 7.5 7.5" />
    </svg>
);


// ===== New Abstract Domain Icons =====

export const DepressionIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M16 14C15.5 13 14.2091 12 12 12C9.79086 12 8.5 13 8 14" strokeLinecap="round"/>
    </svg>
);

export const AngerIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M7 8L10 11L7 14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8L15 11L12 14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 8L20 11L17 14" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
);


export const ManiaIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M12 15L12 6" strokeLinecap="round"/>
        <path d="M15 9L12 6L9 9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const AnxietyIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M8 12H8.5L9.5 10L10.5 14L11.5 11L12.5 13L13.5 9L14.5 12H15" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SomaticIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="12" cy="8" r="2" strokeOpacity="0.7" />
        <path d="M12 10V11C12 12.1046 12.8954 13 14 13C15.1046 13 16 12.1046 16 11V10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10V11C12 12.1046 11.1046 13 10 13C8.89543 13 8 12.1046 8 11V10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 13L8 20" strokeLinecap="round" />
        <path d="M14 13L16 20" strokeLinecap="round" />
        <path d="M12 13V20" strokeLinecap="round" />
    </svg>
);


export const SuicideIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M12 12L8 8M12 12L16 16M12 12L16 8M12 12L8 16" strokeLinecap="round"/>
    </svg>
);

export const PsychosisIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="12" cy="12" r="3" strokeOpacity="0.7"/>
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4"/>
        <path d="M12 3V2" strokeLinecap="round"/>
        <path d="M12 22V21" strokeLinecap="round"/>
        <path d="M21 12L22 12" strokeLinecap="round"/>
        <path d="M2 12L3 12" strokeLinecap="round"/>
    </svg>
);

export const SleepIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
    </svg>
);


export const MemoryIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M12 16V12L14 10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const RepetitiveIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeOpacity="0.4" strokeWidth="1.5"/>
        <path d="M15 9L15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


export const DissociationIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="16.5" cy="7.5" r="2.5" strokeOpacity="0.7"/>
        <circle cx="7.5" cy="16.5" r="2.5" strokeOpacity="0.7"/>
        <path d="M12 12L20 20" strokeLinecap="round" strokeDasharray="2 2" strokeOpacity="0.4"/>
    </svg>
);

export const PersonalityIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="12" cy="12" r="9" strokeOpacity="0.4"/>
        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" strokeLinecap="round" strokeOpacity="0.7"/>
        <path d="M12 12C14.2091 12 16 13.7909 16 16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16C8 13.7909 9.79086 12 12 12Z" strokeLinecap="round" strokeOpacity="0.7"/>
    </svg>
);


// ===== Domain Icon Mapping =====
export const domainIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    'Depression': DepressionIcon,
    'Anger': AngerIcon,
    'Mania': ManiaIcon,
    'Anxiety': AnxietyIcon,
    'Somatic Symptoms': SomaticIcon,
    'Suicidal Ideation': SuicideIcon,
    'Psychosis': PsychosisIcon,
    'Sleep Problems': SleepIcon,
    'Memory': MemoryIcon,
    'Repetitive Thoughts and Behaviours': RepetitiveIcon,
    'Dissociation': DissociationIcon,
    'Personality Functioning': PersonalityIcon,
};
