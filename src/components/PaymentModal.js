import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../services/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentModal({ isOpen, onClose, customerData }) {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && customerData) {
      createPaymentIntent();
    }
  }, [isOpen, customerData]);

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await api.post('/reports/create-payment-intent', {
        email: customerData.email,
        phone: customerData.phone,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        address: customerData.address,
        city: customerData.city,
        state: customerData.state,
        zip_code: customerData.zipCode
      });
      
      setClientSecret(response.data.client_secret);
      setPaymentIntentId(response.data.payment_intent_id);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      alert('Error initializing payment. Please try again.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#E8600A',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Professional Roof Report</span>
              <span className="text-2xl font-bold text-[#E8600A]">$25.00</span>
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <p>✓ Aerial roof measurements</p>
              <p>✓ Material breakdown & quantities</p>
              <p>✓ Cost estimate (low/mid/high)</p>
              <p>✓ PDF delivery to: {customerData.email}</p>
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm">
            <p className="font-semibold text-blue-900 mb-1">Property Address:</p>
            <p className="text-blue-800">{customerData.formatted || `${customerData.address}, ${customerData.city}, ${customerData.state} ${customerData.zipCode}`}</p>
          </div>

          {/* Payment Form */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-[#E8600A]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                customerData={customerData}
                onSuccess={() => {
                  onClose();
                  window.location.href = '/consumer/reports?success=true';
                }}
              />
            </Elements>
          ) : (
            <div className="text-center text-red-600">
              Unable to initialize payment. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({ customerData, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/consumer/reports?success=true`,
        receipt_email: customerData.email,
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else {
      // Payment succeeded without redirect
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      
      {message && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
          {message}
        </div>
      )}

      <button
        disabled={isLoading || !stripe || !elements}
        className="w-full mt-6 bg-[#E8600A] hover:bg-[#C65008] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
          'Pay $25.00'
        )}
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Your payment is secure and encrypted. You'll receive your report via email within 24 hours.
      </p>
    </form>
  );
}
