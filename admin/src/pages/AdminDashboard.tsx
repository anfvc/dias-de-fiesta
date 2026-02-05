import AdminContext from "@/context/AdminContext";
import SkeletonCard from "@/components/SkeletonCard";
import { useContext, useEffect } from "react";
import {
  Users,
  Calendar,
  Camera,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

function AdminDashboard() {
  const {
    users,
    events,
    uploadedPhotos,
    testimonials,
    getUsers,
    isLoading,
    prefix,
    fetchEvents,
    fetchPhotos,
    fetchTestimonials,
    currentUser,
  } = useContext(AdminContext);

  useEffect(() => {
    getUsers();
    fetchEvents();
    fetchPhotos();
    fetchTestimonials();
  }, []);

  //* Just in case some values are undefined:
  const usersCount = users?.length || 0;
  const eventsCount = events?.length || 0;
  const photosCount = uploadedPhotos?.length || 0;
  const testimonialsCount = testimonials?.length || 0;

  const kpis = [
    {
      label: "Live Events",
      value: eventsCount,
      icon: <Calendar className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      to: `${prefix}/events`,
    },
    {
      label: "Uploaded Photos",
      value: photosCount,
      icon: <Camera className="w-6 h-6" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      to: `${prefix}/uploads`,
    },
    ...(currentUser?.role === "admin" || currentUser?.role === "owner"
      ? [
          {
            label: "Registered Users",
            value: usersCount,
            icon: <Users className="w-6 h-6" />,
            color: "text-green-600",
            bg: "bg-green-50",
            to: `${prefix}/users`,
          },
        ]
      : []),
    {
      label: "Client Testimonials",
      value: testimonialsCount,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      to: `${prefix}/testimonials`,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Admin Overview
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? // Display 5 skeleton cards if loading
            kpis.map((_, index) => <SkeletonCard key={index} />)
          : // Display actual KPI cards
            kpis.map((kpi, index) => (
              <Link
                to={kpi.to}
                key={index}
                className="block group transition duration-300 transform hover:scale-[1.01] hover:shadow-xl rounded-2xl"
              >
                <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between">
                  {/* Top section: Icon, Label, and Value */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                        {kpi.icon}
                      </div>
                      <p className="text-2xl font-semibold text-gray-500">
                        {/* Improved pluralization logic right here */}
                        {kpi.label.replace(/s$/, kpi.value === 1 ? "" : "s")}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-6xl font-extrabold text-gray-900">
                      {kpi.value}
                    </p>
                  </div>

                  {/* Bottom section: Action Link */}
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <span className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                      View Details
                      <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
