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
    currentUser,
  } = useContext(AdminContext);

  const currentUserRole =
    currentUser?.role === "admin" || currentUser?.role === "owner";

  const canDelete = currentUserRole;

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
      },
    );

    // Smooth scroll to form for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!canDelete) {
      toast.error(`You are not authorized to delete events.`);
      return;
    }

    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-white mb-2">
            Are you sure you want to delete this event?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const response = await fetch(
                    `${url}/api/admin/events/delete/${id}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    },
                  );

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
        duration: Infinity,
        style: {
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
        },
      },
    );
  };

  const handleDeleteAllEvents = async () => {
    if (!canDelete) {
      toast.error("You are not authorized to delete all events.");
      return;
    }
    toast(
      (t) => (
        <div className="flex flex-col items-center">
          <p className="text-white mb-2">
            Are you sure you want to delete all the events?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 cursor-pointer rounded-full duration-200 transition-all"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const response = await fetch(
                    `${url}/api/admin/events/delete/all`,
                    {
                      method: "DELETE",
                      credentials: "include",
                    },
                  );

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
        duration: Infinity,
        style: {
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
        },
      },
    );
  };

  return (
    <section className="w-full mt-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Live Events</h3>
          <p className="text-sm text-gray-500">
            {events.length} events published
          </p>
        </div>
        {canDelete && events.length > 0 && (
          <button
            onClick={handleDeleteAllEvents}
            className="flex items-center gap-2 px-4 py-2 text-md font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
          >
            <span>Delete All</span>
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400">
            No events found. Start by creating one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-120 overflow-hidden">
                <img
                  src={event.image || add}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 text-sm font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {event.title}
                  </h4>
                  <span className="text-indigo-600 font-bold">
                    {event.price.toLocaleString(undefined, {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 grow">
                  {event.description}
                </p>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="flex justify-center items-center py-2 px-4 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 font-medium rounded-lg transition-colors border border-gray-200 hover:border-indigo-200 cursor-pointer"
                  >
                    Edit
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex justify-center items-center py-2 px-4 bg-white hover:bg-red-50 text-red-500 font-medium rounded-lg transition-colors border border-gray-200 hover:border-red-200 cursor-pointer"
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

export default AdminGridEvents;
