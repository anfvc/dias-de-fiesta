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
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/index.css";
import { Toaster } from "react-hot-toast";
import AdminEvents from "@/pages/AdminEvents";
import AdminSettings from "@/pages/AdminSettings";
import AdminUsers from "@/pages/AdminUsers";
// import AdminUser from "./components/AdminUser";
import AdminPhotoUploads from "@/pages/AdminPhotoUploads";
import AdminLayout from "@/layouts/AdminLayout";

function App() {
  const location = useLocation();
  const url: string = import.meta.env.VITE_SERVER;

  // When the location changes, scroll to the top of the page:
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
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

            {/* ADMIN ROUTES */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="users" element={<AdminUsers />} />
              {/* <Route path="users/:id" element={<AdminUser />} /> */}

              <Route path="uploads" element={<AdminPhotoUploads />} />
            </Route>
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
