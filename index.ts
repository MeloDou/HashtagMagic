export type PersonaType = 'luxury' | 'business' | 'creator';

export interface Persona {
  id: PersonaType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export interface HashtagGeneration {
  id: string;
  userId: string;
  contentDescription: string;
  generatedHashtags: string[];
  personaType: PersonaType;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  personaType: PersonaType;
  paymentStatus: 'free' | 'paid';
  usageCount: number;
  createdAt: Date;
}

export interface TrendingHashtag {
  id: string;
  hashtag: string;
  category: string;
  personaType: PersonaType;
  trendScore: number;
  lastUpdated: Date;
}
