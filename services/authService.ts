import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User as FirebaseUser,
    onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserRole } from "../types";

const provider = new GoogleAuthProvider();

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    role: UserRole;
    photoURL: string | null;
}

export const signInWithGoogle = async (): Promise<UserProfile | null> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = UserRole.DONOR; // Default role

        if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
        } else {
            // Create new user profile with default role
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: UserRole.DONOR, // Default to DONOR, user can change later in settings if implemented
                createdAt: new Date().toISOString()
            });
        }

        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            role
        };

    } catch (error) {
        console.error("Error signing in with Google", error);
        return null;
    }
};

export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out", error);
    }
};

export const subscribeToAuthChanges = (callback: (user: UserProfile | null) => void) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            const userDocRef = doc(db, "users", firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            const role = userDoc.exists() ? (userDoc.data().role as UserRole) : UserRole.DONOR;

            callback({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role
            });
        } else {
            callback(null);
        }
    });
};
