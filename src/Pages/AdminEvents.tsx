import React, { useContext } from "react";
import add from "../assets/add-image.png";
import AdminContext from "@/context/AdminContext";
import AdminGridEvents from "@/components/AdminGridEvents";

const AdminEvents = () => {
  const {
    EventformData,
    setEventFormData,
    createOrUpdateEvent,
    image,
    setImage,
    loading,
    editMode,
    previewImage,
    setPreviewImage,
  } = useContext(AdminContext);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEventFormData({ ...EventformData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="bg-white shadow-xl rounded-lg p-6 mt-6 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">
          {editMode ? "Edit Event" : "Create Event"}
        </h2>

        <form onSubmit={createOrUpdateEvent} className="space-y-4">
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
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={EventformData.category}
              className="w-full border border-gray-500 px-3 py-2 rounded-lg outline-blue-600"
              onChange={handleChange}
            >
              <option value="" disabled>
                --Select an option--
              </option>
              <option value="Weddings">Weddings</option>
              <option value="Birthdays">Birthdays</option>
              <option value="Conferences">Conferences</option>
              <option value="Baptisms">Baptisms</option>
              <option value="Graduations">Graduations</option>
              <option value="Children's Parties">Children's Parties</option>
            </select>
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
                src={image ? URL.createObjectURL(image) : previewImage || add}
                alt="preview of the image to be uploaded."
                className="w-50 h-50 cursor-pointer border border-gray-500 object-cover rounded-lg"
              />
            </label>
            <input
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                setPreviewImage(
                  file ? URL.createObjectURL(file) : previewImage
                );
              }}
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
            className={`${
              editMode
                ? `bg-sky-800 hover:bg-sky-900`
                : `bg-green-800 hover:bg-green-900`
            } w-full text-white font-semibold py-2 px-4 rounded-lg  transition`}
          >
            {" "}
            {loading
              ? editMode
                ? "Updating...⏳"
                : "Creating...⏳"
              : editMode
              ? "Edit Event"
              : "Create Event"}
          </button>
        </form>
      </div>
      <AdminGridEvents />
    </div>
  );
};

export default AdminEvents;
