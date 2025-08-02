# Stripe Integration Guide for WanderMood

This guide provides comprehensive instructions for setting up and managing the Stripe subscription system for WanderMood's 4-tier pricing model.

## Overview

WanderMood uses Stripe for subscription billing with the following tiers:
- **Free**: £0/month (no Stripe integration needed)
- **Explorer**: £8.99/month | £79.99/year
- **Curator**: £19.99/month | £199.99/year  
- **Connoisseur**: £49.99/month | £499.99/year

## Setup Instructions

### 1. Stripe Account Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Complete business verification for UK operations
3. Enable tax calculation features
4. Set up billing portal configuration

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your Stripe credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your public key from Stripe Dashboard
- `STRIPE_SECRET_KEY`: Your secret key from Stripe Dashboard  
- `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret
- `STRIPE_*_PRICE_ID`: Price IDs for each subscription tier

### 3. Create Products and Prices in Stripe

#### Using Stripe Dashboard:

1. Go to **Products** in your Stripe Dashboard
2. Create products for each tier:

**Explorer Tier:**
- Name: "Explorer Plan"
- Description: "For regular travelers who want more personalized experiences"
- Create 2 prices:
  - Monthly: £8.99 GBP, recurring monthly
  - Yearly: £79.99 GBP, recurring yearly

**Curator Tier:**
- Name: "Curator Plan"  
- Description: "For passionate travelers seeking deeply personalized journeys"
- Create 2 prices:
  - Monthly: £19.99 GBP, recurring monthly
  - Yearly: £199.99 GBP, recurring yearly

**Connoisseur Tier:**
- Name: "Connoisseur Plan"
- Description: "For luxury travelers and travel professionals"
- Create 2 prices:
  - Monthly: £49.99 GBP, recurring monthly
  - Yearly: £499.99 GBP, recurring yearly

#### Using Stripe CLI (Alternative):

```bash
# Create products and prices programmatically
stripe products create --name "Explorer Plan" --description "For regular travelers"
stripe prices create --product prod_xxx --unit-amount 899 --currency gbp --recurring[interval]=month
stripe prices create --product prod_xxx --unit-amount 7999 --currency gbp --recurring[interval]=year
```

### 4. Configure Webhooks

1. Go to **Webhooks** in Stripe Dashboard
2. Add endpoint: `https://yourdomain.com/api/stripe/webhooks`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated` 
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.created`
   - `customer.updated`

### 5. Tax Configuration

#### Enable Automatic Tax:
1. Go to **Tax** in Stripe Dashboard
2. Enable automatic tax calculation
3. Configure for UK operations:
   - Set default tax behavior to "inclusive"
   - Configure UK VAT rate (20%)

#### Tax ID Collection:
- Enable tax ID collection for business customers
- This helps with EU reverse charge rules

### 6. Customer Portal Configuration

1. Go to **Billing > Customer portal** in Stripe Dashboard
2. Configure allowed actions:
   - ✅ Update payment method
   - ✅ Download invoices  
   - ✅ Cancel subscription
   - ✅ Update billing address
   - ✅ Pause subscription (optional)

## Development Workflow

### Running Locally

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`

3. Start development server:
```bash
npm run dev
```

4. Test webhooks locally using Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

### Testing Subscriptions

Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

## UK Compliance Features

### VAT Handling
- All prices include 20% UK VAT
- Automatic tax calculation for EU customers
- Reverse charge for EU B2B customers with valid VAT numbers
- Zero-rating for non-EU customers

### Invoice Requirements
- Company registration details included
- VAT number displayed on invoices
- Compliant invoice numbering system
- Customer tax ID collection

### Data Protection
- GDPR compliant data handling
- Customer data retention policies
- Right to deletion support

## API Reference

### Create Checkout Session
```typescript
POST /api/stripe/create-checkout-session
{
  "tierId": "curator",
  "billingCycle": "yearly",
  "customerId": "cus_xxx" // optional
}
```

### Customer Portal
```typescript
POST /api/stripe/customer-portal
{
  "customerId": "cus_xxx",
  "returnUrl": "https://yoursite.com/account"
}
```

### Subscription Status
```typescript
GET /api/stripe/subscription-status?customerId=cus_xxx
POST /api/stripe/subscription-status
{
  "subscriptionId": "sub_xxx",
  "action": "cancel" | "reactivate" | "change_plan",
  "priceId": "price_xxx" // for plan changes
}
```

## Error Handling

The system includes comprehensive error handling for:
- Card declined scenarios
- Network failures
- Invalid requests
- Rate limiting
- Authentication errors

Error messages are user-friendly and include actionable guidance.

## Security Considerations

### PCI Compliance
- No card data stored on your servers
- All payments processed securely by Stripe
- Stripe Elements for secure card input

### Webhook Security
- Webhook signature verification
- Idempotency handling
- Secure endpoint configuration

### Environment Security
- Secret keys in environment variables only
- No sensitive data in client-side code
- Production key rotation policies

## Monitoring and Alerts

### Key Metrics to Monitor
- Subscription conversion rates
- Failed payment rates
- Churn by subscription tier
- Revenue metrics

### Recommended Alerts
- Failed webhook deliveries
- High decline rates
- Subscription cancellations
- Payment disputes

## Troubleshooting

### Common Issues

**Webhook 404 Errors:**
- Verify webhook URL is correct
- Check deployment status
- Confirm route exists

**Card Declined:**
- Check test card numbers in development
- Verify billing address requirements
- Review Stripe Dashboard logs

**Tax Calculation Issues:**
- Ensure automatic tax is enabled
- Verify customer location data
- Check tax rate configuration

**Portal Access Issues:**
- Confirm customer exists in Stripe
- Verify portal configuration
- Check customer ID mapping

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
STRIPE_DEBUG=true
```

## Deployment Checklist

### Pre-Production
- [ ] Test all subscription flows
- [ ] Verify webhook endpoints
- [ ] Test customer portal
- [ ] Validate tax calculations
- [ ] Check error handling

### Production Setup
- [ ] Use live Stripe keys
- [ ] Configure production webhook URLs
- [ ] Set up monitoring and alerts
- [ ] Verify SSL certificates
- [ ] Test backup systems

### Post-Deployment
- [ ] Monitor webhook delivery
- [ ] Check payment success rates
- [ ] Verify customer notifications
- [ ] Test subscription management
- [ ] Monitor error rates

## Support and Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [UK VAT Guidelines](https://www.gov.uk/vat-rates)
- [GDPR Compliance](https://stripe.com/guides/general-data-protection-regulation)

For technical support with this integration, contact the development team or refer to the codebase documentation.