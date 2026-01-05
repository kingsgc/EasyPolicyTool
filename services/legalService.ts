
import { GeneratorInputs, DocumentType } from "../types";

/**
 * DETERMINISTIC LEGAL GENERATION ENGINE
 * This service generates legally structured documents locally using 
 * pre-validated templates and logic blocks based on user inputs.
 */

export const generateLocalDocument = (
  type: DocumentType,
  inputs: GeneratorInputs
): string => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const { 
    companyName, websiteUrl, email, country, state, platform, 
    collectsPersonalData, usesCookies, usesAds, thirdPartyTools,
    marketingEmails, sellData, socialLogins, paymentProcessing, minorUsers
  } = inputs;

  const intro = `# ${type} for ${companyName}\n\n**Last Updated: ${date}**\n\nWelcome to ${companyName}. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this ${type.toLowerCase()}, please contact us at ${email}.\n\n`;

  let content = intro;

  if (type === DocumentType.PRIVACY_POLICY) {
    content += `## 1. WHAT INFORMATION DO WE COLLECT?\n\n`;
    if (collectsPersonalData) {
      content += `We collect personal information that you voluntarily provide to us when you register on the ${platform.toLowerCase()}, express an interest in obtaining information about us or our products and services, when you participate in activities on the ${platform.toLowerCase()} or otherwise when you contact us.\n\n`;
      if (socialLogins) {
        content += `We provide you with the option to register with us using your existing social media account details (like your Facebook, Twitter, or other social media login).\n\n`;
      }
    } else {
      content += `We do not knowingly collect personal information from our users.\n\n`;
    }

    content += `## 2. HOW DO WE USE YOUR INFORMATION?\n\n`;
    content += `We use personal information collected via our ${platform.toLowerCase()} for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.\n\n`;

    if (marketingEmails) {
      content += `We may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt-out of our marketing emails at any time.\n\n`;
    }

    if (paymentProcessing) {
      content += `We may provide paid products and/or services within the ${platform.toLowerCase()}. In that case, we use third-party services for payment processing (e.g., payment processors). We will not store or collect your payment card details.\n\n`;
    }

    content += `## 3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?\n\n`;
    if (sellData) {
      content += `We may share or sell data with third parties for marketing purposes. You have the right to opt-out of such sharing under certain jurisdictions (e.g., CCPA).\n\n`;
    } else {
      content += `We do not share, sell, rent, or trade any of your information with third parties for their promotional purposes.\n\n`;
    }

    if (usesCookies) {
      content += `## 4. COOKIES AND OTHER TRACKING TECHNOLOGIES\n\nWe may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information.\n\n`;
    }

    if (thirdPartyTools) {
      content += `## 5. THIRD-PARTY TOOLS\n\nWe utilize the following third-party services which may process your data: ${thirdPartyTools}.\n\n`;
    }

    if (minorUsers) {
      content += `## 6. PRIVACY OF MINORS\n\nWe knowingly collect data from or market to children under 13 years of age. We take extra precautions to protect the privacy and safety of children using our services.\n\n`;
    } else {
      content += `## 6. PRIVACY OF MINORS\n\nWe do not knowingly solicit data from or market to children under 18 years of age. By using the ${platform.toLowerCase()}, you represent that you are at least 18.\n\n`;
    }

    content += `## 7. YOUR PRIVACY RIGHTS\n\nDepending on your location (${state}, ${country}), you may have certain rights under applicable data protection laws (e.g., GDPR, CCPA). These may include the right to request access and obtain a copy of your personal information, to request rectification or erasure; to restrict the processing of your personal information; and, if applicable, to data portability.\n\n`;
  } 
  
  else if (type === DocumentType.TERMS_AND_CONDITIONS) {
    content += `## 1. AGREEMENT TO TERMS\n\nThese Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ${companyName} ("Company", "we", "us", or "our"), concerning your access to and use of the ${websiteUrl} website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.\n\n`;
    if (socialLogins) {
      content += `## 2. USER REGISTRATION\n\nYou may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.\n\n`;
    }
    content += `## 3. INTELLECTUAL PROPERTY RIGHTS\n\nUnless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us.\n\n`;
    content += `## 4. USER REPRESENTATIONS\n\nBy using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside${minorUsers ? ' (unless parental consent is provided)' : ''}; (3) you will not access the Site through automated or non-human means; (4) you will not use the Site for any illegal or unauthorized purpose.\n\n`;
    content += `## 5. LIMITATION OF LIABILITY\n\nIN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE.\n\n`;
  }

  else if (type === DocumentType.COOKIE_POLICY) {
    content += `## 1. WHAT ARE COOKIES?\n\nCookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.\n\n`;
    content += `## 2. WHY DO WE USE COOKIES?\n\nWe use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our ${platform.toLowerCase()} to operate, and we refer to these as "essential" or "strictly necessary" cookies.\n\n`;
    
    if (usesAds) {
      content += `## 3. ADVERTISING AND TRACKING\n\nWe use advertising cookies to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.\n\n`;
    }

    content += `## 4. HOW CAN I CONTROL COOKIES?\n\nYou have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.\n\n`;
  }

  content += `\n---\n\n**DISCLAIMER:** This document is an AI-generated draft provided for informational purposes only. It does not constitute legal advice and may not comply with all applicable laws in your jurisdiction. We strongly recommend having this document reviewed by a qualified legal professional before use.\n\n**LEGAL NOTICE:** This document was generated using EasyPolicyTool's automated legal framework in ${country}.`;

  return content;
};
