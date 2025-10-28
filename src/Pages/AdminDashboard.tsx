import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import { Users, Calendar, Camera, Text, FileQuestionMark } from "lucide-react";
import { Link } from "react-router";

function AdminDashboard() {
  const { users, events, photos, testimonials, faqs } =
    useContext(AdminContext);

  // Just in case some values are undefined:
  const usersCount = users?.length || 0;
  const eventsCount = events?.length || 0;
  const photosCount = photos?.length || 0;
  const faqsCount = faqs?.length || 0;
  const testimonialsCount = testimonials?.length || 0;

  const kpis = [
    {
      label: eventsCount > 1 ? "Live Events" : "Live Event",
      value: eventsCount,
      icon: <Calendar className="text-green-500 w-8 h-8" />,
      to: "/admin/events",
    },
    {
      label: photosCount > 1 ? "Live Photos" : "Live Photos",
      value: photosCount,
      icon: <Camera className="text-purple-500 w-8 h-8" />,
      to: "/admin/uploads",
    },
    {
      label: usersCount > 1 ? "Admins" : "Admin",
      value: usersCount,
      icon: <Users className="text-blue-500 w-8 h-8" />,
      to: "/admin/users",
    },
    {
      label: testimonialsCount > 1 ? "Live Testimonials" : "Live Testimonial",
      value: testimonialsCount,
      icon: <Text className="text-orange-500 w-8 h-8" />,
      to: "/admin/testimonials",
    },
    {
      label: faqsCount > 1 ? "Live FAQs" : "Live FAQ",
      value: faqsCount,
      icon: <FileQuestionMark className="text-indigo-800 w-8 h-8" />,
      to: "/admin/faqs",
    },
  ];

  // console.log(url);

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-6">
      {kpis.map((kpi, index) => (
        <Link to={kpi.to} key={index}>
          <div
            key={kpi.label}
            className="bg-white border border-gray-400 rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
          >
            <div className="mb-2">{kpi.icon}</div>
            <p className="text-gray-00 text-md">{kpi.label}</p>
            <p className="text-4xl font-bold text-gray-800">{kpi.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AdminDashboard;
