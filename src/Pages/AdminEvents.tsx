import React, { useContext } from "react";
import add from "../assets/add-image.png";
import AdminContext from "@/context/AdminContext";

const AdminEvents = () => {
  const {
    EventformData,
    setEventFormData,
    handleCreateEvent,
    image,
    setImage,
    loading,
  } = useContext(AdminContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventFormData({ ...EventformData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

      <form onSubmit={handleCreateEvent} className="space-y-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className="block font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={EventformData.title}
            id="title"
            onChange={handleChange}
            className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
            // required
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="subtitle" className="block font-medium">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            id="subtitle"
            value={EventformData.subtitle}
            onChange={handleChange}
            className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
            // required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={EventformData.category}
            onChange={handleChange}
            className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
            // required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={EventformData.description}
            id="description"
            onChange={handleChange}
            className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
            rows={3}
            // required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="price" className="block font-medium">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={EventformData.price}
            onChange={handleChange}
            className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
            // required
            placeholder="0.00"
          />
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <p>
            Upload Image -{" "}
            <span className="text-base">
              This is just a preview of the image you're uploading.
            </span>
          </p>
          <label htmlFor="image" className="w-50 h-50">
            <img
              src={image ? URL.createObjectURL(image) : add}
              alt="preview of the image to be uploaded."
              className="w-50 h-50 cursor-pointer border border-gray-500 object-cover rounded-lg"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            name="image"
            type="file"
            id="image"
            hidden
            // required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          {" "}
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default AdminEvents;
