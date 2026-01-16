import React, { useEffect, useState } from 'react';
import { fetchAllPendingVerifications, verifyEntity } from '../../../services/firestoreService';
import { UserProfile } from '../../../services/authService';
import { ShieldCheck, MapPin, ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
    currentUser: UserProfile;
}

interface PendingEntity {
    id: string;
    type: 'restaurant' | 'ngo';
    businessName?: string;
    organizationName?: string;
    contactPerson: string;
    fssaiLicense?: string;
    registrationNumber?: string;
    googleBusinessLink: string;
    address: string;
    createdAt: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
    const [pendingEntities, setPendingEntities] = useState<PendingEntity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingVerifications();
    }, []);

    const loadPendingVerifications = async () => {
        setLoading(true);
        try {
            const data = await fetchAllPendingVerifications();
            setPendingEntities(data);
        } catch (error) {
            console.error("Failed to load verifications", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (entity: PendingEntity) => {
        if (window.confirm(`Are you sure you want to verify ${entity.businessName || entity.organizationName}?`)) {
            try {
                await verifyEntity(entity.type === 'restaurant' ? 'restaurants' : 'ngos', entity.id);
                // Remove from local state
                setPendingEntities(prev => prev.filter(e => e.id !== entity.id));
                alert("Entity verified successfully!");
            } catch (error) {
                console.error("Verification failed", error);
                alert("Failed to verify entity.");
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-white/10 rounded-full">
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">Admin Panel</h2>
                        <p className="text-gray-400">Security & Verification Center</p>
                    </div>
                </div>
            </div>

            {/* Pending Verifications */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Pending Approvals ({pendingEntities.length})
                </h3>

                {loading ? (
                    <div className="text-center py-12">Loading...</div>
                ) : pendingEntities.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pendingEntities.map(entity => (
                            <div key={entity.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded-lg mb-2 ${entity.type === 'restaurant' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {entity.type === 'restaurant' ? 'RESTAURANT' : 'NGO'}
                                        </span>
                                        <h4 className="text-xl font-bold text-gray-900">
                                            {entity.businessName || entity.organizationName}
                                        </h4>
                                        <p className="text-sm text-gray-500">Contact: {entity.contactPerson}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-400">
                                        Applied: {new Date(entity.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
                                    {entity.fssaiLicense && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">FSSAI License:</span>
                                            <span className="font-mono font-medium">{entity.fssaiLicense}</span>
                                        </div>
                                    )}
                                    {entity.registrationNumber && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">NGO Reg No:</span>
                                            <span className="font-mono font-medium">{entity.registrationNumber}</span>
                                        </div>
                                    )}
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <span className="text-gray-600">{entity.address}</span>
                                    </div>

                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Google Maps Verification</p>
                                        <a
                                            href={entity.googleBusinessLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {entity.googleBusinessLink}
                                        </a>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        className="py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors flex items-center justify-center gap-2"
                                        onClick={() => alert("Rejection feature coming soon")}
                                    >
                                        <XCircle className="w-4 h-4" /> Reject
                                    </button>
                                    <button
                                        className="py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-md shadow-green-200 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => handleVerify(entity)}
                                    >
                                        <CheckCircle className="w-4 h-4" /> Verify & Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <ShieldCheck className="w-12 h-12 text-green-200 mx-auto mb-3" />
                        <h3 className="text-gray-900 font-medium">All Clean!</h3>
                        <p className="text-gray-500">No pending verifications at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
