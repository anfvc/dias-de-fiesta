import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import add from "../assets/add-image.png";
import toast from "react-hot-toast";

const AdminGridEvents = () => {
  const {
    events,
    setEditId,
    url,
    fetchEvents,
    setEventFormData,
    setEditMode,
    setPreviewImage,
  } = useContext(AdminContext);

  const handleEdit = (id: string) => {
    const eventToEdit = events.find((event) => event._id === id);
    if (!eventToEdit) return;

    setEditId(id);
    setEditMode(true);
    setEventFormData({
      title: eventToEdit.title || "",
      subtitle: eventToEdit.subtitle || "",
      category: eventToEdit.category || "",
      description: eventToEdit.description || "",
      price: eventToEdit.price || 0,
    });

    setPreviewImage(eventToEdit.image || null); //This line will bring back the file from the URL from cloudinary when the user clicks on edit

    toast(
      "Edit mode is now enabled. Please double check everything once updated.",
      {
        icon: "🛠️",
      }
    );

    // Smooth scroll to form for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`${url}/api/admin/events/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to delete event.");
        return;
      }

      toast.success("🗑️ Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting event.");
    }
  };

  const handleDeleteAllEvents = async () => {
    if (confirm("Are you sure you want to delete all of your events?")) {
      try {
        const response = await fetch(`${url}/api/admin/events/deleteall`, {
          method: "DELETE",
          credentials: "include",
        });

        if (!response.ok) {
          const { error } = await response.json();
          toast.error(error || "We couldn't delete all events.");
          return;
        }

        toast(" All events deleted successfully!", { icon: "🗑️" });
        fetchEvents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="w-4/5 mt-10">
      <div className="flex items-center gap-8">
        <h3 className="text-xl font-semibold mb-4">Live Events</h3>
        {events.length > 0 && (
          <button
            onClick={handleDeleteAllEvents}
            className="text-xl font-semibold mb-4 border px-4 rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer transition-all"
          >
            ⚠️ Delete All
          </button>
        )}
      </div>
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="w-full border border-gray-300 rounded-lg p-3 shadow hover:shadow-lg transition relative group"
            >
              <img
                src={event.image || add}
                alt={event.title}
                className="w-full h-72 object-cover rounded-md mb-3"
              />
              <h4 className="font-semibold text-lg">{event.title}</h4>
              <p className="text-gray-600 text-sm">{event.category}</p>
              <p className="text-indigo-600 font-semibold mt-2">
                {event.price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                })}{" "}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(event._id)}
                  className="px-3 py-1 text-sm bg-sky-800 hover:bg-sky-900 text-white rounded  transition cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="px-3 py-1 text-sm bg-red-700 text-white rounded hover:bg-red-800 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminGridEvents;
