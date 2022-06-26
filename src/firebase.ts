import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { FormEvent } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MUASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GithubProvider = new GithubAuthProvider();

const sinInWithGithub = async (e: FormEvent) => {
  try {
    e.preventDefault();
    const res = await signInWithPopup(auth, GithubProvider);
    return res;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};

const logout = () => {
  signOut(auth);
};
export { auth, logout, sinInWithGithub };
