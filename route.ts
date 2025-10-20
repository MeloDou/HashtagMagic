import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature);

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error('No user ID in session metadata');
        return NextResponse.json({ error: 'No user ID' }, { status: 400 });
      }

      // Update user payment status in database
      const { error } = await supabase
        .from('users')
        .update({ payment_status: 'paid' })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user payment status:', error);
        return NextResponse.json(
          { error: 'Failed to update user status' },
          { status: 500 }
        );
      }

      console.log(`Payment successful for user: ${userId}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
