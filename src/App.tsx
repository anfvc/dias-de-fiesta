import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./index.css";
import { useLocation } from "react-router";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
