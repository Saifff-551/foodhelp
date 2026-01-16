import React from 'react';
import { UserProfile } from '../../../services/authService';
import { Donation, DonationStatus } from '../../../types';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

interface RecipientHomeProps {
    currentUser: UserProfile;
    donations: Donation[];
    onClaimClick: (id: string) => void;
}

const RecipientHome: React.FC<RecipientHomeProps> = ({ currentUser, donations, onClaimClick }) => {
    // Show only AVAILABLE donations
    const availableDonations = donations.filter(d => d.status === DonationStatus.AVAILABLE);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Welcome, {currentUser.displayName}!</h2>
                <p className="text-orange-100 text-lg">There are {availableDonations.length} donations available for pickup nearby.</p>
            </div>

            {/* Donation Grid */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Available for Claiming</h3>

                {availableDonations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableDonations.map(donation => (
                            <div key={donation.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={donation.items[0].imageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80'}
                                        alt={donation.items[0].title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        Expires in 2h
                                    </div>
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                        {donation.distanceKm ? `${donation.distanceKm} km away` : 'Nearby'}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="mb-4">
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">{donation.items[0].title}</h4>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                                            <MapPin className="w-4 h-4" />
                                            <span>{donation.location.address}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Quantity</span>
                                            <span className="font-semibold">{donation.items[0].quantity}</span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">Donor</span>
                                            <span className="font-semibold">Restaurant Name</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onClaimClick(donation.id)}
                                        className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        Claim Donation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No donations available right now</h3>
                        <p className="text-gray-500">Check back later! New donations are posted frequently.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipientHome;
