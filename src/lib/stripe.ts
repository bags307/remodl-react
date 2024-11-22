import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    const { sessionId } = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createPortalSession() {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
    });

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}