import { Route, Routes } from "react-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLogin from "@/pages/AdminLogin";
import AdminRegister from "@/components/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "@/pages/AdminEvents";
import AdminSettings from "@/pages/AdminSettings";
import AdminTestimonials from "@/pages/AdminTestimonials";
import AdminPhotoUploads from "@/pages/AdminPhotoUploads";
import AdminUsers from "@/pages/AdminUsers";
import AdminLayout from "@/layout/AdminLayout";
import AdminFaqs from "@/pages/AdminFaqs";

function App() {
  return (
    <>
      <Routes>
        {/* ADMIN ROUTES */}
        <Route index path="/admin/login" element={<AdminLogin />} />
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
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="faqs" element={<AdminFaqs />} />

          <Route path="uploads" element={<AdminPhotoUploads />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
