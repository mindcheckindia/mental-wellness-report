export interface ReferenceInterval {
  label: string;
  min: number;
  max: number | null;
  color: string;
}

export interface IndividualExperienced {
  name: string;
  link: string;
}

export interface Domain {
  name: string;
  about: string;
  aboutLink: string;
  result: string;
  score: number | null;
  userInterpretation: string;
  referenceIntervals: ReferenceInterval[];
  insightsAndSupport: string;
  individualsExperienced: IndividualExperienced[];
}

export interface IndividualData {
  individualId: string;
  firstName: string;
  lastName: string;
  email: string;
  assessmentDate: string;
  domains: Domain[];
}

export interface GlobalResource {
    text: string;
    link: string;
}