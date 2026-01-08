import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { IMPACT_STATS } from '../constants';
import { TrendingUp, Leaf, DollarSign } from 'lucide-react';

const ImpactStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Meals</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">3,450</p>
          <p className="text-sm text-gray-500 mt-1">Saved this year</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">CO2</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">8.2t</p>
          <p className="text-sm text-gray-500 mt-1">Emissions prevented</p>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">Value</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">$12k</p>
          <p className="text-sm text-gray-500 mt-1">Food value rescued</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Impact (Meals Saved)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={IMPACT_STATS} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#6B7280'}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#6B7280'}} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                cursor={{fill: '#F3F4F6'}}
              />
              <Bar dataKey="meals" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {IMPACT_STATS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === IMPACT_STATS.length - 1 ? '#10B981' : '#A7F3D0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;