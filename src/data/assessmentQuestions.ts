
interface Question {
    id: string;
    text: string;
    mandatory: boolean;
    condition?: {
        triggerIds: string[];
        requiredValues: string[];
    };
}

interface AssessmentSection {
    title: string;
    description: string;
    questions: Question[];
}

const positiveAnswers = ['Several days', 'More than half the days', 'Nearly every day'];

export const assessmentSections: AssessmentSection[] = [
    {
        title: 'Depression',
        description: 'These questions ask about feelings related to mood and interest in activities.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt', text: 'In the LAST TWO WEEKS, have you experienced little interest or pleasure in doing things?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt5', text: 'In the LAST TWO WEEKS, have you felt down, depressed or hopeless?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt6', text: 'In the LAST 7 DAYS, did you feel, "I am worthless"?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt7', text: 'In the LAST 7 DAYS, did you feel that you had nothing to look forward to?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt8', text: 'In the LAST 7 DAYS, did you feel helpless?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt9', text: 'In the LAST 7 DAYS, did you feel sad?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt10', text: 'In the LAST 7 DAYS, did you feel like a failure?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt11', text: 'In the LAST 7 DAYS, did you feel like depressed?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt13', text: 'In the LAST 7 DAYS, did you feel unhappy?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt14', text: 'In the LAST 7 DAYS, did you feel hopeless?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt', 'ltemgtinTheltemgtltstronggtItemgt5'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Anger',
        description: 'These questions relate to feelings of irritability and anger.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt15', text: 'In the LAST TWO WEEKS, did you feel more irritated, grouchy or angry than usual?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt16', text: 'In the LAST 7 DAYS, "I was irritated more than people knew"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt15'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt17', text: 'In the LAST 7 DAYS, "I felt angry"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt15'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt18', text: 'In the LAST 7 DAYS, "I felt like I was ready to explode"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt15'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt19', text: 'In the LAST 7 DAYS, "I was grouchy"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt15'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt20', text: 'In the LAST 7 DAYS, "I felt annoyed"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt15'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Mania',
        description: 'These questions ask about periods of high energy, elevated mood, and increased activity.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt21', text: 'In the LAST TWO WEEKS, have you been sleeping less than usual, but still had a lot of energy?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt27', text: 'In the LAST TWO WEEKS, did you start more projects or did more risky things than usual?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt22', text: 'In the LAST 7 DAYS, did you feel happier or more cheerful than usual?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt21', 'ltemgtinTheltemgtltstronggtltemgt27'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt23', text: 'In the LAST 7 DAYS, did you feel more self-confident than usual?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt21', 'ltemgtinTheltemgtltstronggtltemgt27'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt24', text: 'In the LAST 7 DAYS, did you need less sleep than usual?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt21', 'ltemgtinTheltemgtltstronggtltemgt27'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt25', text: 'In the LAST 7 DAYS, did you talk more than usual?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt21', 'ltemgtinTheltemgtltstronggtltemgt27'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt26', text: 'In the LAST 7 DAYS, have you been more active (either socially, sexually, at work, home, or school) than usual ?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt21', 'ltemgtinTheltemgtltstronggtltemgt27'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Anxiety',
        description: 'These questions ask about feelings of nervousness, worry, and fear.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt28', text: 'In the LAST TWO WEEKS, did you feel nervous, anxious, frightened, worried, or on edge ?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt29', text: 'In the LAST TWO WEEKS, did you get a feeling of panic or being frightened?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt30', text: 'In the LAST TWO WEEKS, did you consciously avoid situations that make you anxious?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtitemgt31', text: 'In the LAST 7 DAYS, "I felt fearful"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt32', text: 'In the LAST 7 DAYS, "I felt anxious"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt33', text: 'In the LAST 7 DAYS, "I felt worried"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt34', text: 'In the LAST 7 DAYS, "I found it hard to focus on anything other than my anxiety"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt35', text: 'In the LAST 7 DAYS, "I felt nervous"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt36', text: 'In the LAST 7 DAYS, "I felt uneasy"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt37', text: 'In the LAST 7 DAYS, "I felt tense"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt28', 'ltemgtinTheltemgtltstronggtltemgt29', 'ltemgtinTheltemgtltstronggtItemgt30'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Somatic Symptoms',
        description: 'These questions are about physical feelings and symptoms.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtitemgt38', text: 'In the LAST TWO WEEKS, did you get unexplained aches and pains (e.g. head, back, joints, abdomen, legs)?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt39', text: 'In the LAST TWO WEEKS, did you feel that your illness was not being taken seriously enough?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt40', text: 'In the LAST 7 DAYS, were you bothered by \'stomach pain\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt41', text: 'In the LAST 7 DAYS, were you bothered by \'back pain\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt42', text: 'In the LAST 7 DAYS, were you bothered by \'pain in your arms, legs, or joints (knees, hips, etc.)\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt43', text: 'In the LAST 7 DAYS, were you bothered by \'menstrual cramps or problems with your periods\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt44', text: 'In the LAST 7 DAYS, were you bothered by \'headaches\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt45', text: 'In the LAST 7 DAYS, were you bothered by \'chest pain\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt46', text: 'In the LAST 7 DAYS, were you bothered by \'dizziness\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt47', text: 'In the LAST 7 DAYS, were you bothered by \'fainting spells\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt48', text: 'In the LAST 7 DAYS, were you bothered by \'feeling that your heart was pounding or racing\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt49', text: 'In the LAST 7 DAYS, were you bothered by \'shortness of breath\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt50', text: 'In the LAST 7 DAYS, were you bothered by \'pain or problems during sexual intercourse\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt51', text: 'In the LAST 7 DAYS, were you bothered by \'constipation, loose bowels, or diarrhea\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt52', text: 'In the LAST 7 DAYS, were you bothered by \'nausea, gas, or indigestion\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt53', text: 'In the LAST 7 DAYS, were you bothered by \'feeling tired or having low energy\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt54', text: 'In the LAST 7 DAYS, were you bothered by \'trouble in sleeping\'?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtitemgt38', 'ltemgtinTheltemgtltstronggtItemgt39'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Suicidal Intention',
        description: 'This section asks about thoughts of self-harm.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt55', text: 'In the LAST TWO WEEKS, did you get thoughts of actually hurting yourself?', mandatory: true },
        ]
    },
    {
        title: 'Psychosis',
        description: 'This section asks about unusual experiences or thoughts.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt56', text: 'In the LAST TWO WEEKS, did you experience hearing things other people couldn\'t hear, such as voices even when no one was around?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt57', text: 'In the LAST TWO WEEKS, did you experience feelings that someone could hear your thoughts, or that you could hear what they were thinking?', mandatory: true },
        ]
    },
    {
        title: 'Sleep Problems',
        description: 'These questions are about your sleep quality.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt58', text: 'In the LAST TWO WEEKS, did you have problems with sleep that affected your sleep quality over all?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtItemgt60', text: 'In the LAST 7 DAYS, "my sleep was restless"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt61', text: 'In the LAST 7 DAYS, "I was satisfied with my sleep"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt62', text: 'In the LAST 7 DAYS, "my sleep was refreshing"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt63', text: 'In the LAST 7 DAYS, "I had difficulty falling asleep"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt64', text: 'In the LAST 7 DAYS, "I had trouble staying asleep"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtitemgt65', text: 'In the LAST 7 DAYS, "I had trouble falling asleep"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt66', text: 'In the LAST 7 DAYS, "I got enough sleep"', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt67', text: 'In the LAST 7 DAYS, how was your sleep quality?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtltemgt58'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Memory',
        description: 'This question asks about problems with memory.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt68', text: 'In the LAST TWO WEEKS, did you have problems with memory (e.g., learning new information) or with location (e.g., finding your way home)?', mandatory: true },
        ]
    },
    {
        title: 'Repetitive Thoughts & Behaviors',
        description: 'This section asks about repetitive thoughts or actions.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt69', text: 'In the LAST TWO WEEKS, did you get unpleasant thoughts, urges, or images that repeatedly enter your mind?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt70', text: 'In the LAST TWO WEEKS, did you feel driven to perform certain behaviors or mental acts over and over again?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt71', text: 'In the LAST 7 DAYS, to what extent did unwanted, repetitive thoughts, images, or urges take up your time?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt69', 'ltemgtinTheltemgtltstronggtltemgt70'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt72', text: 'In the LAST 7 DAYS, how much distress did you experience from unwanted, repetitive thoughts, images, urges ?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt69', 'ltemgtinTheltemgtltstronggtltemgt70'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtItemgt73', text: 'In the LAST 7 DAYS, to what extent did you experience difficulty controlling these unwanted, repetitive thoughts?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt69', 'ltemgtinTheltemgtltstronggtltemgt70'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt74', text: 'In the LAST 7 DAYS, how much did these unwanted, repetitive thoughts or behaviors cause you to avoid doing anything, going anywhere, or being with anyone?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt69', 'ltemgtinTheltemgtltstronggtltemgt70'], requiredValues: positiveAnswers }},
            { id: 'ltemgtinTheltemgtltstronggtltemgt75', text: 'In the LAST 7 DAYS, how much did these repetitive and unwanted thoughts or behaviors interfere with school, work, or your social or family life?', mandatory: false, condition: { triggerIds: ['ltemgtinTheltemgtltstronggtItemgt69', 'ltemgtinTheltemgtltstronggtltemgt70'], requiredValues: positiveAnswers }},
        ]
    },
    {
        title: 'Dissociation',
        description: 'This question asks about feelings of detachment.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtltemgt76', text: 'In the LAST TWO WEEKS, did you feel detached or distant from yourself, your body, your physical surroundings, or your memories?', mandatory: true },
        ]
    },
    {
        title: 'Personality Functioning',
        description: 'This section asks about your sense of self and relationships.',
        questions: [
            { id: 'ltemgtinTheltemgtltstronggtItemgt77', text: 'In the LAST TWO WEEKS, did you get a feeling of not knowing who you really are or what you want out of life ?', mandatory: true },
            { id: 'ltemgtinTheltemgtltstronggtltemgt78', text: 'In the LAST TWO WEEKS, did you get a sense of not feeling close to other people or enjoying your relationships with them?', mandatory: true },
        ]
    }
];
