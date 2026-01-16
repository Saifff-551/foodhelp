import React from 'react';
import { UserProfile } from '../../../services/authService';
import { Donation, DonationStatus } from '../../../types';
import { MapPin, Truck, CheckCircle, Package } from 'lucide-react';

interface RescuerHomeProps {
    currentUser: UserProfile;
    donations: Donation[];
    onAcceptMission: (id: string) => void;
    onVerifyPickup: (id: string) => void;
    onVerifyDelivery: (id: string) => void;
}

const RescuerHome: React.FC<RescuerHomeProps> = ({
    currentUser,
    donations,
    onAcceptMission,
    onVerifyPickup,
    onVerifyDelivery
}) => {
    // 1. Available Missions: Claimed by NGO, but no rescuer assigned yet
    const availableMissions = donations.filter(d =>
        d.status === DonationStatus.CLAIMED && !d.rescuerId
    );

    // 2. My Active Missions: Assigned to me, not yet delivered
    const myMissions = donations.filter(d =>
        d.rescuerId === currentUser.uid &&
        (d.status === DonationStatus.CLAIMED || d.status === DonationStatus.PICKED_UP)
    );

    return (
        <div className="space-y-8">
            {/* Header / Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-white/20 rounded-full">
                        <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">Rescuer Dashboard</h2>
                        <p className="text-blue-100">Ready to deliver hope?</p>
                    </div>
                </div>
            </div>

            {/* SECTION 1: MY ACTIVE MISSIONS */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    My Active Missions
                </h3>

                {myMissions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myMissions.map(mission => (
                            <div key={mission.id} className="bg-white border border-blue-100 ring-2 ring-blue-50 rounded-xl overflow-hidden shadow-md">
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-lg font-bold text-gray-900">{mission.items[0].title}</h4>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${mission.status === DonationStatus.PICKED_UP
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {mission.status === DonationStatus.PICKED_UP ? 'In Transit' : 'To Pickup'}
                                        </span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-start gap-3 text-sm">
                                            <div className="w-1 h-full bg-gray-200 rounded-full mx-1 relative">
                                                <div className="absolute top-0 w-3 h-3 bg-green-500 rounded-full -left-1"></div>
                                                <div className="absolute bottom-0 w-3 h-3 bg-red-500 rounded-full -left-1"></div>
                                            </div>
                                            <div className="space-y-4 w-full">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Pickup From</p>
                                                    <p className="font-medium text-gray-800">{mission.donorName}</p>
                                                    <p className="text-xs text-gray-500">{mission.location.address}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Deliver To</p>
                                                    <p className="font-medium text-gray-800">{mission.recipientName || "Unknown NGO"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {mission.status === DonationStatus.CLAIMED && (
                                        <button
                                            onClick={() => onVerifyPickup(mission.id)}
                                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                                        >
                                            Confirm Pickup
                                        </button>
                                    )}

                                    {mission.status === DonationStatus.PICKED_UP && (
                                        <button
                                            onClick={() => onVerifyDelivery(mission.id)}
                                            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
                                        >
                                            Confirm Delivery
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
                        <p className="text-blue-800 font-medium">No active missions. Pick one from below!</p>
                    </div>
                )}
            </div>

            {/* SECTION 2: AVAILABLE MISSIONS */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    Available Missions Nearby
                </h3>

                {availableMissions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableMissions.map(mission => (
                            <div key={mission.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900">{mission.items[0].title}</h4>
                                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
                                        {mission.distanceKm} km
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{mission.location.address}</p>

                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                                    <span>From: {mission.donorName}</span>
                                    <span>To: {mission.recipientName}</span>
                                </div>

                                <button
                                    onClick={() => onAcceptMission(mission.id)}
                                    className="w-full py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    Accept Mission
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                        <p>No new missions available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RescuerHome;
