import '../styles/globals.css';
import { CalculatorProvider } from '../contexts/CalculatorContext';

export default function App({ Component, pageProps }) {
  return (
    <CalculatorProvider>
      <Component {...pageProps} />
    </CalculatorProvider>
  );
}
