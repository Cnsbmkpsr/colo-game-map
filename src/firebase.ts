import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvGtmiaB04Z13AVQjdFSaipdMXFQ83D90",
  authDomain: "map-colo.firebaseapp.com",
  databaseURL:
    "https://map-colo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "map-colo",
  storageBucket: "map-colo.firebasestorage.app",
  messagingSenderId: "476747010524",
  appId: "1:476747010524:web:1bf7b6c53c4518e56dbf19",
  measurementId: "G-PEX36NNNEX",
};

const app = initializeApp(firebaseConfig);

export { app };
