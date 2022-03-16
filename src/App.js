import "./App.css";
import { NativeBaseProvider } from "native-base";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Routes/LandingPage";
import BugReport from "./Routes/BugReport";
import VerifyBadge from "./Routes/VerifyBadge";
import PrivacyPolicy from "./Routes/PrivacyPolicy";
import { appTheme } from "./Theme";
import NavBar from "./Components/NavBar";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { useState } from "react";
import Contact from "./Routes/Contact";
import Footer from "./Components/Footer";
import Beta from "./Routes/Beta";

function App() {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  return (
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
            element={<BugReport setNavbarTransparent={setNavbarTransparent} />}
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
        </Routes>
        <Footer />
      </NativeBaseProvider>
    </ParallaxProvider>
  );
}

export default App;
