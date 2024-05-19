import { makeAutoObservable } from "mobx";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";


class AuthStore {
  isAuthenticated: boolean = false;
  currentUserUid: string | null = null;

  constructor() {
    makeAutoObservable(this);
    const savedAuthState = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = savedAuthState ? JSON.parse(savedAuthState) : false;
  }

  async login(email: string, password: string) {
    try {
      // Authenticate the user using Firebase Authentication
     const userCredential= await signInWithEmailAndPassword(auth, email, password);
      this.isAuthenticated = true;
      const uid = userCredential.user.uid;
      // Save the UID in the currentUserUid property
      this.currentUserUid = uid;

      localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
}

const authStore = new AuthStore();
export default authStore;
