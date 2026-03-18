import { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export function CalculatorProvider({ children }) {
  const [estimate, setEstimate] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    estimate,
    setEstimate,
    reportData,
    setReportData,
    loading,
    setLoading,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within CalculatorProvider');
  }
  return context;
}
