import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { IWithdrawal } from '../models/withdrawalTransaction';

// Get a Firestore instance
const db = getFirestore();

// Collection reference
const withdrawalsCollection = collection(db, 'withdrawals');

// Function to add a withdrawal transaction to Firestore
export const addWithdrawal = async (withdrawal: IWithdrawal) => {
  try {
    const docRef = await addDoc(withdrawalsCollection, withdrawal);
    console.log('Withdrawal transaction added with ID: ', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding withdrawal transaction: ', error);
    throw error;
  }
};

// Function to get all withdrawal transactions from Firestore
export const getAllWithdrawals = async (): Promise<IWithdrawal[]> => {
  const querySnapshot = await getDocs(withdrawalsCollection);
  const withdrawals: IWithdrawal[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const withdrawal: IWithdrawal = {
      id: doc.id,
      amount: data.amount,
      identificationNumber: data.identificationNumber,
      categoryName: data.categoryName,
      date: data.date,
      transaction: data.transaction
    };
    withdrawals.push(withdrawal);
  });
  return withdrawals;
};

// Function to get a withdrawal transaction by ID from Firestore
export const getWithdrawalById = async (withdrawalId: string): Promise<IWithdrawal | null> => {
  const withdrawalDoc = doc(withdrawalsCollection, withdrawalId);
  try {
    const docSnap = await getDoc(withdrawalDoc);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const withdrawal: IWithdrawal = {
        id: docSnap.id,
        amount: data.amount,
        identificationNumber: data.identificationNumber,
        categoryName: data.categoryName,
        date: data.date,
        transaction: data.transaction
      };
      return withdrawal;
    } else {
      console.log('No such withdrawal transaction document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting withdrawal transaction: ', error);
    throw error;
  }
};

// Function to update a withdrawal transaction in Firestore
export const updateWithdrawal = async (withdrawalId: string, newData: Partial<IWithdrawal>) => {
  const withdrawalDoc = doc(withdrawalsCollection, withdrawalId);
  try {
    await updateDoc(withdrawalDoc, newData);
    console.log('Withdrawal transaction updated successfully');
  } catch (error) {
    console.error('Error updating withdrawal transaction: ', error);
    throw error;
  }
};

// Function to delete a withdrawal transaction from Firestore
export const deleteWithdrawal = async (withdrawalId: string) => {
  const withdrawalDoc = doc(withdrawalsCollection, withdrawalId);
  try {
    await deleteDoc(withdrawalDoc);
    console.log('Withdrawal transaction deleted successfully');
  } catch (error) {
    console.error('Error deleting withdrawal transaction: ', error);
    throw error;
  }
};
