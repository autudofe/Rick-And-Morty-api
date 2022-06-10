import {initializeApp} from "firebase/app";
import {
    getAuth,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    addToLocalStorage,
    deleteFromLocalStorage,
} from "../helpers/storageServices/storageServices";
import {localStorageKeys} from "../constants";

const firebaseConfig = {
    apiKey: "AIzaSyBpQg4yLK905nRrqV4DMhYywza1c7_RHFI",
    authDomain: "rick-and-morty-2fbbd.firebaseapp.com",
    projectId: "rick-and-morty-2fbbd",
    storageBucket: "rick-and-morty-2fbbd.appspot.com",
    messagingSenderId: "690354165437",
    appId: "1:690354165437:web:b012daef8dd9910d6489d4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const providerFacebook = new FacebookAuthProvider();

export const signInWithProvider = (providerFacebook, setUser) => () => {
    signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = {
                name: result.user.displayName,
                img: result.user.photoURL,
            };
            setUser(user);
            addToLocalStorage(localStorageKeys.user, user);
        })
        .catch((error) => {
            /*console.log(error)*/
        });
};

export const signOutWithProvider = (setUser) => {
    signOut(auth)
        .then(() => {
            deleteFromLocalStorage(localStorageKeys.user);
            setUser(null);
            window.location = "/signIn";
        })
        .catch((error) => {
            /*console.log(error)*/
        });
};