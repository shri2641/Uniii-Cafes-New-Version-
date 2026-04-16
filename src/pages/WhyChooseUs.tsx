import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const WhyChooseUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Utensils className="w-8 h-8 text-green-600 dark:text-green-500" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
                Uni Cafes
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-900 dark:from-blue-400 dark:to-blue-200">
          Why Choose Uni Cafes?
        </h1>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Quality & Variety */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quality & Variety</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from a diverse range of cuisines across multiple outlets. All our food is prepared 
              with fresh ingredients and strict quality control.
            </p>
          </div>

          {/* Convenience */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ultimate Convenience</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pre-order your meals, skip the queues, and get your food delivered to your preferred campus location.
            </p>
          </div>

          {/* Student-Friendly Pricing */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Student-Friendly Pricing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enjoy special student discounts, meal plans, and exclusive deals. Save more with our loyalty program.
            </p>
          </div>

          {/* Smart Recommendations */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Smart Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized food suggestions based on your preferences and schedule. Never miss out on your favorite meals.
            </p>
          </div>

          {/* Multiple Payment Options */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Flexible Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pay with your student meal plan, campus card, UPI, or any major credit/debit card. Hassle-free transactions.
            </p>
          </div>

          {/* Hygiene & Safety */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Hygiene & Safety</h3>
            <p className="text-gray-600 dark:text-gray-400">
              All our outlets maintain the highest standards of cleanliness and food safety. Regular quality checks ensured.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 rounded-2xl p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-blue-100 dark:text-blue-200">Campus Outlets</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">170+</div>
              <div className="text-blue-100 dark:text-blue-200">Daily Orders</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8</div>
              <div className="text-blue-100 dark:text-blue-200">Average Rating</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8 mt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 Uni Cafes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WhyChooseUs; 