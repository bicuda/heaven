export type LegalModalType = 'terms' | 'privacy' | 'fairplay' | null;

export interface LegalDocument {
  id: 'terms' | 'privacy' | 'fairplay';
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}
