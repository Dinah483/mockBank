// src/api/userApi.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { IUser } from '../models/user';
import { auth, firestore } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { IAccount } from '../models/account';
import { addAccount } from './accountApi';


export const signUp = async (email:string, password:string,user:IUser,account:IAccount) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    user.id = uid;
    account.id = uid;
    await setDoc(doc(firestore, 'users', uid), user);
    await addAccount(account);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (email:string, password:string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
