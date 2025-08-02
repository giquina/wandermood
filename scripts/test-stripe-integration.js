#!/usr/bin/env node

/**
 * Stripe Integration Test Script
 * Tests the basic functionality of the Stripe integration
 */

const stripe = require('stripe');
const { SUBSCRIPTION_TIERS } = require('../src/lib/subscription-tiers');

// Configuration
const config = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  testMode: true,
  verboseOutput: process.argv.includes('--verbose'),
};

if (!config.stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  console.log('Please set your Stripe secret key in .env.local');
  process.exit(1);
}

const stripeClient = stripe(config.stripeSecretKey);

// Test functions
async function testStripeConnection() {
  console.log('🔗 Testing Stripe connection...');
  try {
    const account = await stripeClient.accounts.retrieve();
    console.log(`✅ Connected to Stripe account: ${account.display_name || account.id}`);
    console.log(`   Country: ${account.country}`);
    console.log(`   Currency: ${account.default_currency?.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to connect to Stripe:', error.message);
    return false;
  }
}

async function testProductsAndPrices() {
  console.log('\n💰 Testing products and prices...');
  
  let allPricesValid = true;
  
  for (const tier of SUBSCRIPTION_TIERS) {
    if (tier.id === 'free') continue; // Skip free tier
    
    console.log(`\n  Testing ${tier.name} tier:`);
    
    // Test monthly price
    if (tier.stripePriceIdMonthly) {
      try {
        const price = await stripeClient.prices.retrieve(tier.stripePriceIdMonthly);
        console.log(`    ✅ Monthly price (${tier.stripePriceIdMonthly}): ${formatPrice(price)}`);
      } catch (error) {
        console.log(`    ❌ Monthly price (${tier.stripePriceIdMonthly}): ${error.message}`);
        allPricesValid = false;
      }
    } else {
      console.log(`    ⚠️  Monthly price ID not configured`);
      allPricesValid = false;
    }
    
    // Test yearly price
    if (tier.stripePriceIdYearly) {
      try {
        const price = await stripeClient.prices.retrieve(tier.stripePriceIdYearly);
        console.log(`    ✅ Yearly price (${tier.stripePriceIdYearly}): ${formatPrice(price)}`);
      } catch (error) {
        console.log(`    ❌ Yearly price (${tier.stripePriceIdYearly}): ${error.message}`);
        allPricesValid = false;
      }
    } else {
      console.log(`    ⚠️  Yearly price ID not configured`);
      allPricesValid = false;
    }
  }
  
  return allPricesValid;
}

async function testWebhookEndpoint() {
  console.log('\n🪝 Testing webhook configuration...');
  
  try {
    const webhooks = await stripeClient.webhookEndpoints.list({ limit: 10 });
    
    if (webhooks.data.length === 0) {
      console.log('  ⚠️  No webhook endpoints configured');
      return false;
    }
    
    let hasValidWebhook = false;
    for (const webhook of webhooks.data) {
      console.log(`  📡 Webhook: ${webhook.url}`);
      console.log(`     Status: ${webhook.status}`);
      console.log(`     Events: ${webhook.enabled_events.length} events`);
      
      const requiredEvents = [
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.payment_succeeded',
        'invoice.payment_failed'
      ];
      
      const hasRequiredEvents = requiredEvents.every(event => 
        webhook.enabled_events.includes(event)
      );
      
      if (hasRequiredEvents) {
        console.log(`     ✅ Has all required events`);
        hasValidWebhook = true;
      } else {
        console.log(`     ⚠️  Missing some required events`);
      }
    }
    
    return hasValidWebhook;
  } catch (error) {
    console.error('  ❌ Failed to check webhooks:', error.message);
    return false;
  }
}

async function testTaxConfiguration() {
  console.log('\n🏛️ Testing tax configuration...');
  
  try {
    const taxRates = await stripeClient.taxRates.list({ limit: 10 });
    console.log(`  📊 Found ${taxRates.data.length} tax rate(s)`);
    
    // Look for UK VAT rate
    const ukVATRate = taxRates.data.find(rate => 
      rate.country === 'GB' && rate.percentage === 20
    );
    
    if (ukVATRate) {
      console.log(`  ✅ UK VAT rate configured: ${ukVATRate.percentage}%`);
    } else {
      console.log(`  ⚠️  UK VAT rate (20%) not found`);
    }
    
    return true;
  } catch (error) {
    console.error('  ❌ Failed to check tax configuration:', error.message);
    return false;
  }
}

async function testCustomerPortal() {
  console.log('\n🏠 Testing customer portal configuration...');
  
  try {
    const configuration = await stripeClient.billingPortal.configurations.list({ 
      limit: 1 
    });
    
    if (configuration.data.length > 0) {
      const config = configuration.data[0];
      console.log(`  ✅ Customer portal configured`);
      console.log(`     Features: ${Object.keys(config.features).join(', ')}`);
      return true;
    } else {
      console.log(`  ⚠️  Customer portal not configured`);
      return false;
    }
  } catch (error) {
    console.error('  ❌ Failed to check customer portal:', error.message);
    return false;
  }
}

async function createTestCheckoutSession() {
  console.log('\n🛒 Testing checkout session creation...');
  
  try {
    const testTier = SUBSCRIPTION_TIERS.find(tier => 
      tier.id === 'curator' && tier.stripePriceIdMonthly
    );
    
    if (!testTier) {
      console.log('  ⚠️  Cannot test - no valid tier with price ID found');
      return false;
    }
    
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: testTier.stripePriceIdMonthly,
          quantity: 1,
        },
      ],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      metadata: {
        tier: testTier.id,
        billing_cycle: 'monthly',
        test: 'true',
      },
    });
    
    console.log(`  ✅ Test checkout session created: ${session.id}`);
    console.log(`     URL: ${session.url}`);
    
    // Clean up test session
    await stripeClient.checkout.sessions.expire(session.id);
    console.log(`  🧹 Test session cleaned up`);
    
    return true;
  } catch (error) {
    console.error('  ❌ Failed to create test checkout session:', error.message);
    return false;
  }
}

// Utility functions
function formatPrice(price) {
  const amount = price.unit_amount / 100;
  const currency = price.currency.toUpperCase();
  const interval = price.recurring?.interval;
  return `${amount} ${currency}${interval ? `/${interval}` : ''}`;
}

function printSummary(results) {
  console.log('\n' + '='.repeat(50));
  console.log('📋 TEST SUMMARY');
  console.log('='.repeat(50));
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
  });
  
  console.log('='.repeat(50));
  console.log(`🏆 ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! Your Stripe integration is ready.');
  } else {
    console.log('⚠️  Some tests failed. Please review the configuration.');
    console.log('\n💡 Next steps:');
    console.log('1. Check your environment variables in .env.local');
    console.log('2. Verify your Stripe Dashboard configuration');
    console.log('3. Review the Stripe integration guide');
  }
}

// Main test runner
async function runTests() {
  console.log('🧪 WanderMood Stripe Integration Test Suite');
  console.log('==========================================\n');
  
  const results = [];
  
  // Run tests
  results.push({
    name: 'Stripe Connection',
    passed: await testStripeConnection()
  });
  
  results.push({
    name: 'Products and Prices',
    passed: await testProductsAndPrices()
  });
  
  results.push({
    name: 'Webhook Configuration',
    passed: await testWebhookEndpoint()
  });
  
  results.push({
    name: 'Tax Configuration',
    passed: await testTaxConfiguration()
  });
  
  results.push({
    name: 'Customer Portal',
    passed: await testCustomerPortal()
  });
  
  results.push({
    name: 'Checkout Session Creation',
    passed: await createTestCheckoutSession()
  });
  
  // Print summary
  printSummary(results);
  
  // Exit with appropriate code
  const allPassed = results.every(r => r.passed);
  process.exit(allPassed ? 0 : 1);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('\n❌ Unhandled error:', error);
  process.exit(1);
});

// Run tests
runTests();