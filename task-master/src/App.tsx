import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/landingPage/Landing";
import Tasks from "./pages/task/Tasks";
import Auth from "./pages/auth/Auth";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Contact from "./pages/contact/Contact";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "@/hooks/useAuth";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {!hideNavbar && <Footer />}
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
