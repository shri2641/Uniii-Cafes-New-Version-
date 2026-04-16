import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Github, Download, Handshake } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const AboutUs: React.FC = () => {
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
          About Us
        </h1>

        {/* Our Story Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-300">Our Story</h2>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              It all started with a soggy sandwich and a watered-down cold coffee.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              That 30-minute wait cost them more than a meal—it cost them valuable study time.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              Over a disappointing sip of coffee, Nitya muttered, "Why can't we just order ahead?" 
              Shrishti raised an eyebrow—then grinned. "Why not?"
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              That week, Shrishti put her usual assignments on hold and turned her hostel room into a 
              brainstorming hub. She mapped out campus cafes, interviewed 50+ students about their 
              biggest food frustrations ("Prices change every day!", "I never know what's actually good!"), 
              and coded a bare-bones app during late-night sessions fueled by instant noodles.
            </p>
          </div>
        </section>

        {/* The Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-300">The Team</h2>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a student-turned-founder who's lived the chaos we're solving. From coding 
              all-nighters to negotiating with canteen owners, I've built Uni Cafes with grit, 
              caffeine, and a shared belief that no student should choose between food and time.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4">Meet the face behind the app:</h3>
              <div className="flex items-center space-x-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 p-4 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">Shrishti (Founder)</h4>
                  <p className="text-gray-600 dark:text-gray-400">Tech wizard who can debug code faster than you can say "burger".</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-300">Our Vision</h2>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              We're not just building an app—we're redefining campus life. By 2030, we aim to:
            </p>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3"></span>
                Partner with 100+ colleges
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3"></span>
                Reduce student wait times by 70%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3"></span>
                Become the go-to platform for hassle-free campus dining
              </li>
            </ul>
          </div>
        </section>

        {/* Join the Movement Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-blue-900 dark:text-blue-300">Join the Movement</h2>
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
              Whether you're a student, canteen owner, or fellow innovator, help us make campus dining better.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 p-6 rounded-xl transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <Download className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Students</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Download the app and #SkipTheQueue.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors shadow-sm">
                  Get the App
                </button>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 p-6 rounded-xl transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <Handshake className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Canteens</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Partner with us to grow your reach</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm">
                  Partner Up
                </button>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 p-6 rounded-xl transition-transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <Github className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Builders</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Check our GitHub for open-source tools.</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors shadow-sm">
                  View GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
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

export default AboutUs; 