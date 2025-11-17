import { Routes, Route } from "react-router";
import { useLocation } from "react-router";
import { useContext, useLayoutEffect } from "react";
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
import "@/styles/index.css";
import { Toaster } from "react-hot-toast";

import AdminContext from "@/context/AdminContext";

function App() {
  const location = useLocation();
  const { url } = useContext(AdminContext);

  // When the location changes, scroll to the top of the page:
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.split("/")[1] === "admin";

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1d2938", color: "#fff", borderRadius: "20px" },
        }}
      />
      {!isAdminRoute && <Navbar />}
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
                  <Contact url={url} />
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
      {!isAdminRoute && location.pathname !== "/" && <Footer url={url} />}
    </>
  );
}

export default App;
