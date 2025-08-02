import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG, WEBHOOK_EVENTS } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing Stripe signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.webhookSecret
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log('Received webhook event:', event.type);

  try {
    switch (event.type) {
      case WEBHOOK_EVENTS.SUBSCRIPTION_CREATED:
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED:
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case WEBHOOK_EVENTS.SUBSCRIPTION_DELETED:
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED:
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED:
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case WEBHOOK_EVENTS.CUSTOMER_CREATED:
        await handleCustomerCreated(event.data.object as Stripe.Customer);
        break;

      case WEBHOOK_EVENTS.CUSTOMER_UPDATED:
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;

      default:
        console.log('Unhandled webhook event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);
  
  // TODO: Save subscription to database
  // This would typically involve:
  // 1. Extract user ID from metadata or customer
  // 2. Create UserSubscription record
  // 3. Update user's subscription status
  // 4. Send welcome email
  
  const metadata = subscription.metadata;
  const tier = metadata.tier;
  const billingCycle = metadata.billing_cycle;
  
  console.log(`New subscription: tier=${tier}, billing=${billingCycle}`);
  
  // Example database save (implement based on your database choice):
  /*
  await database.userSubscriptions.create({
    data: {
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: subscription.customer as string,
      tier: tier,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      billingCycle: billingCycle as 'monthly' | 'yearly',
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
  */
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);
  
  // TODO: Update subscription in database
  // Handle plan changes, status updates, etc.
  
  console.log(`Updated subscription status: ${subscription.status}`);
  
  // Example database update:
  /*
  await database.userSubscriptions.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
  */
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);
  
  // TODO: Handle subscription cancellation
  // Update user's access level, send cancellation email, etc.
  
  // Example database update:
  /*
  await database.userSubscriptions.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'canceled',
    },
  });
  */
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  // TODO: Handle successful payment
  // Update subscription status, send receipt, extend access, etc.
  
  if (invoice.subscription) {
    console.log(`Payment succeeded for subscription: ${invoice.subscription}`);
    
    // Example: Send receipt email, update payment history
    /*
    await sendReceiptEmail(invoice);
    await database.payments.create({
      data: {
        stripeInvoiceId: invoice.id,
        stripeSubscriptionId: invoice.subscription as string,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: 'succeeded',
        paidAt: new Date(invoice.status_transitions.paid_at! * 1000),
      },
    });
    */
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id);
  
  // TODO: Handle failed payment
  // Send dunning emails, update subscription status, etc.
  
  if (invoice.subscription) {
    console.log(`Payment failed for subscription: ${invoice.subscription}`);
    
    // Example: Send payment failure notification
    /*
    await sendPaymentFailureEmail(invoice);
    await database.userSubscriptions.update({
      where: { stripeSubscriptionId: invoice.subscription as string },
      data: { status: 'past_due' },
    });
    */
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  console.log('Customer created:', customer.id);
  
  // TODO: Save customer to database if needed
  // Link to user account, update customer references, etc.
}

async function handleCustomerUpdated(customer: Stripe.Customer) {
  console.log('Customer updated:', customer.id);
  
  // TODO: Update customer information in database
  // Sync billing address, email changes, etc.
}