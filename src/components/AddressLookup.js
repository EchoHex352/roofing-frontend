import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCalculator } from '../contexts/CalculatorContext';
import api from '../services/api';
import PaymentModal from './PaymentModal';

export default function AddressLookup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [addressValidated, setAddressValidated] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Validate address with backend
      const response = await api.post('/address/validate', {
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode
      });
      
      if (response.data.is_valid) {
        setAddressValidated({
          ...data,
          formatted: response.data.formatted_address,
          available: response.data.eagleview_available,
          deliveryHours: response.data.estimated_delivery_hours
        });
        
        if (response.data.eagleview_available) {
          setShowPayment(true);
        } else {
          setErrorMessage('Professional imagery not available for this address. Please try our free manual calculator.');
        }
      } else {
        setErrorMessage('Unable to validate address. Please check and try again.');
      }
    } catch (error) {
      console.error('Address validation error:', error);
      setErrorMessage(error.response?.data?.detail || 'Error validating address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Get Professional Report</h2>
        <div className="bg-[#E8600A] text-white px-4 py-2 rounded-lg font-bold">
          $25
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">What you'll receive:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Professional aerial roof measurements</li>
              <li>Detailed material breakdown & quantities</li>
              <li>Cost estimate (low/mid/high ranges)</li>
              <li>PDF report delivered to your email</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Street Address *
          </label>
          <input
            {...register('address', { required: 'Address is required' })}
            type="text"
            placeholder="123 Main St"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              City *
            </label>
            <input
              {...register('city', { required: 'City is required' })}
              type="text"
              placeholder="San Diego"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              State *
            </label>
            <select
              {...register('state', { required: 'State is required' })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            >
              <option value="">Select State</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="PA">Pennsylvania</option>
              <option value="IL">Illinois</option>
              <option value="OH">Ohio</option>
              <option value="GA">Georgia</option>
              <option value="NC">North Carolina</option>
              <option value="MI">Michigan</option>
              {/* Add all states */}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ZIP Code *
          </label>
          <input
            {...register('zipCode', { 
              required: 'ZIP code is required',
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: 'Invalid ZIP code'
              }
            })}
            type="text"
            placeholder="92101"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email *
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Phone Number *
          </label>
          <input
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[\d\s\-\(\)]+$/,
                message: 'Invalid phone number'
              }
            })}
            type="tel"
            placeholder="(555) 123-4567"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#E8600A] hover:bg-[#C65008] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Validating Address...
            </span>
          ) : (
            'Continue to Payment'
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          🔒 Secure payment powered by Stripe
        </p>
      </form>

      {/* Payment Modal */}
      {showPayment && addressValidated && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          customerData={addressValidated}
        />
      )}
    </div>
  );
}
