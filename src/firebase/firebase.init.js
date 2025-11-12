// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmyX1CsjfvDSQc2q_ZEbm2oqZwh-GBo5Q",
  authDomain: "freelancing-marketplace-4682d.firebaseapp.com",
  projectId: "freelancing-marketplace-4682d",
  storageBucket: "freelancing-marketplace-4682d.firebasestorage.app",
  messagingSenderId: "641983812267",
  appId: "1:641983812267:web:1a688bcadcbb00aba15dee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)