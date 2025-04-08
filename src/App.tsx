import { Routes, Route } from "react-router";
import { useLocation } from "react-router";
import { useLayoutEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServicePage";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import PageNotFound from "@/pages/PageNotFound";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./index.css";

function App() {
  const location = useLocation();
  const url: string = import.meta.env.VITE_SERVER;

  // When the location changes, scroll to the top of the page:
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home url={url} />} />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/services"
              element={
                <PageWrapper>
                  <Services />
                </PageWrapper>
              }
            />
            <Route
              path="/services/:id"
              element={
                <PageWrapper>
                  <ServiceDetails />
                </PageWrapper>
              }
            />
            <Route
              path="/portfolio"
              element={
                <PageWrapper>
                  <Portfolio />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <PageNotFound />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
