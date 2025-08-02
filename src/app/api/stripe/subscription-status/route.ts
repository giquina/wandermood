import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const subscriptionId = searchParams.get('subscriptionId');

    if (!customerId && !subscriptionId) {
      return NextResponse.json(
        { error: 'Either customerId or subscriptionId is required' },
        { status: 400 }
      );
    }

    let subscription;

    if (subscriptionId) {
      // Get specific subscription
      subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['latest_invoice', 'customer'],
      });
    } else if (customerId) {
      // Get customer's active subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.latest_invoice', 'data.customer'],
        limit: 10,
      });

      subscription = subscriptions.data[0]; // Most recent subscription
    }

    if (!subscription) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      );
    }

    // Format subscription data
    const subscriptionData = {
      id: subscription.id,
      status: subscription.status,
      currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
      currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      cancelAtPeriodEnd: (subscription as any).cancel_at_period_end,
      cancelAt: (subscription as any).cancel_at ? new Date((subscription as any).cancel_at * 1000) : null,
      tier: subscription.metadata.tier,
      billingCycle: subscription.metadata.billing_cycle,
      customerId: subscription.customer,
      latestInvoice: subscription.latest_invoice ? {
        id: subscription.latest_invoice.id,
        status: subscription.latest_invoice.status,
        amountPaid: subscription.latest_invoice.amount_paid,
        amountDue: subscription.latest_invoice.amount_due,
        currency: subscription.latest_invoice.currency,
        created: new Date(subscription.latest_invoice.created * 1000),
      } : null,
    };

    return NextResponse.json(subscriptionData);

  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, action, priceId } = await request.json();

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { error: 'Subscription ID and action are required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'cancel':
        result = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
        break;

      case 'reactivate':
        result = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: false,
        });
        break;

      case 'change_plan':
        if (!priceId) {
          return NextResponse.json(
            { error: 'Price ID is required for plan changes' },
            { status: 400 }
          );
        }

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        result = await stripe.subscriptions.update(subscriptionId, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: priceId,
            },
          ],
          proration_behavior: 'create_prorations',
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      subscription: {
        id: result.id,
        status: result.status,
        cancelAtPeriodEnd: result.cancel_at_period_end,
      },
    });

  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}