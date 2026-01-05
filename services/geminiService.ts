
import { GoogleGenAI } from "@google/genai";
import { GeneratorInputs, DocumentType } from "../types";

export const generateLegalDocument = async (
  type: DocumentType,
  inputs: GeneratorInputs,
  additionalNotes?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const platformContext = inputs.platform === 'Both' 
    ? 'both a website and a mobile application' 
    : inputs.platform === 'App' 
      ? `a mobile application${inputs.appPlatform ? ` (${inputs.appPlatform})` : ''}` 
      : 'a website';

  // Customize sections based on document type
  let specificInstructions = '';
  if (type === DocumentType.PRIVACY_POLICY) {
    specificInstructions = 'Include sections like Introduction, Information Collection, Use of Information, Tracking Technologies (Cookies), Third-Party Disclosure, User Rights (GDPR/CCPA), and Contact Information.';
  } else if (type === DocumentType.TERMS_AND_CONDITIONS) {
    specificInstructions = 'Include sections like Acceptance of Terms, User Conduct, Intellectual Property Rights, Limitation of Liability, Termination of Use, Governing Law, and Changes to Terms.';
  } else if (type === DocumentType.COOKIE_POLICY) {
    specificInstructions = 'Include sections like What are Cookies, Why we use Cookies, Types of Cookies used (Essential, Analytics, Marketing), How to control Cookies, and Updates to this policy.';
  }

  const prompt = `
    Generate a professional and legally sound ${type} for ${platformContext} with the following details:
    - Company/Entity Name: ${inputs.companyName}
    - URL/App Link: ${inputs.websiteUrl}
    - Contact Email: ${inputs.email}
    - Location: ${inputs.state}, ${inputs.country}
    - Data Practices: ${inputs.collectsPersonalData ? 'Collects personal data (name, email, device ID, etc.)' : 'Does not collect personal data'}
    - Cookies/Tracking: ${inputs.usesCookies ? 'Uses cookies or mobile identifiers for tracking' : 'Does not use tracking technology'}
    - Advertising: ${inputs.usesAds ? 'Uses third-party advertising (like Google AdSense or AdMob)' : 'No advertising'}
    - Third-party tools: ${inputs.thirdPartyTools}
    
    ${additionalNotes ? `Additional specific requirements: ${additionalNotes}` : ''}

    Structure the response as a formal legal document using Markdown. 
    ${specificInstructions}
    
    If it's for an App, include standard clauses about App Store/Play Store requirements and device permissions.
    Ensure it complies with general principles of GDPR and CCPA where applicable.
  `;

  const disclaimerText = `

---

**DISCLAIMER:** *This document is an AI-generated draft provided for informational purposes only. It does not constitute legal advice and may not comply with all applicable laws in your jurisdiction. We strongly recommend having this document reviewed by a qualified legal professional before use.*`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    const baseText = response.text || "Failed to generate document text.";
    return baseText + disclaimerText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with AI service.");
  }
};
