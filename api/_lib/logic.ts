

import { IndividualData, Domain, ReferenceInterval } from './types.js';

// ====================================================================================
// Configuration Complete
// ------------------------------------------------------------------------------------
// This file has been updated with the specific Jotform question IDs from the
// provided document. The scoring logic is now aligned with your live form.
// ====================================================================================


// This interface represents the expected structure of data from Jotform.
export interface JotformSubmission {
  submissionId: string;
  firstName: string;
  lastName: string;
  email: string;
  assessmentDate: string;
  answers: { [questionId: string]: any };
}

// Re-exporting IndividualData for use in API routes
export type { IndividualData };


// --- SCORING AND INTERPRETATION LOGIC ---

// --- Answer to Value Conversion ---
// Different measures use different scales. These functions standardize them.

const answerToValueMap: { [key: string]: number } = {
    'not at all': 0, 'never': 0,
    'less than a day or two': 1, 'rarely': 1, 'a little bit': 1, 'mild': 1, 'slight': 1,
    'several days': 2, 'sometimes': 2, 'fair': 2,
    'more than half the days': 3, 'often': 3, 'quite a bit': 3, 'moderate': 3,
    'nearly every day': 4, 'always': 4, 'very much': 4, 'extreme': 4
};

const getBaseValue = (answer: any): number | null => {
    if (answer === null || answer === undefined || answer === '') return null;
    const directNumber = parseInt(answer, 10);
    if (!isNaN(directNumber) && directNumber >= 0 && directNumber <= 5) return directNumber;

    const lowerAnswer = String(answer).toLowerCase();
    for (const key in answerToValueMap) {
        if (lowerAnswer.includes(key)) {
            return answerToValueMap[key];
        }
    }
    return null;
};

// For PROMIS scales (1-5)
const answerToPROMISValue = (answer: any, isReversed: boolean = false): number | null => {
    const baseValue = getBaseValue(answer);
    if (baseValue === null) return null;
    const score = baseValue + 1; // Convert from 0-4 range to 1-5 range
    return isReversed ? 6 - score : score;
};

// For Somatic Symptoms (PHQ-15) scale (0-2)
const answerToPHQ15Value = (answer: any): number | null => {
    const baseValue = getBaseValue(answer);
    if (baseValue === null) return null;
    if (baseValue === 0) return 0; // Not at all
    if (baseValue === 1) return 1; // Bothered a little
    return 2; // Bothered a lot (maps from base values 2, 3, 4)
};

// For default DSM scales (0-4) like ASRM, FOCI, and Level 1 screeners
const answerToDefaultValue = (answer: any): number | null => {
    return getBaseValue(answer);
};

// --- Scoring Methodologies ---
type ScoringMethod = 'SUM' | 'MAX_THRESHOLD' | 'AVERAGE';
type AnswerMapping = 'PROMIS' | 'PHQ15' | 'DEFAULT';

interface DomainConfig {
  name: string;
  about: string;
  aboutLink: string;
  questionIds: { id: string, reverse?: boolean }[];
  scoringMethod: ScoringMethod;
  answerMapping: AnswerMapping;
  referenceIntervals: ReferenceInterval[];
  individualsExperienced: { name: string; link: string; }[];
  intendedQuestionCount?: number; // For prorating scores correctly
}


// --- DOMAIN CONFIGURATION ---
// This new structure holds all the configuration for each domain, including the correct
// scoring method and interpretation intervals derived from the provided DSM-5 PDFs.
const domainConfigs: DomainConfig[] = [
    { 
        name: 'Depression',
        scoringMethod: 'SUM',
        answerMapping: 'PROMIS',
        intendedQuestionCount: 10,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt' }, { id: 'ltemgtinTheltemgtltstronggtItemgt5' }, { id: 'ltemgtinTheltemgtltstronggtItemgt6' }, { id: 'ltemgtinTheltemgtltstronggtItemgt7' },
            { id: 'ltemgtinTheltemgtltstronggtltemgt8' }, { id: 'ltemgtinTheltemgtltstronggtItemgt9' }, { id: 'ltemgtinTheltemgtltstronggtitemgt10' }, { id: 'ltemgtinTheltemgtltstronggtitemgt11' },
            { id: 'ltemgtinTheltemgtltstronggtitemgt13' }, { id: 'ltemgtinTheltemgtltstronggtltemgt14' }
        ],
        referenceIntervals: [ // 8 questions, 1-5 scale. Range 8-40. (Prorated for 10)
            { label: 'None to slight', min: 10, max: 27, color: 'bg-green-500' }, // T < 60
            { label: 'Moderate', min: 28, max: 41, color: 'bg-orange-500' }, // T 60-69.9
            { label: 'Severe', min: 42, max: 50, color: 'bg-red-500' } // T >= 70
        ],
        about: 'Assesses core symptoms of depression. Score is based on the 8-item PROMIS Emotional Distress–Depression–Short Form, expanded with additional questions.',
        aboutLink: 'https://www.who.int/news-room/fact-sheets/detail/depression',
        individualsExperienced: [
            { name: 'Deepika Padukone', link: 'https://www.onlymyhealth.com/deepika-padukone-on-depression-and-tips-to-overcome-suicidal-thoughts-12977825587' },
            { name: 'Abraham Lincoln', link: 'https://en.wikipedia.org/wiki/Health_of_Abraham_Lincoln#Depression' },
        ],
    },
    { 
        name: 'Anger',
        scoringMethod: 'SUM',
        answerMapping: 'PROMIS',
        intendedQuestionCount: 6,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt15' }, { id: 'ltemgtinTheltemgtltstronggtltemgt16' }, { id: 'ltemgtinTheltemgtltstronggtItemgt17' }, 
            { id: 'ltemgtinTheltemgtltstronggtitemgt18' }, { id: 'ltemgtinTheltemgtltstronggtItemgt19' }, { id: 'ltemgtinTheltemgtltstronggtItemgt20' }
        ],
        referenceIntervals: [ // 5 questions, 1-5 scale. Range 5-25. (Prorated for 6)
            { label: 'None to slight', min: 6, max: 15, color: 'bg-green-500' }, // T < 55
            { label: 'Mild', min: 16, max: 18, color: 'bg-yellow-500' }, // T 55-59.9
            { label: 'Moderate', min: 19, max: 24, color: 'bg-orange-500' }, // T 60-69.9
            { label: 'Severe', min: 25, max: 30, color: 'bg-red-500' } // T >= 70
        ],
        about: 'Measures feelings of anger and irritability. Score is based on the 5-item PROMIS Emotional Distress–Anger–Short Form, expanded with an additional question.',
        aboutLink: 'https://www.apa.org/topics/anger/control',
        individualsExperienced: [
            { name: 'Russell Brand', link: 'https://www.healthline.com/health/celebrities-with-bipolar-disorder' },
            { name: 'Kanye West', link: 'https://www.biography.com/musicians/kanye-west-mental-health' }
        ],
    },
    { 
        name: 'Mania',
        scoringMethod: 'SUM',
        answerMapping: 'DEFAULT',
        intendedQuestionCount: 7,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt21' }, { id: 'ltemgtinTheltemgtltstronggtltemgt27' }, { id: 'ltemgtinTheltemgtltstronggtItemgt22' }, { id: 'ltemgtinTheltemgtltstronggtitemgt23' }, 
            { id: 'ltemgtinTheltemgtltstronggtitemgt24' }, { id: 'ltemgtinTheltemgtltstronggtltemgt25' }, { id: 'ltemgtinTheltemgtltstronggtltemgt26' }
        ],
        referenceIntervals: [ // 5 questions, 0-4 scale. Range 0-20. (Prorated for 7)
            { label: 'Low Probability', min: 0, max: 8, color: 'bg-green-500' },
            { label: 'High Probability', min: 9, max: 28, color: 'bg-red-500' }
        ],
        about: 'Assesses symptoms of mania or hypomania using the Altman Self-Rating Mania Scale. A score of 6 or higher suggests a high probability of a manic or hypomanic condition.',
        aboutLink: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder',
        individualsExperienced: [
            { name: 'Mariah Carey', link: 'https://www.webmd.com/bipolar-disorder/ss/slideshow-celebrities-bipolar-disorder' },
            { name: 'Demi Lovato', link: 'https://people.com/health/demi-lovato-relieved-to-be-diagnosed-bipolar/' }
        ],
    },
    { 
        name: 'Anxiety',
        scoringMethod: 'SUM',
        answerMapping: 'PROMIS',
        intendedQuestionCount: 10,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt28' }, { id: 'ltemgtinTheltemgtltstronggtltemgt29' }, { id: 'ltemgtinTheltemgtltstronggtItemgt30' }, { id: 'ltemgtinTheltemgtltstronggtitemgt31' },
            { id: 'ltemgtinTheltemgtltstronggtItemgt32' }, { id: 'ltemgtinTheltemgtltstronggtltemgt33' }, { id: 'ltemgtinTheltemgtltstronggtltemgt34' }, { id: 'ltemgtinTheltemgtltstronggtitemgt35' },
            { id: 'ltemgtinTheltemgtltstronggtitemgt36' }, { id: 'ltemgtinTheltemgtltstronggtItemgt37' }
        ],
        referenceIntervals: [ // 7 questions, 1-5 scale. Range 7-35. (Prorated for 10)
            { label: 'None to slight', min: 10, max: 21, color: 'bg-green-500' }, // T < 55
            { label: 'Mild', min: 22, max: 27, color: 'bg-yellow-500' }, // T 55-59.9
            { label: 'Moderate', min: 28, max: 38, color: 'bg-orange-500' }, // T 60-69.9
            { label: 'Severe', min: 39, max: 50, color: 'bg-red-500' } // T >= 70
        ],
        about: 'Evaluates common symptoms of anxiety. Score is based on the 7-item PROMIS Emotional Distress–Anxiety–Short Form, expanded with additional questions.',
        aboutLink: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
        individualsExperienced: [
            { name: 'Adele', link: 'https://www.gmanetwork.com/news/lifestyle/healthandwellness/806235/adele-says-working-out-helped-with-her-anxiety-it-was-never-about-losing-weight/story/' },
            { name: 'Karan Johar', link: 'https://yourdost.com/blog/2016/09/celebrity-depression-karan-johar.html' },
        ],
    },
    { 
        name: 'Somatic Symptoms',
        scoringMethod: 'SUM',
        answerMapping: 'PHQ15',
        intendedQuestionCount: 17,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtitemgt38' }, { id: 'ltemgtinTheltemgtltstronggtItemgt39' }, { id: 'ltemgtinTheltemgtltstronggtItemgt40' }, { id: 'ltemgtinTheltemgtltstronggtitemgt41' }, 
            { id: 'ltemgtinTheltemgtltstronggtItemgt42' }, { id: 'ltemgtinTheltemgtltstronggtItemgt43' }, { id: 'ltemgtinTheltemgtltstronggtltemgt44' }, { id: 'ltemgtinTheltemgtltstronggtltemgt45' }, 
            { id: 'ltemgtinTheltemgtltstronggtltemgt46' }, { id: 'ltemgtinTheltemgtltstronggtitemgt47' }, { id: 'ltemgtinTheltemgtltstronggtItemgt48' }, { id: 'ltemgtinTheltemgtltstronggtItemgt49' },
            { id: 'ltemgtinTheltemgtltstronggtltemgt50' }, { id: 'ltemgtinTheltemgtltstronggtltemgt51' }, { id: 'ltemgtinTheltemgtltstronggtltemgt52' }, { id: 'ltemgtinTheltemgtltstronggtItemgt53' }, 
            { id: 'ltemgtinTheltemgtltstronggtItemgt54' }
        ],
        referenceIntervals: [ // 15 questions, 0-2 scale. Range 0-30. (Prorated for 17)
            { label: 'Minimal', min: 0, max: 5, color: 'bg-green-500' },
            { label: 'Low', min: 6, max: 11, color: 'bg-yellow-500' },
            { label: 'Medium', min: 12, max: 16, color: 'bg-orange-500' },
            { label: 'High', min: 17, max: 34, color: 'bg-red-500' }
        ],
        about: 'Focuses on physical symptoms that may be related to psychological distress, based on the Patient Health Questionnaire 15 (PHQ-15).',
        aboutLink: 'https://www.psychiatry.org/patients-families/somatic-symptom-disorder/what-is-somatic-symptom-disorder',
        individualsExperienced: [
            { name: 'Lady Gaga', link: 'https://ukfibromyalgia.com/blog/celebrities-with-fibromyalgia-lady-gaga' },
            { name: 'Oprah Winfrey', link: 'https://www.cbsnews.com/news/oprah-reports-on-childhood-traumas-long-term-effects/' }
        ],
    },
    { 
        name: 'Suicidal Ideation',
        scoringMethod: 'MAX_THRESHOLD',
        answerMapping: 'DEFAULT',
        questionIds: [{ id: 'ltemgtinTheltemgtltstronggtItemgt55' }],
        referenceIntervals: [
            { label: 'Within normal limits', min: 0, max: 0, color: 'bg-green-500' },
            { label: 'Further inquiry indicated', min: 1, max: 4, color: 'bg-red-500' }
        ],
        about: 'Screens for thoughts of self-harm. A score of "Slight" or greater indicates need for further inquiry.',
        aboutLink: 'https://988lifeline.org/',
        individualsExperienced: [
            { name: 'J.K. Rowling', link: 'https://www.cbsnews.com/news/potter-creator-once-contemplated-suicide/' },
            { name: 'Jon Hamm', link: 'https://sunlightrecovery.com/jon-hamm-chronic-depression/' }
        ],
    },
    { 
        name: 'Psychosis',
        scoringMethod: 'MAX_THRESHOLD',
        answerMapping: 'DEFAULT',
        questionIds: [{ id: 'ltemgtinTheltemgtltstronggtltemgt56' }, { id: 'ltemgtinTheltemgtltstronggtltemgt57' }],
        referenceIntervals: [
            { label: 'Within normal limits', min: 0, max: 0, color: 'bg-green-500' },
            { label: 'Further inquiry indicated', min: 1, max: 4, color: 'bg-red-500' }
        ],
        about: 'Identifies unusual thoughts or perceptions. A score of "Slight" or greater indicates need for further inquiry.',
        aboutLink: 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/what-is-psychosis',
        individualsExperienced: [
            { name: 'John Nash', link: 'https://livingwithschizophreniauk.org/john-nash/' },
            { name: 'Brian Wilson', link: 'https://www.biography.com/musicians/brian-wilson-mental-health-illness' }
        ],
    },
    { 
        name: 'Sleep Problems',
        scoringMethod: 'SUM',
        answerMapping: 'PROMIS',
        intendedQuestionCount: 8,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt58' },
            { id: 'ltemgtinTheltemgtltstronggtItemgt60', reverse: false }, // restless
            { id: 'ltemgtinTheltemgtltstronggtltemgt61', reverse: true }, // satisfied
            { id: 'ltemgtinTheltemgtltstronggtItemgt62', reverse: true }, // refreshing
            { id: 'ltemgtinTheltemgtltstronggtltemgt63', reverse: false }, // difficulty falling
            { id: 'ltemgtinTheltemgtltstronggtItemgt64', reverse: false }, // trouble staying
            { id: 'ltemgtinTheltemgtltstronggtitemgt65' },
            { id: 'ltemgtinTheltemgtltstronggtItemgt66', reverse: true }, // got enough
            { id: 'ltemgtinTheltemgtltstronggtltemgt67', reverse: true }  // quality was
        ],
        referenceIntervals: [ // Range for 8 questions is 8-40. Score will be prorated.
            { label: 'None to slight', min: 8, max: 25, color: 'bg-green-500' }, // T < 55
            { label: 'Mild', min: 26, max: 28, color: 'bg-yellow-500' }, // T 55-59.9
            { label: 'Moderate', min: 29, max: 36, color: 'bg-orange-500' }, // T 60-69.9
            { label: 'Severe', min: 37, max: 40, color: 'bg-red-500' } // T >= 70
        ],
        about: 'Evaluates sleep quality based on the 8-item PROMIS Sleep Disturbance scale. Some questions are reverse-scored.',
        aboutLink: 'https://www.sleepfoundation.org/insomnia',
        individualsExperienced: [
            { name: 'Jimmy Kimmel', link: 'https://www.rxwiki.com/slideshow/celebrities-who-have-trouble-sleeping/jimmy-kimmel' },
        ],
    },
    { 
        name: 'Memory',
        scoringMethod: 'MAX_THRESHOLD',
        answerMapping: 'DEFAULT',
        questionIds: [{ id: 'ltemgtinTheltemgtltstronggtItemgt68' }],
        referenceIntervals: [
            { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
            { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
        ],
        about: 'Assesses memory problems. A score of "Mild" or greater indicates need for further inquiry.',
        aboutLink: 'https://www.nia.nih.gov/health/memory-forgetfulness-and-aging-whats-normal-and-whats-not',
        individualsExperienced: [
            { name: 'Ronald Reagan', link: 'https://optoceutics.com/famous-people-celebrities-singers-with-alzheimers/' },
        ],
    },
    { 
        name: 'Repetitive Thoughts and Behaviours',
        scoringMethod: 'AVERAGE',
        answerMapping: 'DEFAULT',
        intendedQuestionCount: 7,
        questionIds: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt69' }, { id: 'ltemgtinTheltemgtltstronggtltemgt70' }, { id: 'ltemgtinTheltemgtltstronggtltemgt71' }, 
            { id: 'ltemgtinTheltemgtltstronggtltemgt72' }, { id: 'ltemgtinTheltemgtltstronggtItemgt73' }, { id: 'ltemgtinTheltemgtltstronggtltemgt74' }, 
            { id: 'ltemgtinTheltemgtltstronggtltemgt75' }
        ],
        referenceIntervals: [ // 5 questions, 0-4 scale. Average range 0-4. (Prorated for 7)
            { label: 'None', min: 0, max: 0.9, color: 'bg-green-500' },
            { label: 'Mild', min: 1, max: 1.9, color: 'bg-yellow-500' },
            { label: 'Moderate', min: 2, max: 2.9, color: 'bg-orange-500' },
            { label: 'Severe', min: 3, max: 3.9, color: 'bg-red-500' },
            { label: 'Extreme', min: 4, max: 4, color: 'bg-red-500' }
        ],
        about: 'Measures severity of repetitive thoughts and behaviors based on the Florida Obsessive-Compulsive Inventory (FOCI) Severity Scale.',
        aboutLink: 'https://iocdf.org/about-ocd/',
        individualsExperienced: [
            { name: 'Howie Mandel', link: 'https://en.wikipedia.org/wiki/Here%27s_the_Deal:_Don%27t_Touch_Me' },
        ],
    },
    { 
        name: 'Dissociation',
        scoringMethod: 'MAX_THRESHOLD',
        answerMapping: 'DEFAULT',
        questionIds: [{ id: 'ltemgtinTheltemgtltstronggtltemgt76' }],
        referenceIntervals: [
            { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
            { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
        ],
        about: 'Measures experiences of detachment from reality. A score of "Mild" or greater indicates need for further inquiry.',
        aboutLink: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Dissociative-Disorders',
        individualsExperienced: [
            { name: 'Jim Carrey', link: 'https://psychprofessionals.com.au/jim-carrey-on-overcoming-depression/' },
        ],
    },
    { 
        name: 'Personality Functioning',
        scoringMethod: 'MAX_THRESHOLD',
        answerMapping: 'DEFAULT',
        questionIds: [{ id: 'ltemgtinTheltemgtltstronggtItemgt77' }, { id: 'ltemgtinTheltemgtltstronggtltemgt78' }],
        referenceIntervals: [
            { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
            { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
        ],
        about: 'Examines long-term patterns in self-perception and relationships. A score of "Mild" or greater indicates need for further inquiry.',
        aboutLink: 'https://www.nimh.nih.gov/health/topics/borderline-personality-disorder',
        individualsExperienced: [
            { name: 'Pete Davidson', link: 'https://en.wikipedia.org/wiki/Pete_Davidson#Health' },
        ],
    },
];

const getAnswerValue = (answer: any, mapping: AnswerMapping, isReversed?: boolean): number | null => {
    switch (mapping) {
        case 'PROMIS':
            return answerToPROMISValue(answer, isReversed);
        case 'PHQ15':
            return answerToPHQ15Value(answer);
        case 'DEFAULT':
        default:
            return answerToDefaultValue(answer);
    }
};

function calculateScore(config: DomainConfig, allAnswers: { [questionId: string]: any }): number | null {
    const numericAnswers = config.questionIds
        .map(q => getAnswerValue(allAnswers[q.id], config.answerMapping, q.reverse))
        .filter((val): val is number => val !== null);

    if (numericAnswers.length === 0) return null;

    if (config.scoringMethod === 'MAX_THRESHOLD') {
        return Math.max(...numericAnswers);
    }
    
    const rawSum = numericAnswers.reduce((sum, val) => sum + val, 0);

    if (config.scoringMethod === 'AVERAGE') {
        return parseFloat((rawSum / numericAnswers.length).toFixed(1));
    }
    
    // Default to SUM scoring
    // Use the intended number of questions for proration, falling back to the number of IDs.
    const totalQuestions = config.intendedQuestionCount || config.questionIds.length;
    const answeredQuestions = numericAnswers.length;

    // Do not score if less than 75% of questions are answered (for SUM scores)
    if (answeredQuestions / totalQuestions < 0.75) {
        return null;
    }

    // Prorate the score if some questions were missed
    if (answeredQuestions < totalQuestions) {
        return Math.round((rawSum / answeredQuestions) * totalQuestions);
    }

    return rawSum;
}

function getInterpretation(score: number | null, intervals: ReferenceInterval[]): string {
    if (score === null) {
        return "Incomplete Assessment";
    }
    for (const interval of [...intervals].reverse()) {
        if (score >= interval.min) {
            if (interval.max === null || score <= interval.max) {
                return interval.label;
            }
        }
    }
    const lowestInterval = intervals[0];
    if (lowestInterval && (lowestInterval.max === null || score <= lowestInterval.max)) {
      return lowestInterval.label;
    }
    return "Not Classified";
}

export function generateReportFromJotform(submission: JotformSubmission): IndividualData {
    const calculatedDomains: Domain[] = domainConfigs.map(config => {
        const score = calculateScore(config, submission.answers);
        const interpretation = getInterpretation(score, config.referenceIntervals);

        return {
            name: config.name,
            about: config.about,
            aboutLink: config.aboutLink,
            score: score,
            userInterpretation: interpretation,
            result: interpretation,
            referenceIntervals: config.referenceIntervals,
            individualsExperienced: config.individualsExperienced,
            insightsAndSupport: '', // To be filled by AI
        };
    });

    return {
        individualId: submission.submissionId,
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        assessmentDate: submission.assessmentDate,
        domains: calculatedDomains,
    };
}