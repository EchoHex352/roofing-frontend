export default function ResultsDisplay({ estimate }) {
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

      {/* CTA for Professional Report */}
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
