import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCjjQrHI2z-R-jVW5KGc-XoHW4S0-D04V8",
  authDomain: "colo-gj-dev-info-2024.firebaseapp.com",
  databaseURL: "https://colo-gj-dev-info-2024-default-rtdb.firebaseio.com",
  projectId: "colo-gj-dev-info-2024",
  storageBucket: "colo-gj-dev-info-2024.appspot.com",
  messagingSenderId: "38289268537",
  appId: "1:38289268537:web:8472a2600a8be97ea212e8",
  measurementId: "G-11DHZRKGQW"
};

const app = initializeApp(firebaseConfig);

export { app };


