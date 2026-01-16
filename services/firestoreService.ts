import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { Donation, DonationStatus, RestaurantProfile, NGOProfile, UserRole } from "../types";
import { updateUserRole } from "./authService";

export const subscribeToDonations = (callback: (donations: Donation[]) => void) => {
    if (!db) {
        console.warn("Firestore not initialized");
        callback([]);
        return () => { };
    }
    const q = query(collection(db, "donations"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (snapshot) => {
        const donations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Donation[];

        callback(donations);
    });
};

export const addDonation = async (donation: Omit<Donation, "id">) => {
    try {
        await addDoc(collection(db, "donations"), donation);
    } catch (error) {
        console.error("Error adding donation: ", error);
        throw error;
    }
};

export const updateDonationStatus = async (
    donationId: string,
    status: DonationStatus,
    updates: Partial<Donation> = {}
) => {
    try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
            status,
            ...updates
        });
    } catch (error) {
        console.error("Error updating donation status: ", error);
        throw error;
    }
};

export const registerRestaurant = async (profileData: Omit<RestaurantProfile, "isVerified" | "createdAt">) => {
    try {
        await setDoc(doc(db, "restaurants", profileData.userId), {
            ...profileData,
            isVerified: false,
            createdAt: new Date().toISOString()
        });

        // Update user role
        await updateUserRole(profileData.userId, UserRole.DONOR);
    } catch (error) {
        console.error("Error registering restaurant: ", error);
        throw error;
    }
};

export const registerNGO = async (profileData: Omit<NGOProfile, "isVerified" | "createdAt">) => {
    try {
        await setDoc(doc(db, "ngos", profileData.userId), {
            ...profileData,
            isVerified: false,
            createdAt: new Date().toISOString()
        });

        await updateUserRole(profileData.userId, UserRole.RECIPIENT);
    } catch (error) {
        console.error("Error registering NGO: ", error);
        throw error;
    }
};

export const deleteDonation = async (donationId: string) => {
    try {
        await deleteDoc(doc(db, "donations", donationId));
    } catch (error) {
        console.error("Error deleting donation: ", error);
        throw error;
    }
};

export const claimDonation = async (donationId: string, recipientId: string, recipientName: string) => {
    try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
            status: DonationStatus.CLAIMED,
            recipientId,
            recipientName,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error claiming donation: ", error);
        throw error;
    }
};

export const acceptMission = async (donationId: string, rescuerId: string, rescuerName: string) => {
    try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
            rescuerId,
            rescuerName,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error accepting mission: ", error);
        throw error;
    }
};

export const verifyPickup = async (donationId: string) => {
    try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
            status: DonationStatus.PICKED_UP,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error verifying pickup: ", error);
        throw error;
    }
};

export const verifyDelivery = async (donationId: string) => {
    try {
        const donationRef = doc(db, "donations", donationId);
        await updateDoc(donationRef, {
            status: DonationStatus.DELIVERED,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error verifying delivery: ", error);
        throw error;
    }
};

export const fetchAllPendingVerifications = async () => {
    try {
        const restaurantsQuery = query(collection(db, "restaurants"), orderBy("createdAt", "desc"));
        const ngosQuery = query(collection(db, "ngos"), orderBy("createdAt", "desc"));

        const [restaurantSnap, ngoSnap] = await Promise.all([
            getDocs(restaurantsQuery),
            getDocs(ngosQuery)
        ]);

        const pendingRestaurants = restaurantSnap.docs
            .map(doc => ({ id: doc.id, type: 'restaurant', ...doc.data() } as any))
            .filter(r => !r.isVerified);

        const pendingNGOs = ngoSnap.docs
            .map(doc => ({ id: doc.id, type: 'ngo', ...doc.data() } as any))
            .filter(n => !n.isVerified);

        return [...pendingRestaurants, ...pendingNGOs];
    } catch (error) {
        console.error("Error fetching pending verifications: ", error);
        throw error;
    }
};

export const verifyEntity = async (collectionName: 'restaurants' | 'ngos', docId: string) => {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            isVerified: true
        });
    } catch (error) {
        console.error("Error verifying entity: ", error);
        throw error;
    }
};
