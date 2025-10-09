import AdminContext from "@/context/AdminContext";
import { useContext } from "react";
import add from "../assets/add-image.png";

const AdminGridEvents = () => {
  const { events } = useContext(AdminContext);

  return (
    <section className="max-w-7xl mx-auto mt-10">
      <h3 className="text-xl font-semibold mb-4">Live Events</h3>
      {events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="w-full border border-gray-400 rounded-lg p-3 shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={event.image || add}
                alt={event.title}
                className="w-full h-80 object-cover rounded-md mb-3"
              />
              <h4 className="font-semibold text-lg">
                {event.title
                  .split(" ")
                  .map(
                    (titleElement) =>
                      titleElement[0].toUpperCase() + titleElement.slice(1)
                  )
                  .join(" ")}
              </h4>
              <p className="text-gray-600 text-sm">{event.category}</p>
              <p className="text-indigo-600 font-semibold mt-2">
                ${event.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminGridEvents;
