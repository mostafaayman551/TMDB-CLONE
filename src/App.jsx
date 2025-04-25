import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";
import ExplorePage from "./pages/Explore/ExplorePage";
import NotFound from "./pages/NotFound/NotFound";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import { ToastContainer } from "react-toastify";
import CreditsPage from "./pages/CreditsPage/CreditsPage";
import PersonPage from "./pages/PersonPage/PersonPage";
import { AnimatePresence, motion } from "framer-motion";

function AppContent() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/explore/:mediaType" element={<ExplorePage />} />
          <Route path="/:mediaType/:id" element={<DetailsPage />} />
          <Route path="/:mediaType/:id/credits" element={<CreditsPage />} />
          <Route path="/person/:id/:name?" element={<PersonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <AppContent />
      <Footer />
    </Router>
  );
}

export default App;
