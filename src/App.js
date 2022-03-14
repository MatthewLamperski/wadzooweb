import './App.css';
import { NativeBaseProvider } from "native-base";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Routes/LandingPage";
import BugReport from "./Routes/BugReport";
import VerifyBadge from "./Routes/VerifyBadge";
import PrivacyPolicy from "./Routes/PrivacyPolicy";
import {appTheme} from "./Theme";
import NavBar from "./Components/NavBar";
import './index.css'
import {ParallaxProvider} from "react-scroll-parallax";

function App() {
  return (
    <ParallaxProvider>
      <NativeBaseProvider theme={appTheme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bugreport" element={<BugReport />} />
          <Route path="/verifybadge" element={<VerifyBadge />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
      </NativeBaseProvider>
    </ParallaxProvider>
  );
}

export default App;
