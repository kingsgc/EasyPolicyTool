
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  author: string;
}

export type PlatformType = 'Website' | 'App' | 'Both';

export interface GeneratorInputs {
  companyName: string;
  websiteUrl: string;
  appPlatform?: string;
  platform: PlatformType;
  email: string;
  country: string;
  state: string;
  collectsPersonalData: boolean;
  usesCookies: boolean;
  usesAds: boolean;
  thirdPartyTools: string;
  lastUpdated?: string;
  // New compliance fields
  marketingEmails: boolean;
  sellData: boolean;
  socialLogins: boolean;
  paymentProcessing: boolean;
  minorUsers: boolean;
}

export enum DocumentType {
  PRIVACY_POLICY = 'Privacy Policy',
  TERMS_AND_CONDITIONS = 'Terms & Conditions',
  COOKIE_POLICY = 'Cookie Policy'
}

export interface SavedDocument {
  id: string;
  type: DocumentType;
  platform: PlatformType;
  companyName: string;
  content: string;
  date: string;
  inputs: GeneratorInputs;
}
