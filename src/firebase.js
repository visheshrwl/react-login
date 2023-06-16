import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD3ejXJk-0rz7BPHZ1TvEohCkV5rZvpJk4",
  authDomain: "drugsellingplatformdatabase.firebaseapp.com",
  projectId: "drugsellingplatformdatabase",
  storageBucket: "drugsellingplatformdatabase.appspot.com",
  messagingSenderId: "547135969753",
  appId: "1:547135969753:web:d226da97de4f73d28d61c8",
  measurementId: "G-VN865Q7C7N"
};

const app = initializeApp(firebaseConfig);

const auth= getAuth();

export { app, auth };
