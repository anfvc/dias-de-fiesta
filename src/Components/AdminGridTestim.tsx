import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { Testimonial } from "@/types/testimonials";

const AdminGridTestim = () => {
  const {
    testimonials,
    setEditId,
    setEditMode,
    fetchTestimonials,
    setTestimonialData,
    url,
  } = useContext(AdminContext);

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
                    }
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
                    "Something went wrong while deleting testimonial."
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
      }
    );
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">All Testimonials</h2>

      {testimonials.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No testimonials have been added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white shadow rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition border border-gray-400"
            >
              <div>
                <h3 className="font-semibold text-2xl">{t.name}</h3>
                <p className="text-gray-700 mt-1 text-lg break-words">{t.message}</p>
                <div className="flex items-center my-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < t.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(t.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(t)}
                  className="font-semibold text-xl bg-sky-800 rounded-lg px-5 text-white hover:bg-blue-900 transition cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(t._id)}
                  className="font-semibold text-xl bg-red-700 rounded-lg px-4 py-1 text-white hover:bg-red-800 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGridTestim;
