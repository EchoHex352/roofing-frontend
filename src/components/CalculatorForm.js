// CalculatorForm.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCalculator } from '../contexts/CalculatorContext';
import api from '../services/api';

export default function CalculatorForm() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      squareFootage: 2000,
      pitch: '6/12',
      stories: 1,
      materialType: 'arch_shingle',
      scope: 'new_install',
      city: 'San Diego',
      state: 'CA'
    }
  });
  
  const { setEstimate, setLoading } = useCalculator();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/calculator/estimate', {
        square_footage: parseFloat(data.squareFootage),
        pitch: data.pitch,
        stories: parseInt(data.stories),
        complexity: 'medium',
        material_type: data.materialType,
        scope: data.scope,
        city: data.city,
        state: data.state
      });
      
      setEstimate(response.data);
    } catch (err) {
      console.error('Calculation error:', err);
      setError('Error calculating estimate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <h2 className="text-2xl font-bold mb-6">Manual Calculator</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-yellow-900">
            <p className="font-semibold mb-1">Quick Estimate:</p>
            <p>This free calculator provides ballpark pricing based on your inputs. For precise measurements, consider our $25 professional report.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Roof Square Footage
          </label>
          <input
            {...register('squareFootage')}
            type="number"
            step="100"
            min="500"
            max="10000"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          />
          <p className="mt-1 text-xs text-slate-500">Typical home: 1,500-2,500 sq ft</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Roof Pitch
          </label>
          <select
            {...register('pitch')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          >
            <option value="4/12">4/12 (Low slope)</option>
            <option value="6/12">6/12 (Medium slope)</option>
            <option value="8/12">8/12 (Steep slope)</option>
            <option value="12/12">12/12+ (Very steep)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Number of Stories
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(num => (
              <label key={num} className="relative">
                <input
                  {...register('stories')}
                  type="radio"
                  value={num}
                  className="peer sr-only"
                />
                <div className="border-2 border-slate-300 rounded-lg p-3 text-center font-semibold cursor-pointer peer-checked:border-[#E8600A] peer-checked:bg-orange-50 hover:border-slate-400 transition-colors">
                  {num} {num === 3 ? '+' : ''}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Material Type
          </label>
          <select
            {...register('materialType')}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
          >
            <option value="arch_shingle">Architectural Shingles (Standard)</option>
            <option value="3tab_shingle">3-Tab Shingles (Economy)</option>
            <option value="premium_shingle">Premium Shingles (Designer)</option>
            <option value="metal_standing_seam">Metal Standing Seam</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Scope of Work
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="relative">
              <input
                {...register('scope')}
                type="radio"
                value="new_install"
                className="peer sr-only"
              />
              <div className="border-2 border-slate-300 rounded-lg p-4 cursor-pointer peer-checked:border-[#E8600A] peer-checked:bg-orange-50 hover:border-slate-400 transition-colors">
                <p className="font-semibold">New Install</p>
                <p className="text-xs text-slate-600 mt-1">Install over existing roof</p>
              </div>
            </label>
            <label className="relative">
              <input
                {...register('scope')}
                type="radio"
                value="tear_off"
                className="peer sr-only"
              />
              <div className="border-2 border-slate-300 rounded-lg p-4 cursor-pointer peer-checked:border-[#E8600A] peer-checked:bg-orange-50 hover:border-slate-400 transition-colors">
                <p className="font-semibold">Tear-Off</p>
                <p className="text-xs text-slate-600 mt-1">Remove old + install new</p>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              City
            </label>
            <input
              {...register('city')}
              type="text"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              State
            </label>
            <select
              {...register('state')}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#E8600A] focus:border-transparent"
            >
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="PA">Pennsylvania</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#E8600A] hover:bg-[#C65008] text-white font-bold py-4 rounded-lg transition-colors"
        >
          Calculate Estimate
        </button>
      </form>
    </div>
  );
}

// ResultsDisplay.js Component
export function ResultsDisplay({ estimate }) {
  if (!estimate) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <h2 className="text-2xl font-bold mb-6">Your Estimate</h2>

      {/* Cost Range */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-600 mb-2">ESTIMATED PROJECT COST</p>
          <p className="text-5xl font-bold text-[#E8600A] mb-3">
            {formatCurrency(estimate.mid_range)}
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-600">
            <span>Low: {formatCurrency(estimate.low_range)}</span>
            <span>•</span>
            <span>High: {formatCurrency(estimate.high_range)}</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between py-3 border-b border-slate-200">
          <span className="font-semibold">Materials</span>
          <span>{formatCurrency(estimate.total_materials)}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-slate-200">
          <span className="font-semibold">Labor</span>
          <span>{formatCurrency(estimate.total_labor)}</span>
        </div>
        <div className="flex justify-between py-3 border-b border-slate-200">
          <span className="font-semibold">Overhead & Profit</span>
          <span>{formatCurrency(estimate.overhead)}</span>
        </div>
      </div>

      {/* Details */}
      <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-slate-500">Roof Area</p>
            <p className="font-semibold">{estimate.total_area.toFixed(0)} sq ft</p>
          </div>
          <div>
            <p className="text-slate-500">Cost per Sq Ft</p>
            <p className="font-semibold">${estimate.cost_per_sqft.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-slate-500">Region</p>
            <p className="font-semibold">{estimate.region}</p>
          </div>
          <div>
            <p className="text-slate-500">Material Type</p>
            <p className="font-semibold">{estimate.material_type.replace(/_/g, ' ')}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="font-semibold text-blue-900 mb-2">Want More Accuracy?</p>
        <p className="text-sm text-blue-800 mb-3">
          Get a professional aerial measurement report with exact dimensions and material quantities for just $25.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-[#E8600A] hover:bg-[#C65008] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Get Professional Report
        </button>
      </div>
    </div>
  );
}
