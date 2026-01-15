import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User as FirebaseUser,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

export const signUpWithEmailAndPassword = async (email: string, password: string, name: string, role: UserRole): Promise<UserProfile | null> => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: null, // No photo for email/password signup initially
            role: role,
            createdAt: new Date().toISOString()
        });

        return {
            uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: null,
            role
        };
    } catch (error) {
        console.error("Error signing up with email/password", error);
        throw error;
    }
};

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserProfile | null> => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Fetch role from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = UserRole.DONOR;
        if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
        }

        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'User',
            photoURL: user.photoURL,
            role
        };
    } catch (error) {
        console.error("Error signing in with email/password", error);
        throw error;
    }
}

export const signInWithGoogle = async (desiredRole?: UserRole): Promise<UserProfile | null> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        let role = desiredRole || UserRole.DONOR; // Default role if not provided

        if (userDoc.exists()) {
            role = userDoc.data().role as UserRole;
        } else {
            // Create new user profile with selected role or default
            await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: role,
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
                displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || null,
                photoURL: firebaseUser.photoURL,
                role
            });
        } else {
            callback(null);
        }
    });
};
