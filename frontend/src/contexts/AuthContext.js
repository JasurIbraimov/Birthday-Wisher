import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";

import auth from "../firebase.js";


const AuthContext = createContext();



export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const value = {
        currentUser,
        register,
        login,
        error, 
        setError,
        logout,
        message,
        setMessage,
        updateUserProfile
    };
    
    async function register(email, password, birthday, username) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        const uid = await user.getIdToken()
        const token = user && uid;
        const userData = {
            birthday, 
            email, 
            username, 
            uid: user.uid
        }
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post("http://127.0.0.1:8000/birthday", userData, payloadHeader)
        return user
    }
    
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth)
    }

    function updateUserProfile(user, profile) {
        return updateProfile(user, profile)
    }   

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
