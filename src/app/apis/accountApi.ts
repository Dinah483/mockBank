import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, setDoc } from 'firebase/firestore';
import { IAccount } from '../models/account';
import { auth } from '../../firebaseConfig'; // Assuming you have initialized Firebase authentication

// Get a Firestore instance
const db = getFirestore();

// Collection reference
const accountsCollection = collection(db, 'accounts');

// Function to add an account to Firestore
export const addAccount = async (account: IAccount) => {
  try {
    await setDoc(doc(db, 'accounts', account.id), account);
    console.log('Account added with ID: ', account.id);
    return account.id; // Return the document ID
  } catch (error) {
    console.error('Error adding account: ', error);
    throw error;
  }
};
// Function to get all accounts from Firestore
export const getAllAccounts = async (): Promise<IAccount[]> => {
    const querySnapshot = await getDocs(accountsCollection);
    const accounts: IAccount[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const account: IAccount = {
        id: data.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        balance: data.balance,
        identificationNumber: data.identificationNumber,
        accountNumber: data.accountNumber,
        branchCode: data.branchCode,
        bank: data.bank,
        paymentType: data.paymentType
      };
      accounts.push(account);
    });
    return accounts;
  };
  
  export const getAccountById = async (accountId: string): Promise<IAccount | null> => {
    try {
      // Create a query against the collection.
      const q = query(accountsCollection, where('id', '==', accountId));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
  
      // Assuming there's only one document with the given accountId
      const doc = querySnapshot.docs[0];
      const data = doc.data();
  
      const account: IAccount = {
        id: doc.id,
        email: data.email,
        name: data.name,
        surname: data.surname,
        balance: data.balance,
        identificationNumber: data.identificationNumber,
        accountNumber: data.accountNumber,
        branchCode: data.branchCode,
        bank: data.bank,
        paymentType: data.paymentType
      };
  
      return account;
  
    } catch (error) {
      console.error('Error getting account: ', error);
      throw error;
    }
  };
// Function to update an account in Firestore
export const updateAccount = async (accountId: string, newData: Partial<IAccount>) => {
  const accountDoc = doc(accountsCollection, accountId);
  try {
    await updateDoc(accountDoc, newData);
    console.log('Account updated successfully');
  } catch (error) {
    console.error('Error updating account: ', error);
    throw error;
  }
};

export const deleteAccount = async (accountId: string) => {
  const accountDoc = doc(accountsCollection, accountId);
  try {
    await deleteDoc(accountDoc);
    console.log('Account deleted successfully');
  } catch (error) {
    console.error('Error deleting account: ', error);
    throw error;
  }
};
