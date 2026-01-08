import React, { useState } from 'react';
import { Camera, CheckCircle, AlertTriangle, Loader2, UtensilsCrossed } from 'lucide-react';
import { analyzeFoodSafety, estimateImpact } from '../services/geminiService';
import { FoodItem, FoodCategory } from '../types';

import { UserProfile } from '../services/authService';
import { addDonation } from '../services/firestoreService';
import { DonationStatus } from '../types';

interface DonationFormProps {
  currentUser: UserProfile | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ currentUser, onSuccess, onCancel }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FoodCategory>('COOKED_MEAL');
  const [quantity, setQuantity] = useState('');
  const [preparedTime, setPreparedTime] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ score: number, reasoning: string } | null>(null);

  const handleAIAnalysis = async () => {
    if (!description || !preparedTime) return;
    setAnalyzing(true);
    const safety = await analyzeFoodSafety(description, preparedTime);
    setAnalysisResult(safety);
    setAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!analysisResult) await handleAIAnalysis();

    await estimateImpact(quantity);

    try {
      await addDonation({
        donorId: currentUser.uid,
        donorName: currentUser.displayName || 'Anonymous Donor',
        location: { lat: 0, lng: 0, address: 'Current Location' }, // In real app, get from Geolocation API
        status: DonationStatus.AVAILABLE,
        createdAt: new Date().toISOString(),
        distanceKm: 0.5, // Mock distance for now
        items: [{
          id: Math.random().toString(36).substr(2, 9),
          title: description.split(' ').slice(0, 4).join(' ') + (description.length > 30 ? "..." : ""),
          description,
          category,
          quantity,
          preparedTime,
          expiryTime: "TBD",
          isPerishable: category !== 'PACKAGED_GOODS',
          safetyScore: analysisResult?.score || 80,
          tags: [category.replace('_', ' '), 'Pending Verification'],
          imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`
        }]
      });

      onSuccess();
    } catch (error) {
      console.error("Failed to post donation", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 border border-emerald-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="bg-emerald-100 p-2 rounded-full">
          <UtensilsCrossed className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Log Surplus Food</h2>
          <p className="text-xs text-gray-500">Quickly list unserved items for pickup</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Item Description</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 placeholder-gray-400"
            placeholder="e.g., Leftover Wedding Buffet - Rice & Dal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as FoodCategory)}
            className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="COOKED_MEAL">Cooked Meal (Buffet/Menu)</option>
            <option value="BAKERY">Bakery (Bread/Pastry)</option>
            <option value="RAW_INGREDIENTS">Raw Ingredients (Veg/Fruit)</option>
            <option value="PACKAGED_GOODS">Packaged/Canned Goods</option>
            <option value="DAIRY_PRODUCE">Dairy/Produce</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="e.g., 5kg / 20 trays"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Prepared/Harvested?</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-200 rounded-lg"
              placeholder="e.g., 2 hours ago"
              value={preparedTime}
              onChange={(e) => setPreparedTime(e.target.value)}
              required
            />
          </div>
        </div>

        {/* AI Safety Check Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
              <span className="text-blue-600 font-bold">AI Safety Guard</span>
            </h3>
            {analyzing && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
          </div>

          {!analysisResult && !analyzing && (
            <button
              type="button"
              onClick={handleAIAnalysis}
              className="text-xs font-medium text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
            >
              Verify Edibility
            </button>
          )}

          {analysisResult && (
            <div className={`text-sm ${analysisResult.score > 70 ? 'text-emerald-700' : 'text-orange-700'}`}>
              <div className="flex items-center gap-2 font-bold">
                {analysisResult.score > 70 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                Safety Score: {analysisResult.score}/100
              </div>
              <p className="mt-1 text-xs opacity-90">{analysisResult.reasoning}</p>
            </div>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer transition-colors bg-gray-50">
          <Camera className="w-8 h-8 mb-2 text-gray-400" />
          <span className="text-sm font-medium">Add Photo Evidence</span>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onCancel} className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
          <button
            type="submit"
            className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-lg shadow-emerald-200/50 transition-all flex items-center justify-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Publish Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;