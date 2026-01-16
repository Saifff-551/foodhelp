import React, { useState, useEffect } from 'react';
import { subscribeToAuthChanges, updateUserRole, UserProfile } from '../../services/authService';
import { subscribeToDonations, updateDonationStatus, deleteDonation, claimDonation, acceptMission, verifyPickup, verifyDelivery } from '../../services/firestoreService';
import { UserRole, Donation, DonationStatus } from '../../types';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import OnboardingModal from '../components/dashboard/OnboardingModal';
import DonorHome from '../components/dashboard/DonorHome';
import RecipientHome from '../components/dashboard/RecipientHome';
import RescuerHome from '../components/dashboard/RescuerHome';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<Donation[]>([]);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const unsubscribe = subscribeToDonations((data) => {
                setDonations(data);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const handleRoleSelect = async (role: UserRole) => {
        if (user) {
            try {
                await updateUserRole(user.uid, role);
                // Optimistic update
                setUser({ ...user, role });
            } catch (error) {
                console.error("Failed to update role", error);
            }
        }
    };

    const handlePostClick = () => {
        navigate('/dashboard/post');
    };

    const handleClaimClick = async (id: string) => {
        if (!user) return;

        if (window.confirm("Are you sure you want to claim this donation? By claiming, you agree to pick it up within the expiration time.")) {
            try {
                await claimDonation(id, user.uid, user.displayName || 'Anonymous NGO');
                alert("Donation claimed successfully! Please coordinate pickup.");
            } catch (error) {
                console.error("Error claiming donation", error);
                alert("Failed to claim donation. It might have been taken.");
            }
        }
    };

    const handleDeleteClick = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                await deleteDonation(id);
            } catch (error) {
                console.error("Error deleting donation", error);
            }
        }
    };

    const handleAcceptMission = async (id: string) => {
        if (!user) return;
        try {
            await acceptMission(id, user.uid, user.displayName || 'Volunteer');
            alert("Mission accepted! Head to the pickup location.");
        } catch (error) {
            console.error("Error accepting mission", error);
        }
    };

    const handleVerifyPickup = async (id: string) => {
        if (window.confirm("Confirming you have picked up the food?")) {
            try {
                await verifyPickup(id);
            } catch (error) {
                console.error("Error verifying pickup", error);
            }
        }
    };

    const handleVerifyDelivery = async (id: string) => {
        if (window.confirm("Confirming food has been delivered to NGO?")) {
            try {
                await verifyDelivery(id);
                alert("Great work! Mission complete.");
            } catch (error) {
                console.error("Error verifying delivery", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null; // Protected route handles redirect using ProtectedRoute component
    }

    // Role-based rendering
    return (
        <DashboardLayout currentUser={user}>
            {user.role === UserRole.PENDING && (
                <OnboardingModal onSelectRole={handleRoleSelect} />
            )}

            {user.role === UserRole.DONOR && (
                <DonorHome
                    currentUser={user}
                    donations={donations}
                    onPostClick={handlePostClick}
                    onDeleteClick={handleDeleteClick}
                />
            )}

            {user.role === UserRole.RECIPIENT && (
                <RecipientHome
                    currentUser={user}
                    donations={donations}
                    onClaimClick={handleClaimClick}
                />
            )}

            {user.role === UserRole.RESCUER && (
                <RescuerHome
                    currentUser={user}
                    donations={donations}
                    onAcceptMission={handleAcceptMission}
                    onVerifyPickup={handleVerifyPickup}
                    onVerifyDelivery={handleVerifyDelivery}
                />
            )}

            {/* Fallback for ADMIN or unknown roles for now */}
            {user.role === UserRole.ADMIN && (
                <div className="text-center p-12">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <p>Under Construction</p>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
