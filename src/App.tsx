import { Routes, Route } from "react-router";
import { useLocation } from "react-router";
import { useLayoutEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import PageNotFound from "@/pages/PageNotFound";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./index.css";

function App() {
  const location = useLocation();
  const whatsappNumber: string = import.meta.env.VITE_WHATSAPP;

  // When the location changes, scroll to the top of the page:
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <Routes>
          <Route index element={<Home whatsapp={whatsappNumber} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
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
