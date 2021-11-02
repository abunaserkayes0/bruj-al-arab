import initializationAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged } from 'firebase/auth';
import { useState } from "react";
import { useEffect } from "react";

initializationAuthentication();

const auth = getAuth();
const googleProvider = new GoogleAuthProvider()

const useFirebase = () => {
    const [users, setUsers] = useState({});
    const [error, setError] = useState('');

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            setUsers(user);
        }).catch(error => {
            setError(error.message);
        })
    }
    const logOut = () => {
        signOut(auth)
        .then(() => {
        setUsers({});
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUsers(user);
            }
        })
    }, [])

    return {
        users,
        error,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;