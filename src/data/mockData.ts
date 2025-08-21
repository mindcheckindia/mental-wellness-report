

import { IndividualData } from '../types';

export const mockReportData: IndividualData = {
  individualId: 'MOCK_12345',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  assessmentDate: new Date().toISOString(),
  domains: [
    {
      name: 'Depression',
      about: 'Assesses core symptoms of depression. Score is based on the 8-item PROMIS Emotional Distress–Depression–Short Form, expanded with additional questions.',
      aboutLink: 'https://www.who.int/news-room/fact-sheets/detail/depression',
      result: 'Moderate',
      score: 30, // Corresponds to Moderate
      userInterpretation: 'Moderate',
      referenceIntervals: [
        { label: 'None to slight', min: 10, max: 27, color: 'bg-green-500' },
        { label: 'Moderate', min: 28, max: 41, color: 'bg-orange-500' },
        { label: 'Severe', min: 42, max: 50, color: 'bg-red-500' }
      ],
      insightsAndSupport: "John, it appears you're dealing with a noticeable level of depressive symptoms. This can sometimes make it challenging to find motivation or enjoy things as you used to. It may be beneficial to explore these feelings with a professional; a therapist can provide tools and strategies tailored specifically to you.",
      individualsExperienced: [
        { name: 'Deepika Padukone', link: 'https://www.onlymyhealth.com/deepika-padukone-on-depression-and-tips-to-overcome-suicidal-thoughts-12977825587' },
        { name: 'Abraham Lincoln', link: 'https://en.wikipedia.org/wiki/Health_of_Abraham_Lincoln#Depression' },
      ],
    },
    { 
      name: 'Anger', 
      about: 'Measures feelings of anger and irritability. Score is based on the 5-item PROMIS Emotional Distress–Anger–Short Form, expanded with an additional question.', 
      aboutLink: 'https://www.apa.org/topics/anger/control', 
      result: 'Mild',
      score: 17, // Corresponds to Mild
      userInterpretation: 'Mild',
      referenceIntervals: [
          { label: 'None to slight', min: 6, max: 15, color: 'bg-green-500' },
          { label: 'Mild', min: 16, max: 18, color: 'bg-yellow-500' },
          { label: 'Moderate', min: 19, max: 24, color: 'bg-orange-500' },
          { label: 'Severe', min: 25, max: 30, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, your results suggest you're navigating some mild feelings of irritability. This might show up as finding yourself more easily frustrated than usual. Exploring practices like taking a brief walk to cool down or noting your triggers can be a helpful next step.",
      individualsExperienced: [
          { name: 'Russell Brand', link: 'https://www.healthline.com/health/celebrities-with-bipolar-disorder' },
          { name: 'Kanye West', link: 'https://www.biography.com/musicians/kanye-west-mental-health' }
      ],
    },
    { 
      name: 'Mania', 
      about: 'Assesses symptoms of mania or hypomania using the Altman Self-Rating Mania Scale. A score of 6 or higher suggests a high probability of a manic or hypomanic condition.', 
      aboutLink: 'https://www.nimh.nih.gov/health/topics/bipolar-disorder', 
      result: 'Low Probability',
      score: 5, // Corresponds to Low Probability
      userInterpretation: 'Low Probability',
      referenceIntervals: [
          { label: 'Low Probability', min: 0, max: 8, color: 'bg-green-500' },
          { label: 'High Probability', min: 9, max: 28, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, it's great that your mood and energy levels seem to be steady. Maintaining a stable routine, especially around sleep, is an excellent way to continue supporting this balance.",
      individualsExperienced: [
          { name: 'Mariah Carey', link: 'https://www.webmd.com/bipolar-disorder/ss/slideshow-celebrities-bipolar-disorder' },
          { name: 'Demi Lovato', link: 'https://people.com/health/demi-lovato-relieved-to-be-diagnosed-bipolar/' }
      ], 
    },
    {
      name: 'Anxiety',
      about: 'Evaluates common symptoms of anxiety. Score is based on the 7-item PROMIS Emotional Distress–Anxiety–Short Form, expanded with additional questions.',
      aboutLink: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
      result: 'Moderate',
      score: 30, // Corresponds to Moderate
      userInterpretation: 'Moderate',
      referenceIntervals: [
        { label: 'None to slight', min: 10, max: 21, color: 'bg-green-500' },
        { label: 'Mild', min: 22, max: 27, color: 'bg-yellow-500' },
        { label: 'Moderate', min: 28, max: 38, color: 'bg-orange-500' },
        { label: 'Severe', min: 39, max: 50, color: 'bg-red-500' }
      ],
      insightsAndSupport: "John, it appears you're managing a moderate degree of anxiety. This can manifest as persistent worry that's hard to control. A therapist can help you understand these patterns and develop effective coping strategies.",
      individualsExperienced: [
        { name: 'Adele', link: 'https://www.gmanetwork.com/news/lifestyle/healthandwellness/806235/adele-says-working-out-helped-with-her-anxiety-it-was-never-about-losing-weight/story/' },
        { name: 'Karan Johar', link: 'https://yourdost.com/blog/2016/09/celebrity-depression-karan-johar.html' },
      ],
    },
    { 
      name: 'Somatic Symptoms', 
      about: 'Focuses on physical symptoms that may be related to psychological distress, based on the Patient Health Questionnaire 15 (PHQ-15).', 
      aboutLink: 'https://www.psychiatry.org/patients-families/somatic-symptom-disorder/what-is-somatic-symptom-disorder', 
      result: 'High',
      score: 18, // Corresponds to High
      userInterpretation: 'High',
      referenceIntervals: [
          { label: 'Minimal', min: 0, max: 5, color: 'bg-green-500' },
          { label: 'Low', min: 6, max: 11, color: 'bg-yellow-500' },
          { label: 'Medium', min: 12, max: 16, color: 'bg-orange-500' },
          { label: 'High', min: 17, max: 34, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, the high level of physical symptoms you're reporting can be very challenging. Since these feelings can be tough to manage alone, we encourage you to connect with a doctor to discuss these results and rule out any other causes.",
      individualsExperienced: [
          { name: 'Lady Gaga', link: 'https://ukfibromyalgia.com/blog/celebrities-with-fibromyalgia-lady-gaga' },
          { name: 'Oprah Winfrey', link: 'https://www.cbsnews.com/news/oprah-reports-on-childhood-traumas-long-term-effects/' }
      ], 
    },
    { 
      name: 'Suicidal Ideation', 
      about: 'Screens for thoughts of self-harm. A score of "Slight" or greater indicates need for further inquiry.', 
      aboutLink: 'https://988lifeline.org/', 
      result: 'Within normal limits',
      score: 0,
      userInterpretation: 'Within normal limits',
      referenceIntervals: [
          { label: 'Within normal limits', min: 0, max: 0, color: 'bg-green-500' },
          { label: 'Further inquiry indicated', min: 1, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, we're glad to see your responses indicate a low risk in this area. Remember, if you ever need support, help is always available through crisis hotlines and mental health professionals.",
      individualsExperienced: [
          { name: 'J.K. Rowling', link: 'https://www.cbsnews.com/news/potter-creator-once-contemplated-suicide/' },
          { name: 'Jon Hamm', link: 'https://sunlightrecovery.com/jon-hamm-chronic-depression/' }
      ],
    },
    { 
      name: 'Psychosis', 
      about: 'Identifies unusual thoughts or perceptions. A score of "Slight" or greater indicates need for further inquiry.', 
      aboutLink: 'https://www.nimh.nih.gov/health/topics/schizophrenia/raise/what-is-psychosis', 
      result: 'Within normal limits',
      score: 0,
      userInterpretation: 'Within normal limits',
      referenceIntervals: [
          { label: 'Within normal limits', min: 0, max: 0, color: 'bg-green-500' },
          { label: 'Further inquiry indicated', min: 1, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, your results suggest that unusual thoughts or perceptions are not a current concern. Staying grounded and connected to your support system is always a good practice for overall well-being.",
      individualsExperienced: [
          { name: 'John Nash', link: 'https://livingwithschizophreniauk.org/john-nash/' },
          { name: 'Brian Wilson', link: 'https://www.biography.com/musicians/brian-wilson-mental-health-illness' }
      ], 
    },
    { 
      name: 'Sleep Problems', 
      about: 'Evaluates sleep quality based on the 8-item PROMIS Sleep Disturbance scale. Some questions are reverse-scored.', 
      aboutLink: 'https://www.sleepfoundation.org/insomnia', 
      result: 'Severe',
      score: 38, // Corresponds to Severe
      userInterpretation: 'Severe',
      referenceIntervals: [
          { label: 'None to slight', min: 8, max: 25, color: 'bg-green-500' }, // T < 55
          { label: 'Mild', min: 26, max: 28, color: 'bg-yellow-500' }, // T 55-59.9
          { label: 'Moderate', min: 29, max: 36, color: 'bg-orange-500' }, // T 60-69.9
          { label: 'Severe', min: 37, max: 40, color: 'bg-red-500' } // T >= 70
      ], 
      insightsAndSupport: "John, it seems you are facing severe challenges with your sleep, which can impact all areas of life. We strongly encourage you to discuss this with a doctor; they can help find the best path forward to achieve restful sleep.",
      individualsExperienced: [
          { name: 'Jimmy Kimmel', link: 'https://www.rxwiki.com/slideshow/celebrities-who-have-trouble-sleeping/jimmy-kimmel' },
      ],
    },
    { 
      name: 'Memory', 
      about: 'Assesses memory problems. A score of "Mild" or greater indicates need for further inquiry.', 
      aboutLink: 'https://www.nia.nih.gov/health/memory-forgetfulness-and-aging-whats-normal-and-whats-not', 
      result: 'Within normal limits',
      score: 1, // Corresponds to mild concern
      userInterpretation: 'Within normal limits',
      referenceIntervals: [
          { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
          { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, you've noted that memory is not a significant concern. Stress and poor sleep can sometimes impact cognition, so continuing to manage those areas will help maintain your focus.",
      individualsExperienced: [
          { name: 'Ronald Reagan', link: 'https://optoceutics.com/famous-people-celebrities-singers-with-alzheimers/' },
      ], 
    },
    { 
      name: 'Repetitive Thoughts and Behaviours', 
      about: 'Measures severity of repetitive thoughts and behaviors based on the Florida Obsessive-Compulsive Inventory (FOCI) Severity Scale.', 
      aboutLink: 'https://iocdf.org/about-ocd/', 
      result: 'Moderate',
      score: 2.5, // Corresponds to Moderate
      userInterpretation: 'Moderate',
      referenceIntervals: [
          { label: 'None', min: 0, max: 0.9, color: 'bg-green-500' },
          { label: 'Mild', min: 1, max: 1.9, color: 'bg-yellow-500' },
          { label: 'Moderate', min: 2, max: 2.9, color: 'bg-orange-500' },
          { label: 'Severe', min: 3, max: 3.9, color: 'bg-red-500' },
          { label: 'Extreme', min: 4, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, your results suggest a moderate level of repetitive thoughts or behaviors. These patterns can be disruptive, and it may be beneficial to explore this with a therapist who can introduce effective strategies like CBT.",
      individualsExperienced: [
          { name: 'Howie Mandel', link: 'https://en.wikipedia.org/wiki/Here%27s_the_Deal:_Don%27t_Touch_Me' },
      ],
    },
    { 
      name: 'Dissociation', 
      about: 'Measures experiences of detachment from reality. A score of "Mild" or greater indicates need for further inquiry.', 
      aboutLink: 'https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Dissociative-Disorders', 
      result: 'Further inquiry indicated',
      score: 3, // Corresponds to high concern
      userInterpretation: 'Further inquiry indicated',
      referenceIntervals: [
          { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
          { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, experiencing feelings of detachment can be unsettling and are challenging to manage alone. We strongly encourage you to connect with a mental health professional to discuss these results and find the best support for you.",
      individualsExperienced: [
          { name: 'Jim Carrey', link: 'https://psychprofessionals.com.au/jim-carrey-on-overcoming-depression/' },
      ], 
    },
    { 
      name: 'Personality Functioning', 
      about: 'Examines long-term patterns in self-perception and relationships. A score of "Mild" or greater indicates need for further inquiry.', 
      aboutLink: 'https://www.nimh.nih.gov/health/topics/borderline-personality-disorder', 
      result: 'Further inquiry indicated',
      score: 2, // Corresponds to high concern
      userInterpretation: 'Further inquiry indicated',
      referenceIntervals: [
          { label: 'Within normal limits', min: 0, max: 1, color: 'bg-green-500' },
          { label: 'Further inquiry indicated', min: 2, max: 4, color: 'bg-red-500' }
      ], 
      insightsAndSupport: "John, it seems there are some significant challenges in how you see yourself or relate to others, which can be difficult. We recommend talking to a therapist, as they can help you explore these patterns and build healthier relationships and self-esteem.",
      individualsExperienced: [
          { name: 'Pete Davidson', link: 'https://en.wikipedia.org/wiki/Pete_Davidson#Health' },
      ], 
    }
  ]
};