export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  altText: string;
  liveUrl: string;
  fallbackUrl?: string;
  tags: string[];
  gridSpan: string;
  highlights?: string[];
  deliverables?: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  subtags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
  tag?: string;
}
