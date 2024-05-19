import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { IDeposit } from '../models/depositTransaction';

// Get a Firestore instance
const db = getFirestore();

// Collection reference
const depositCollection = collection(db, 'deposits');

// Function to add a deposit transaction to Firestore
export const addDeposit = async (deposit: IDeposit) => {
  try {
    const docRef = await addDoc(depositCollection, deposit);
    console.log('Deposit transaction added with ID: ', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding deposit transaction: ', error);
    throw error;
  }
};

// Function to get all deposit transactions from Firestore
export const getAlldeposits = async (): Promise<IDeposit[]> => {
  const querySnapshot = await getDocs(depositCollection);
  const deposits: IDeposit[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const deposit: IDeposit = {
        id: doc.id,
      amount: data.amount,
      identificationNumber: data.identificationNumber,
      date: data.date,
      transaction: data.transaction
    };
    deposits.push(deposit);
  });
  return deposits;
};

// Function to get a deposit transaction by ID from Firestore
export const getdepositById = async (depositId: string): Promise<IDeposit | null> => {
  const depositDoc = doc(depositCollection, depositId);
  try {
    const docSnap = await getDoc(depositDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const deposit: IDeposit = {
        id: docSnap.id,
        amount: data.amount,
        identificationNumber: data.identificationNumber,
        date: data.date,
        transaction: data.transaction
      };
      return deposit;
    } else {
      console.log('No such deposit transaction document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting deposit transaction: ', error);
    throw error;
  }
};

// Function to update a deposit transaction in Firestore
export const updateDeposit = async (depositId: string, newData: Partial<IDeposit>) => {
  const depositDoc = doc(depositCollection, depositId);
  try {
    await updateDoc(depositDoc, newData);
    console.log('deposit transaction updated successfully');
  } catch (error) {
    console.error('Error updating deposit transaction: ', error);
    throw error;
  }
};

// Function to delete a deposit transaction from Firestore
export const deleteDeposit = async (depositId: string) => {
  const depositDoc = doc(depositCollection, depositId);
  try {
    await deleteDoc(depositDoc);
    console.log('deposit transaction deleted successfully');
  } catch (error) {
    console.error('Error deleting deposit transaction: ', error);
    throw error;
  }
};
