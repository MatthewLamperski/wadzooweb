import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Button, Icon, Modal, NativeBaseProvider, Text } from "native-base";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage, { deviceType } from "./Routes/LandingPage";
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
import { getUserDoc, signMeOut } from "./FirebaseInterface";
import CreateListing from "./Views/DataEntryDashboard/CreateListing";
import ManageListings from "./Views/DataEntryDashboard/ManageListings";
import ListingView from "./Views/ListingView";
import BadgeStatus from "./Views/BadgeStatus";
import Checkout from "./Routes/Checkout";
import AdminDashboard from "./Views/AdminDashboard/AdminDashboard";
import AnalyticsView from "./Views/AdminDashboard/AnalyticsView";
import VerificationRequestsView from "./Views/AdminDashboard/VerificationRequestsView";
import TermsOfUse from "./Routes/TermsOfUse";
import AffiliatesView from "./Views/AdminDashboard/AffiliatesView";
import AffiliatesDashboard from "./Views/AffiliatesDashboard/AffiliatesDashboard";
import UsersView from "./Views/AdminDashboard/UsersView";
import UploadProperty from "./Routes/UploadProperty";
import { FaChevronRight } from "react-icons/fa";
import Introduction from "./Routes/Introduction";
import Faquestions from "./Routes/Faq";

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
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [FIRUser, setFIRUser] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [showUserSignInApp, setShowUserSignInApp] = useState(false);
  const navigate = useNavigate();
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
            setShowUserSignInApp(true);
            signMeOut();
            setUser(null);
            setFIRUser(null);
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
            navbarHidden={navbarHidden}
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
              path="/tou"
              element={
                <TermsOfUse setNavbarTransparent={setNavbarTransparent} />
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
              path="/uploadProperty"
              element={
                <UploadProperty setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/intro"
              element={
                <Introduction setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/createListing"
              element={
                <CreateListing setNavbarTransparent={setNavbarTransparent} />
              }
            />
            <Route
              path="/faq"
              element={
                <Faquestions setNavbarTransparent={setNavbarTransparent} />
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
            <Route
              path="/download"
              element={<Beta setNavbarTransparent={setNavbarTransparent} />}
            />
            <Route
              path="/affiliate"
              element={
                <AffiliatesDashboard
                  setNavbarTransparent={setNavbarTransparent}
                />
              }
            />
            <Route
              path="admin"
              element={
                <AdminDashboard
                  setNavbarTransparent={setNavbarTransparent}
                  setNavbarHidden={setNavbarHidden}
                />
              }
            >
              <Route index element={<VerificationRequestsView />} />
              <Route path="analytics" element={<AnalyticsView />} />
              <Route
                path="verifications"
                element={<VerificationRequestsView />}
              />
              <Route path="users" element={<UsersView />} />
              <Route path="affiliates" element={<AffiliatesView />} />
            </Route>
          </Routes>
          <Footer />
          <ToastContainer hideProgressBar />
          <Modal
            isOpen={showUserSignInApp}
            onClose={() => setShowUserSignInApp(false)}
            _backdrop={{ bg: "warmGray.500" }}
            size={
              deviceType() === "iOS" || deviceType() === "android" ? "xl" : "lg"
            }
          >
            <Modal.Content
              marginBottom={
                deviceType() === "iOS" || deviceType() === "android"
                  ? "auto"
                  : 0
              }
              marginTop={
                deviceType() === "iOS" || deviceType() === "android" ? 12 : 0
              }
            >
              <Modal.CloseButton />
              <Modal.Header>
                <Text>Create an Account on the App!</Text>
              </Modal.Header>
              <Modal.Body>
                <Text>It looks like this is your first time signing in!</Text>
                <Text py={2} fontSize={14} color="muted.600">
                  Before being able to able to sign in on the web, you must
                  register your account on the mobile app.
                </Text>
                <Text>
                  Wadzoo is available for beta testing now. Once your account
                  has been created, come back here and log in!
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    my={0}
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowUserSignInApp(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    shadow={0}
                    rightIcon={<Icon as={<FaChevronRight />} />}
                    my={0}
                    onPress={() => {
                      navigate("/download");
                      setShowUserSignInApp(false);
                    }}
                  >
                    Download the App
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </NativeBaseProvider>
      </ParallaxProvider>
    </AppContext.Provider>
  );
}

export default App;
