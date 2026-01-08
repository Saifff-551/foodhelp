import React from 'react';
import { Utensils, Heart, Bike, ArrowRight, ShieldCheck, Globe, Activity } from 'lucide-react';
import { UserRole } from '../types';

interface LandingPageProps {
  onLogin: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
           <div className="bg-emerald-100 p-2 rounded-lg">
             <Utensils className="w-6 h-6 text-emerald-600" />
           </div>
           <span className="text-xl font-bold text-gray-900 tracking-tight">FoodRescue.ai</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
           <button className="hover:text-emerald-600 transition-colors">How it works</button>
           <button className="hover:text-emerald-600 transition-colors">Impact Reports</button>
           <button className="hover:text-emerald-600 transition-colors">Partner with us</button>
        </div>
        <button 
          onClick={() => onLogin(UserRole.ADMIN)}
          className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Admin Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Globe className="w-4 h-4" /> Live in Bangalore & Mumbai
           </div>
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
             Turn Surplus Food into <br className="hidden md:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Social Impact.</span>
           </h1>
           <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
             The hyperlocal logistics platform connecting restaurants with surplus food to nearby shelters and NGOs instantly. Zero waste. Zero hunger.
           </p>

           {/* Role Cards */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              
              {/* Donor Card */}
              <button 
                onClick={() => onLogin(UserRole.DONOR)}
                className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-emerald-500 hover:shadow-emerald-100 transition-all cursor-pointer text-left overflow-hidden flex flex-col h-full"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Utensils className="w-32 h-32 text-emerald-600 transform translate-x-8 -translate-y-8" />
                 </div>
                 <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Utensils className="w-7 h-7 text-emerald-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Restaurants</h3>
                 <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                   For Restaurants, Hotels, Caterers, and Supermarkets wanting to reduce waste and gain tax benefits.
                 </p>
                 <div className="mt-auto flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-4 py-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    Donate Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </div>
              </button>

              {/* Recipient Card */}
              <button 
                onClick={() => onLogin(UserRole.RECIPIENT)}
                className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-orange-500 hover:shadow-orange-100 transition-all cursor-pointer text-left overflow-hidden flex flex-col h-full"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Heart className="w-32 h-32 text-orange-600 transform translate-x-8 -translate-y-8" />
                 </div>
                 <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-7 h-7 text-orange-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">NGOs</h3>
                 <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                   For NGOs, Shelters, Orphanages, and Community Fridges to claim fresh, safe meals instantly.
                 </p>
                 <div className="mt-auto flex items-center text-orange-600 font-bold text-sm bg-orange-50 w-fit px-4 py-2 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    Find Food <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </div>
              </button>

              {/* Rescuer Card */}
              <button 
                onClick={() => onLogin(UserRole.RESCUER)}
                className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-blue-500 hover:shadow-blue-100 transition-all cursor-pointer text-left overflow-hidden flex flex-col h-full"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Bike className="w-32 h-32 text-blue-600 transform translate-x-8 -translate-y-8" />
                 </div>
                 <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Bike className="w-7 h-7 text-blue-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Volunteers</h3>
                 <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                   For Volunteers and Gig-economy drivers to facilitate transport and earn impact points.
                 </p>
                 <div className="mt-auto flex items-center text-blue-600 font-bold text-sm bg-blue-50 w-fit px-4 py-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Start Rescuing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </div>
              </button>

           </div>
           
           <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 opacity-60">
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><ShieldCheck className="w-5 h-5" /> Safety First</div>
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><Activity className="w-5 h-5" /> Real-time Tracking</div>
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest"><Globe className="w-5 h-5" /> FSSAI Compliant</div>
           </div>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        © 2024 FoodRescue.ai. Built for social good.
      </footer>
    </div>
  );
};

export default LandingPage;