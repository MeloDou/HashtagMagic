'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader } from 'lucide-react';
import { stripePromise } from '@/lib/stripe';

interface PaymentButtonProps {
  userId: string;
  userEmail: string;
  onPaymentSuccess: () => void;
}

export default function PaymentButton({ userId, userEmail, onPaymentSuccess }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!userId || !userEmail) {
      alert('Please sign in to upgrade');
      return;
    }

    setIsLoading(true);
    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userEmail,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handlePayment}
      disabled={isLoading}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4" />
          <span>Upgrade - $29.99</span>
        </>
      )}
    </motion.button>
  );
}
