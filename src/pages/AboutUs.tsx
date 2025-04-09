import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Github, Download, Handshake } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Utensils className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                Campus Crave
              </h1>
            </Link>
            <Link
              to="/"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-900">
          About Us
        </h1>

        {/* Our Story Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Our Story</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              It all started with a soggy sandwich and a watered-down cold coffee.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              That 30-minute wait cost them more than a meal—it cost them valuable study time.
            </p>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Over a disappointing sip of coffee, Anurag muttered, "Why can't we just order ahead?" 
              Shrishti sighed, "And maybe even know what's actually good before we waste our money?" 
              Nitya raised an eyebrow—then grinned. "Why not?"
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              That week, Nitya put her usual assignments on hold and turned her hostel room into a 
              brainstorming hub. She mapped out campus cafes, interviewed 50+ students about their 
              biggest food frustrations ("Prices change every day!", "I never know what's actually good!"), 
              and coded a bare-bones app during late-night sessions fueled by instant noodles.
            </p>
          </div>
        </section>

        {/* The Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">The Team</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              I'm a students-turned-founders who've lived the chaos we're solving. From coding 
              all-nighters to negotiating with canteen owners, I've built Campus Crave with grit, 
              caffeine, and a shared belief that no student should choose between food and time.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Meet the face behind the app:</h3>
              <div className="flex items-center space-x-4 bg-blue-50 p-4 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-900">Nitya (Founder)</h4>
                  <p className="text-gray-600">Tech wizard who can debug code faster than you can say "burger".</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Our Vision</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              We're not just building an app—we're redefining campus life. By 2030, we aim to:
            </p>
            <ul className="space-y-4 text-gray-600 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Partner with 100+ colleges
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Reduce student wait times by 70%
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Become the go-to platform for hassle-free campus dining
              </li>
            </ul>
          </div>
        </section>

        {/* Join the Movement Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-blue-900">Join the Movement</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Whether you're a student, canteen owner, or fellow innovator, help us make campus dining better.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Download className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Students</h3>
                </div>
                <p className="text-gray-600 mb-4">Download the app and #SkipTheQueue.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Get the App
                </button>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Handshake className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">Canteens</h3>
                </div>
                <p className="text-gray-600 mb-4">Partner with us to grow your reach</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Partner Up
                </button>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Github className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800">Builders</h3>
                </div>
                <p className="text-gray-600 mb-4">Check our GitHub for open-source tools.</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  View GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Campus Crave. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs; 