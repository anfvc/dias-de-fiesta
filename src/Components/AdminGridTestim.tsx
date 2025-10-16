import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const AdminGridTestim = () => {
  const { testimonials } = useContext(AdminContext);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">All Testimonials</h2>

      {testimonials.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No testimonials have been added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition border border-gray-300"
            >
              <div>
                <h3 className="font-semibold text-3xl">{t.name}</h3>
                <p className="text-gray-700 mt-1 text-xl">{t.message}</p>
                <p className="text-yellow-500 mt-2">⭐ {t.rating}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGridTestim;
