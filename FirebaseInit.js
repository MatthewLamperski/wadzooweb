import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB5UoruQ6OdfX0wRYoiDkmktAqpUzJNN08",
  authDomain: "wadzurealty.firebaseapp.com",
  projectId: "wadzurealty",
  storageBucket: "wadzurealty.appspot.com",
  messagingSenderId: "249866952480",
  appId: "1:249866952480:web:a17a545a76b941a4ad8145",
  measurementId: "G-VBYF7VTE9G"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
