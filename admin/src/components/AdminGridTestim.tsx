import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import type { Testimonial } from "@/types/testimonials";

const AdminGridTestim = () => {
  const {
    testimonials,
    setEditId,
    setEditMode,
    fetchTestimonials,
    setTestimonialData,
    url,
    currentUser,
  } = useContext(AdminContext);

  const currentUserRole =
    currentUser?.role === "admin" || currentUser?.role === "owner";

  const canDelete = currentUserRole;

  const handleEdit = (t: Testimonial) => {
    setTestimonialData({
      name: t.name,
      message: t.message,
      rating: t.rating,
      date: new Date(t.date).toISOString().split("T")[0],
    });
    setEditMode(true);
    setEditId(t._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) {
      toast.error(`You are not authorized to delete testimonials.`);
      return;
    }
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-white mb-2">
            Are you sure you want to delete this testimonial?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={async () => {
                toast.dismiss(t.id); // Dismiss the confirmation toast
                try {
                  const response = await fetch(
                    `${url}/api/admin/testimonials/delete/${id}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    },
                  );

                  const data = await response.json();

                  if (!response.ok) {
                    console.log(data.error);
                    toast.error(data.error || "Failed to delete testimonial.");
                    return;
                  }

                  toast.success("🗑️ Testimonial deleted successfully!");
                  // Assuming fetchTestimonials is a function available in scope to refresh the list
                  fetchTestimonials();
                } catch (error) {
                  console.error(error);
                  toast.error(
                    "Something went wrong while deleting testimonial.",
                  );
                }
              }}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 text-white px-5 py-2 hover:bg-gray-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep the toast open until dismissed by action
        style: {
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
        },
      },
    );
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section className="w-full mt-10 px-2">
      {/* --- HEADER SECTION --- */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
            Client Reviews
          </h3>
          <p className="text-sm text-gray-500">
            {testimonials.length} testimonials received
          </p>
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <p className="text-gray-400 font-medium">
            No testimonials yet. Feedback will appear here.
          </p>
        </div>
      ) : (
        /* --- GRID SECTION --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* --- IMAGE / AVATAR AREA --- */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 text-white transition-all duration-500 group-hover:from-indigo-500 group-hover:to-purple-600">
                    <span className="text-7xl font-black tracking-tighter opacity-90 group-hover:scale-110 transition-transform duration-500">
                      {getInitials(t.name)}
                    </span>
                  </div>
                )}

                {/* DATE BADGE overlay */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black/20 backdrop-blur-md text-white rounded-full border border-white/10">
                    {new Date(t.date).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* --- CARD CONTENT --- */}
              <div className="p-6 grow flex flex-col">
                {/* RATING */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < t.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <h4
                  className="font-bold text-xl text-gray-900 mb-2 truncate"
                  title={t.name}
                >
                  {t.name}
                </h4>

                <p className="text-gray-600 text-sm italic leading-relaxed line-clamp-4 grow">
                  "{t.message}"
                </p>

                {/* --- FOOTER ACTIONS --- */}
                <div className="grid grid-cols-2 gap-3 pt-6 mt-4 border-t border-gray-50">
                  <button
                    onClick={() => handleEdit(t)}
                    className="py-2.5 px-4 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 font-bold rounded-xl transition-all border border-gray-100 cursor-pointer text-[10px] uppercase tracking-wider"
                  >
                    Edit
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="py-2.5 px-4 bg-white hover:bg-red-50 text-red-500 font-bold rounded-xl transition-all border border-gray-100 hover:border-red-100 cursor-pointer text-[10px] uppercase tracking-wider"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminGridTestim;
