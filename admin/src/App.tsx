import { Route, Routes } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "@/components/AdminRegister";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminEvents from "@/pages/AdminEvents";
import AdminSettings from "@/pages/AdminSettings";
import AdminTestimonials from "@/pages/AdminTestimonials";
import AdminPhotoUploads from "@/pages/AdminPhotoUploads";
import AdminUsers from "@/pages/AdminUsers";
import AdminLayout from "@/layout/AdminLayout";
import AdminFaqs from "@/pages/AdminFaqs";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";
import { useContext } from "react";
import AdminContext from "@/context/AdminContext";

function App() {
  const { prefix } = useContext(AdminContext);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#1d2938", color: "#fff", borderRadius: "20px" },
        }}
      />

      {/* ADMIN ROUTES */}
      <Routes>
        <Route path="/" element={<Navigate to={`${prefix}/login`} replace />} />
        <Route index path={`${prefix}/login`} element={<AdminLogin />} />
        <Route path={`${prefix}/register`} element={<AdminRegister />} />

        <Route
          path={`${prefix}`}
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faqs" element={<AdminFaqs />} />

          <Route path="uploads" element={<AdminPhotoUploads />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
