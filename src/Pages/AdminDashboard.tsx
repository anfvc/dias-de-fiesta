import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import { Users, Calendar } from "lucide-react";
import { Link } from "react-router";

function AdminDashboard() {
  const { users, events } = useContext(AdminContext);

  // Just in case some values are undefined:
  const usersCount = users?.length || 0;
  const eventsCount = events?.length || 0;

  const kpis = [
    {
      label: usersCount > 1 ? "Admins" : "Admin",
      value: usersCount,
      icon: <Users className="text-blue-500 w-8 h-8" />,
      to: "/admin/users",
    },
    {
      label: eventsCount > 1 ? "Live Events" : "Live Events",
      value: eventsCount,
      icon: <Calendar className="text-green-500 w-8 h-8" />,
      to: "/admin/events",
    },
  ];

  // console.log(url);

  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
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
