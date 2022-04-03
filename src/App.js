import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { NativeBaseProvider, Text } from "native-base";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Routes/LandingPage";
import BugReport from "./Routes/BugReport";
import VerifyBadge from "./Routes/VerifyBadge";
import PrivacyPolicy from "./Routes/PrivacyPolicy";
import { appTheme } from "./Theme";
import NavBar from "./Components/NavBar";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import React, { useEffect, useState } from "react";
import Contact from "./Routes/Contact";
import Footer from "./Components/Footer";
import Beta from "./Routes/Beta";
import LinkNotFound from "./Routes/LinkNotFound";
import PortalAuth from "./Routes/PortalAuth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppContext } from "./AppContext";
import { toast, ToastContainer } from "react-toastify";
import Portal from "./Routes/Portal";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import LoadingScreen from "./Views/LoadingScreen";
import { getUserDoc } from "./FirebaseInterface";
import CreateListing from "./Views/DataEntryDashboard/CreateListing";
import ManageListings from "./Views/DataEntryDashboard/ManageListings";
import ListingView from "./Views/ListingView";
import Checkout from "./Routes/Checkout";
import BadgeStatus from "./Views/BadgeStatus";

const firebaseConfig = {
  apiKey: "AIzaSyB5UoruQ6OdfX0wRYoiDkmktAqpUzJNN08",
  authDomain: "wadzoo.com",
  projectId: "wadzurealty",
  storageBucket: "wadzurealty.appspot.com",
  messagingSenderId: "249866952480",
  appId: "1:249866952480:web:a17a545a76b941a4ad8145",
  measurementId: "G-VBYF7VTE9G",
};

const app = initializeApp(firebaseConfig);
export const secondaryApp = initializeApp(firebaseConfig, "secondary");
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

function App() {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const [FIRUser, setFIRUser] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const appContext = {
    FIRUser,
    setFIRUser,
    user,
    setUser,
    error,
    setError,
  };
  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        getUserDoc(authUser.uid)
          .then((userDoc) => {
            setUser(userDoc);
            setFIRUser(authUser);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser(null);
        setFIRUser(null);
      }
    });
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(
        <div style={{ flexDirection: "column", display: "flex" }}>
          <Text fontWeight={300}>{error.title}</Text>
          <Text>{error.message}</Text>
        </div>,
        {
          onClose: () => {
            setError(undefined);
          },
        }
      );
    }
  }, [error]);
  return (
    <AppContext.Provider value={appContext}>
      <ParallaxProvider>
        <NativeBaseProvider theme={appTheme}>
          <NavBar
            navbarTransparent={navbarTransparent}
            setNavbarTransparent={setNavbarTransparent}
          />
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/contact"
              element={<Contact setNavbarTransparent={setNavbarTransparent} />}
            />
            <Route
              path="/beta"
              element={<Beta setNavbarTransparent={setNavbarTransparent} />}
            />
            <Route
              path="/bugreport"
              element={
                <BugReport setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/verifybadge"
              element={
                <VerifyBadge setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/privacypolicy"
              element={
                <PrivacyPolicy setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/portal"
              element={
                FIRUser === null ? (
                  <PortalAuth setNavbarTransparent={setNavbarTransparent} />
                ) : FIRUser ? (
                  <Portal setNavbarTransparent={setNavbarTransparent} />
                ) : (
                  <LoadingScreen setNavbarTransparent={setNavbarTransparent} />
                )
              }
            />
            <Route
              path="*"
              element={
                <LinkNotFound setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/createListing"
              element={
                <CreateListing setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/manageListings"
              element={
                <ManageListings setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/listings/:docID"
              element={
                <ListingView setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/checkout/:service"
              element={<Checkout setNavbarTransparent={setNavbarTransparent} />}
            />
            <Route
              path="/badgestatus"
              element={
                <BadgeStatus setNavbarTransparent={setNavbarTransparent} />
              }
            />
          </Routes>
          <Footer />
          <ToastContainer hideProgressBar />
        </NativeBaseProvider>
      </ParallaxProvider>
    </AppContext.Provider>
  );
}

export default App;
