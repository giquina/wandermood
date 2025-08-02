/**
 * UK VAT and Tax Compliance Utilities
 * Handles UK-specific tax calculations and compliance requirements
 */

// UK VAT rates (as of 2024)
export const UK_VAT_RATES = {
  STANDARD: 0.20, // 20% - Standard rate for digital services
  REDUCED: 0.05,  // 5% - Reduced rate (not applicable to our services)
  ZERO: 0.00,     // 0% - Zero rate (not applicable to our services)
} as const;

// UK company information for invoicing
export const UK_COMPANY_INFO = {
  name: 'WanderMood Ltd',
  registrationNumber: 'GB123456789', // Replace with actual company number
  vatNumber: 'GB123456789',           // Replace with actual VAT number
  address: {
    line1: '123 Travel Street',
    line2: 'Suite 100',
    city: 'London',
    county: 'Greater London',
    postcode: 'SW1A 1AA',
    country: 'United Kingdom',
  },
  phone: '+44 20 1234 5678',
  email: 'hello@wandermood.com',
  website: 'https://wandermood.com',
} as const;

export interface VATCalculation {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  vatRate: number;
  currency: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  customer: {
    name: string;
    email: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      postcode: string;
      country: string;
    };
    vatNumber?: string;
  };
  items: InvoiceItem[];
  vatCalculation: VATCalculation;
  paymentMethod: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vatRate: number;
}

/**
 * Calculate VAT for a given net amount
 */
export function calculateVAT(
  netAmount: number, 
  vatRate: number = UK_VAT_RATES.STANDARD,
  currency: string = 'GBP'
): VATCalculation {
  const vatAmount = Math.round(netAmount * vatRate * 100) / 100;
  const grossAmount = Math.round((netAmount + vatAmount) * 100) / 100;

  return {
    netAmount,
    vatAmount,
    grossAmount,
    vatRate,
    currency,
  };
}

/**
 * Calculate net amount from gross amount including VAT
 */
export function calculateNetFromGross(
  grossAmount: number,
  vatRate: number = UK_VAT_RATES.STANDARD,
  currency: string = 'GBP'
): VATCalculation {
  const netAmount = Math.round((grossAmount / (1 + vatRate)) * 100) / 100;
  const vatAmount = Math.round((grossAmount - netAmount) * 100) / 100;

  return {
    netAmount,
    vatAmount,
    grossAmount,
    vatRate,
    currency,
  };
}

/**
 * Determine if customer is in UK for VAT purposes
 */
export function isUKCustomer(country: string, postcode?: string): boolean {
  const ukCountries = ['GB', 'UK', 'United Kingdom', 'England', 'Scotland', 'Wales', 'Northern Ireland'];
  return ukCountries.some(ukCountry => 
    country.toLowerCase().includes(ukCountry.toLowerCase())
  );
}

/**
 * Determine VAT treatment based on customer location and type
 */
export function determineVATTreatment(
  customerCountry: string,
  customerVATNumber?: string,
  isBusinessCustomer: boolean = false
): {
  vatRate: number;
  vatReason: string;
  reverseCharge: boolean;
} {
  const isUK = isUKCustomer(customerCountry);
  
  if (isUK) {
    return {
      vatRate: UK_VAT_RATES.STANDARD,
      vatReason: 'UK customer - standard VAT rate applies',
      reverseCharge: false,
    };
  }

  // EU customer with valid VAT number (B2B)
  if (isBusinessCustomer && customerVATNumber && isValidEUVATNumber(customerVATNumber)) {
    return {
      vatRate: 0,
      vatReason: 'EU B2B customer with valid VAT number - reverse charge applies',
      reverseCharge: true,
    };
  }

  // EU customer without VAT number (B2C) or invalid VAT number
  if (isEUCountry(customerCountry)) {
    return {
      vatRate: UK_VAT_RATES.STANDARD,
      vatReason: 'EU B2C customer - UK VAT rate applies (place of supply rules)',
      reverseCharge: false,
    };
  }

  // Non-EU customer
  return {
    vatRate: 0,
    vatReason: 'Non-EU customer - no VAT charged',
    reverseCharge: false,
  };
}

/**
 * Basic EU VAT number validation
 */
export function isValidEUVATNumber(vatNumber: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanVAT = vatNumber.replace(/\s/g, '').toUpperCase();
  
  // Basic format check for EU VAT numbers
  const euVATPatterns = [
    /^AT[UU][0-9]{8}$/,         // Austria
    /^BE[01][0-9]{9}$/,         // Belgium
    /^BG[0-9]{9,10}$/,          // Bulgaria
    /^HR[0-9]{11}$/,            // Croatia
    /^CY[0-9]{8}[A-Z]$/,        // Cyprus
    /^CZ[0-9]{8,10}$/,          // Czech Republic
    /^DK[0-9]{8}$/,             // Denmark
    /^EE[0-9]{9}$/,             // Estonia
    /^FI[0-9]{8}$/,             // Finland
    /^FR[A-HJ-NP-Z0-9]{2}[0-9]{9}$/, // France
    /^DE[0-9]{9}$/,             // Germany
    /^EL[0-9]{9}$/,             // Greece
    /^HU[0-9]{8}$/,             // Hungary
    /^IE[0-9][A-Z0-9][0-9]{5}[A-Z]{1,2}$/, // Ireland
    /^IT[0-9]{11}$/,            // Italy
    /^LV[0-9]{11}$/,            // Latvia
    /^LT[0-9]{9,12}$/,          // Lithuania
    /^LU[0-9]{8}$/,             // Luxembourg
    /^MT[0-9]{8}$/,             // Malta
    /^NL[0-9]{9}B[0-9]{2}$/,    // Netherlands
    /^PL[0-9]{10}$/,            // Poland
    /^PT[0-9]{9}$/,             // Portugal
    /^RO[0-9]{2,10}$/,          // Romania
    /^SK[0-9]{10}$/,            // Slovakia
    /^SI[0-9]{8}$/,             // Slovenia
    /^ES[A-Z][0-9]{7}[A-Z0-9]$/, // Spain
    /^SE[0-9]{12}$/,            // Sweden
  ];

  return euVATPatterns.some(pattern => pattern.test(cleanVAT));
}

/**
 * Check if country is in the EU
 */
export function isEUCountry(country: string): boolean {
  const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
    'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden'
  ];

  return euCountries.some(euCountry => 
    country.toLowerCase().includes(euCountry.toLowerCase())
  );
}

/**
 * Format currency for UK display
 */
export function formatUKCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate invoice number in UK format
 */
export function generateUKInvoiceNumber(prefix: string = 'WM'): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const timestamp = Date.now().toString().slice(-6);
  
  return `${prefix}-${year}${month}-${timestamp}`;
}

/**
 * Get UK business date (accounting for weekends and bank holidays)
 */
export function getUKBusinessDate(daysToAdd: number = 0): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  
  // Skip weekends
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  
  // TODO: Add UK bank holiday checking if needed
  
  return date;
}