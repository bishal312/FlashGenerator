import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-gray-900/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="flex items-center gap-8">
          <button className="text-white hover:-translate-x-1 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L2 7l8 5 8-5-8-5zM2 17l8 5 8-5M2 12l8 5 8-5" />
            </svg>
          </div>

          <ul className="flex gap-8">
            <li><Link href="/" className="text-white hover:text-teal-400 transition-colors font-medium">Home</Link></li>
            <li><Link href="/faqs" className="text-white hover:text-teal-400 transition-colors font-medium">Faqs</Link></li>
            <li><Link href="/how-works" className="text-white hover:text-teal-400 transition-colors font-medium">How Works</Link></li>
          </ul>
        </div>

        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Greeting */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            Hello, Mitra.exe
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-400">Your last activity updated 5 mins ago</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-gray-300 font-medium">Amount</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">$0</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-gray-300 font-medium">Amount</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">$0</p>
          </div>
        </div>

        {/* View Order History */}
        <button className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all mb-8 flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-medium">View Your Order History</span>
          </div>
          <svg className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Order Details Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Your Order Details</h2>
            <Link href="/see-all" className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium">
              See all
            </Link>
          </div>

          <div className="space-y-4">
            {/* Expandable Cards */}
            <button className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-white font-medium">HOW WORK FLASH GENERATOR:</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white font-medium">OUR FLASH SUPPORTED PLATFORM:</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-white font-medium">WARNING:</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-medium">COMMON FAQS:</span>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Start New Order Button */}
        <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center gap-2 group">
          <span>Start new Order</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;