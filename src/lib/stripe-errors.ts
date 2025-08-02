/**
 * Stripe Error Handling Utilities
 * Provides comprehensive error handling for Stripe integration
 */

import Stripe from 'stripe';

export interface StripeErrorDetails {
  code: string;
  message: string;
  userMessage: string;
  action?: string;
  retryable: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class WanderMoodPaymentError extends Error {
  public readonly code: string;
  public readonly userMessage: string;
  public readonly action?: string;
  public readonly retryable: boolean;
  public readonly severity: 'low' | 'medium' | 'high' | 'critical';
  public readonly originalError?: Error;

  constructor(details: StripeErrorDetails, originalError?: Error) {
    super(details.message);
    this.name = 'WanderMoodPaymentError';
    this.code = details.code;
    this.userMessage = details.userMessage;
    this.action = details.action;
    this.retryable = details.retryable;
    this.severity = details.severity;
    this.originalError = originalError;
  }
}

/**
 * Convert Stripe errors to user-friendly error messages
 */
export function handleStripeError(error: any): WanderMoodPaymentError {
  console.error('Stripe error:', error);

  // Handle Stripe-specific errors
  if (error.type) {
    switch (error.type) {
      case 'StripeCardError':
        return handleCardError(error);
      
      case 'StripeRateLimitError':
        return new WanderMoodPaymentError({
          code: 'rate_limit',
          message: 'Too many requests made to the API too quickly',
          userMessage: 'We\'re experiencing high traffic. Please try again in a moment.',
          action: 'retry',
          retryable: true,
          severity: 'medium',
        }, error);

      case 'StripeInvalidRequestError':
        return handleInvalidRequestError(error);

      case 'StripeAPIError':
        return new WanderMoodPaymentError({
          code: 'api_error',
          message: 'An error occurred with our payment processor',
          userMessage: 'We\'re experiencing technical difficulties. Please try again later.',
          action: 'retry_later',
          retryable: true,
          severity: 'high',
        }, error);

      case 'StripeConnectionError':
        return new WanderMoodPaymentError({
          code: 'connection_error',
          message: 'Network communication with Stripe failed',
          userMessage: 'Connection failed. Please check your internet connection and try again.',
          action: 'retry',
          retryable: true,
          severity: 'medium',
        }, error);

      case 'StripeAuthenticationError':
        return new WanderMoodPaymentError({
          code: 'authentication_error',
          message: 'Authentication with Stripe failed',
          userMessage: 'Payment processing is temporarily unavailable. Please try again later.',
          action: 'contact_support',
          retryable: false,
          severity: 'critical',
        }, error);

      default:
        return handleGenericStripeError(error);
    }
  }

  // Handle generic errors
  return new WanderMoodPaymentError({
    code: 'unknown_error',
    message: error.message || 'An unknown error occurred',
    userMessage: 'Something went wrong. Please try again or contact support if the problem persists.',
    action: 'retry',
    retryable: true,
    severity: 'medium',
  }, error);
}

/**
 * Handle card-specific errors
 */
function handleCardError(error: Stripe.StripeCardError): WanderMoodPaymentError {
  const { code, decline_code, message } = error;

  switch (code) {
    case 'card_declined':
      return handleCardDeclined(decline_code, message);

    case 'expired_card':
      return new WanderMoodPaymentError({
        code: 'expired_card',
        message: 'Your card has expired',
        userMessage: 'Your card has expired. Please use a different payment method.',
        action: 'use_different_card',
        retryable: false,
        severity: 'low',
      }, error);

    case 'incorrect_cvc':
      return new WanderMoodPaymentError({
        code: 'incorrect_cvc',
        message: 'Your card\'s security code is incorrect',
        userMessage: 'The security code (CVC) on your card is incorrect. Please check and try again.',
        action: 'fix_cvc',
        retryable: true,
        severity: 'low',
      }, error);

    case 'processing_error':
      return new WanderMoodPaymentError({
        code: 'processing_error',
        message: 'An error occurred while processing your card',
        userMessage: 'There was an error processing your payment. Please try again.',
        action: 'retry',
        retryable: true,
        severity: 'medium',
      }, error);

    case 'incorrect_number':
      return new WanderMoodPaymentError({
        code: 'incorrect_number',
        message: 'Your card number is incorrect',
        userMessage: 'The card number you entered is incorrect. Please check and try again.',
        action: 'fix_card_number',
        retryable: true,
        severity: 'low',
      }, error);

    default:
      return new WanderMoodPaymentError({
        code: code || 'card_error',
        message: message || 'Your card was declined',
        userMessage: 'Your payment was declined. Please try a different payment method.',
        action: 'use_different_card',
        retryable: false,
        severity: 'low',
      }, error);
  }
}

/**
 * Handle card declined scenarios
 */
function handleCardDeclined(
  decline_code: string | undefined, 
  message: string | undefined
): WanderMoodPaymentError {
  switch (decline_code) {
    case 'insufficient_funds':
      return new WanderMoodPaymentError({
        code: 'insufficient_funds',
        message: 'Your card has insufficient funds',
        userMessage: 'Your card was declined due to insufficient funds. Please try a different payment method.',
        action: 'use_different_card',
        retryable: false,
        severity: 'low',
      });

    case 'lost_card':
    case 'stolen_card':
      return new WanderMoodPaymentError({
        code: 'card_not_supported',
        message: 'Your card cannot be used for this payment',
        userMessage: 'This card cannot be used. Please contact your bank or try a different payment method.',
        action: 'contact_bank',
        retryable: false,
        severity: 'medium',
      });

    case 'merchant_blacklist':
      return new WanderMoodPaymentError({
        code: 'merchant_blacklist',
        message: 'Your card cannot be used with this merchant',
        userMessage: 'Your card was declined. Please try a different payment method.',
        action: 'use_different_card',
        retryable: false,
        severity: 'low',
      });

    case 'pickup_card':
      return new WanderMoodPaymentError({
        code: 'pickup_card',
        message: 'Your card was declined',
        userMessage: 'Your card was declined. Please contact your bank.',
        action: 'contact_bank',
        retryable: false,
        severity: 'medium',
      });

    default:
      return new WanderMoodPaymentError({
        code: 'card_declined',
        message: message || 'Your card was declined',
        userMessage: 'Your payment was declined. Please try a different payment method or contact your bank.',
        action: 'use_different_card',
        retryable: false,
        severity: 'low',
      });
  }
}

/**
 * Handle invalid request errors
 */
function handleInvalidRequestError(error: Stripe.StripeInvalidRequestError): WanderMoodPaymentError {
  const { message, param } = error;

  if (param) {
    return new WanderMoodPaymentError({
      code: 'invalid_request',
      message: `Invalid parameter: ${param}`,
      userMessage: 'There was an error with your payment information. Please check your details and try again.',
      action: 'fix_details',
      retryable: true,
      severity: 'low',
    }, error);
  }

  return new WanderMoodPaymentError({
    code: 'invalid_request',
    message: message || 'Invalid request',
    userMessage: 'There was an error processing your request. Please try again.',
    action: 'retry',
    retryable: true,
    severity: 'medium',
  }, error);
}

/**
 * Handle generic Stripe errors
 */
function handleGenericStripeError(error: any): WanderMoodPaymentError {
  return new WanderMoodPaymentError({
    code: 'stripe_error',
    message: error.message || 'A payment processing error occurred',
    userMessage: 'We\'re experiencing payment processing issues. Please try again in a few minutes.',
    action: 'retry_later',
    retryable: true,
    severity: 'medium',
  }, error);
}

/**
 * Log errors with appropriate severity
 */
export function logPaymentError(error: WanderMoodPaymentError, context?: any): void {
  const logData = {
    error: {
      name: error.name,
      code: error.code,
      message: error.message,
      userMessage: error.userMessage,
      severity: error.severity,
      retryable: error.retryable,
      action: error.action,
      stack: error.stack,
    },
    context,
    timestamp: new Date().toISOString(),
  };

  // In production, you would send this to your logging service
  switch (error.severity) {
    case 'critical':
      console.error('CRITICAL PAYMENT ERROR:', logData);
      // TODO: Send alert to monitoring service
      break;
    case 'high':
      console.error('HIGH SEVERITY PAYMENT ERROR:', logData);
      break;
    case 'medium':
      console.warn('MEDIUM SEVERITY PAYMENT ERROR:', logData);
      break;
    case 'low':
      console.log('LOW SEVERITY PAYMENT ERROR:', logData);
      break;
  }
}

/**
 * Determine if an error should trigger a retry
 */
export function shouldRetryError(error: WanderMoodPaymentError): boolean {
  return error.retryable && ['medium', 'high'].includes(error.severity);
}

/**
 * Get user-friendly error message with action
 */
export function getErrorMessageWithAction(error: WanderMoodPaymentError): {
  message: string;
  action?: string;
} {
  const actionMessages = {
    retry: 'Please try again.',
    retry_later: 'Please try again in a few minutes.',
    use_different_card: 'Please try with a different payment method.',
    fix_cvc: 'Please check your security code and try again.',
    fix_card_number: 'Please check your card number and try again.',
    fix_details: 'Please check your payment details and try again.',
    contact_bank: 'Please contact your bank for assistance.',
    contact_support: 'Please contact our support team if this continues.',
  };

  return {
    message: error.userMessage,
    action: error.action ? actionMessages[error.action as keyof typeof actionMessages] : undefined,
  };
}