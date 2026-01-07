import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { CreditCard, UserCheck } from 'lucide-react'; // Swapped UserStar for UserCheck for better meaning

const MarketplaceFeatures = () => {
  return (
    <section className="py-16 px-6 bg-base-200 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
       <h3 className="text-3xl m-5 text-center font-bold ">
      marketplace <span className="text-violet-500"> Features</span>
    </h3>
          <div className="h-1.5 w-24 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: 24/7 Uptime */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 text-center">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MdOutlineTimer className="text-5xl text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">24/7 Uptime</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Always online to serve your needs anytime, anywhere. Experience zero downtime.
            </p>
          </div>

          {/* Card 2: Secure Payments */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <CreditCard size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">Secure Payments</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Encrypted transactions to keep your data and money safe with multi-layer protection.
            </p>
          </div>

          {/* Card 3: Verified Experts */}
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 text-center">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <UserCheck size={40} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">Verified Experts</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Every freelancer is manually verified for quality, skills, and professional trustworthiness.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MarketplaceFeatures;