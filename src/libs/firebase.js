import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVHQlXqOx0WiprvjXzUoUBLKq1U3ZWvZI",
  authDomain: "imagegallery-1b298.firebaseapp.com",
  projectId: "imagegallery-1b298",
  storageBucket: "imagegallery-1b298.appspot.com",
  messagingSenderId: "932000351613",
  appId: "1:932000351613:web:3524dd01e1f53e02bcb814"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);