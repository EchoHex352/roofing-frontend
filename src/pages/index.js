import { useState } from 'react';
import Head from 'next/head';
import CalculatorForm from '../components/CalculatorForm';
import AddressLookup from '../components/AddressLookup';
import PaymentModal from '../components/PaymentModal';
import ResultsDisplay from '../components/ResultsDisplay';
import { useCalculator } from '../contexts/CalculatorContext';

export default function Home() {
  const [mode, setMode] = useState('address'); // 'address', 'manual', 'results'
  const { estimate, reportData } = useCalculator();

  return (
    <>
      <Head>
        <title>Professional Roof Estimate | Get Accurate Pricing in Minutes</title>
        <meta name="description" content="Get professional roof measurements and accurate cost estimates. $25 for detailed aerial report with material breakdown." />
      </Head>

      {/* Top Bar */}
      <div className="bg-[#0F2440] text-white py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L4 12v12l12 8 12-8V12L16 4z" fill="#E8600A"/>
              <path d="M16 12v12" stroke="white" strokeWidth="2"/>
              <path d="M10 15l6-3 6 3" stroke="white" strokeWidth="2"/>
            </svg>
            <span className="font-bold text-lg">Roofing Platform</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-70">Professional Roof Reports</span>
            <span className="bg-[#E8600A] px-3 py-1 rounded-full font-semibold">$25</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Get Your Professional Roof Estimate
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Accurate aerial measurements • Detailed cost breakdown • Connect with 3 local roofers
            </p>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-sm text-slate-600 mb-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Industry-Leading Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>3-24 Hour Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setMode('address')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  mode === 'address'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎯 Professional Report ($25)
              </button>
              <button
                onClick={() => setMode('manual')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  mode === 'manual'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📐 Quick Estimate (Free)
              </button>
            </div>
          </div>

          {/* Calculator Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Input Form */}
            <div>
              {mode === 'address' ? (
                <AddressLookup />
              ) : (
                <CalculatorForm />
              )}
            </div>

            {/* Right Column - Info/Results */}
            <div>
              {estimate ? (
                <ResultsDisplay estimate={estimate} />
              ) : (
                <WhyChooseUs mode={mode} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8600A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Your Address</h3>
              <p className="text-slate-600">
                We use professional aerial imagery to measure your roof with pinpoint accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8600A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Get Detailed Report</h3>
              <p className="text-slate-600">
                Receive a comprehensive PDF with measurements, material list, and cost breakdown
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8600A] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Connect With Roofers</h3>
              <p className="text-slate-600">
                Get quotes from 3 pre-screened local contractors who compete for your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Homeowners Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Finally, an honest estimate! No more wondering if contractors are inflating prices."
              author="Sarah M."
              location="San Diego, CA"
              rating={5}
            />
            <TestimonialCard
              quote="The aerial report was incredibly detailed. My contractor said it was the most accurate they'd seen."
              author="Mike T."
              location="Austin, TX"
              rating={5}
            />
            <TestimonialCard
              quote="Worth every penny. Saved me hours of climbing on the roof and got quotes 30% lower than expected."
              author="Jennifer L."
              location="Portland, OR"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <FAQItem
              question="How accurate are the measurements?"
              answer="Our reports use professional aerial imagery with industry-leading accuracy. The same technology trusted by insurance companies and roofing contractors nationwide."
            />
            <FAQItem
              question="What's included in the $25 report?"
              answer="You get a detailed PDF with exact roof dimensions, pitch measurements, aerial imagery, material calculations, itemized cost breakdown, and local labor rate estimates."
            />
            <FAQItem
              question="How long does it take?"
              answer="Most reports are delivered within 3-24 hours. You'll receive an email notification when your report is ready to download."
            />
            <FAQItem
              question="Can I get quotes from roofers?"
              answer="Yes! After receiving your report, you can request quotes from 3 pre-screened local roofers. They'll compete for your business with transparent pricing."
            />
            <FAQItem
              question="What if my address isn't available?"
              answer="If professional aerial imagery isn't available for your address, you can use our free manual calculator or we'll issue a full refund."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#E8600A] to-[#C65008] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of homeowners who've gotten accurate roof estimates
          </p>
          <button
            onClick={() => {
              setMode('address');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-white text-[#E8600A] px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
          >
            Get Your $25 Report Now
          </button>
          <p className="text-sm mt-4 opacity-75">
            No subscription • No hidden fees • Instant delivery
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2440] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Roofing Platform</h3>
              <p className="text-sm opacity-75">
                Professional roof measurement reports and accurate cost estimates for homeowners.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="#" className="hover:opacity-100">How It Works</a></li>
                <li><a href="#" className="hover:opacity-100">Sample Report</a></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li><a href="/roofer/register" className="hover:opacity-100">Join as Roofer</a></li>
                <li><a href="/roofer/login" className="hover:opacity-100">Roofer Login</a></li>
                <li><a href="#" className="hover:opacity-100">Lead Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-75">
                <li>support@roofingplatform.com</li>
                <li>(555) 123-4567</li>
                <li>9AM - 6PM EST</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2026 Roofing Platform. All rights reserved. | <a href="#" className="hover:opacity-100">Privacy Policy</a> | <a href="#" className="hover:opacity-100">Terms of Service</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}

function WhyChooseUs({ mode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8">
      <h3 className="text-2xl font-bold mb-6">
        {mode === 'address' ? 'Why Professional Reports?' : 'Quick Estimate Features'}
      </h3>
      
      {mode === 'address' ? (
        <div className="space-y-6">
          <Feature
            icon="📏"
            title="Pinpoint Accuracy"
            description="Aerial measurements accurate to the inch. No guesswork, no climbing on your roof."
          />
          <Feature
            icon="💰"
            title="Transparent Pricing"
            description="See exactly what materials cost. No contractor markups or hidden fees."
          />
          <Feature
            icon="⚡"
            title="Fast Delivery"
            description="Most reports delivered within 24 hours. Email notification when ready."
          />
          <Feature
            icon="🏆"
            title="Qualified Leads"
            description="Connect with pre-screened roofers who compete for your business."
          />
        </div>
      ) : (
        <div className="space-y-6">
          <Feature
            icon="🆓"
            title="Completely Free"
            description="No payment required. Get instant ballpark estimates."
          />
          <Feature
            icon="🎯"
            title="Local Pricing"
            description="Costs adjusted for your region's labor and material rates."
          />
          <Feature
            icon="📊"
            title="Material Breakdown"
            description="See detailed list of every material needed for your project."
          />
          <Feature
            icon="⚙️"
            title="Customizable"
            description="Adjust pitch, stories, materials to match your exact needs."
          />
        </div>
      )}
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, location, rating }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-700 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-slate-500">{location}</p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-600">
          {answer}
        </div>
      )}
    </div>
  );
}
