export interface University {
  _id: string;
  universityName: string;
  universityImage?: string;
  description?: string;
  enabled?: boolean;
  slug?: string;
}

export interface Course {
  _id: string;
  programName: string;
  universityName: string;
  universityId?: string;
  slug?: string;
  degreeAwarded?: string;
  levelOfStudy?: string;
  fieldOfStudy?: string;
  duration?: string;
  studyMode?: string;
  location?: string;
  campuses?: string[];
  currency?: string;
  language?: string;
  industryFocus?: string;
  targetAudience?: string;
  about?: string;
  intakes?: string[];
  deadlines?: string | string[];
  applicationDeadline?: string;
  specialisations?: string[];
  highlights?: string[];
  careers?: { roles?: string[]; employers?: string[] };
  learningOutcomes?: string[];
  admissionRequirements?: {
    academic?: string[];
    english?: Record<string, string | number>;
    documents?: string[];
  };
  tuition?: { amount?: number | null; currency?: string; period?: string; onRequest?: boolean; note?: string };
  tuitionFeePerSemester?: number | string;
  credits?: number;
  ects?: number;
  scholarshipsAvailable?: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  createdAt?: string;
}

export interface CourseFilters {
  categories?: { label: string; count: number }[];
  priceBuckets?: { id: string; label: string; count: number }[];
  tags?: string[];
}
