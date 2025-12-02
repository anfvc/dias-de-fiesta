import { useContext, useCallback } from "react";
// import add from "../assets/add-image.png";
import AdminContext from "@/context/AdminContext";
import AdminGridEvents from "@/components/AdminGridEvents";
import { useResetFormOnNavigate } from "@/hooks/useResetFormOnNavigate";
import AddIcon from "@/components/AddIcon";

const AdminEvents = () => {
  const {
    EventformData,
    setEventFormData,
    createOrUpdateEvent,
    image,
    setImage,
    loading,
    editMode,
    setEditMode,
    previewImage,
    setPreviewImage,
  } = useContext(AdminContext);

  const resetForm = useCallback(() => {
    setEventFormData({
      title: "",
      subtitle: "",
      category: "",
      description: "",
      price: 0,
    });
    setImage(null)
    setPreviewImage(null);
    setEditMode(false);

  }, [setEditMode, setEventFormData, setPreviewImage, setImage]);

  useResetFormOnNavigate(resetForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEventFormData({ ...EventformData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    // Revoke old URL if it exists to free up memory (best practice)
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    // Set new preview URL
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleRemoveImage = () => {
    // Revoke URL to free up memory
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 mt-6 max-w-5xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          {editMode ? "Edit Event Details" : "Create New Event"}{" "}
          <span className="text-md text-gray-700 font-normal text-base">(All fields are required)</span>
        </h2>

        <form onSubmit={createOrUpdateEvent} className="space-y-8">
          {/* Main 2-Column Layout for Metadata and Description */}
          <div className="grid md:grid-cols-1 gap-8">
            {/* LEFT COLUMN: Core Event Details */}
            <div className="space-y-6 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="block font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={EventformData.title}
                  id="title"
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subtitle"
                  className="block font-medium text-gray-700"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  value={EventformData.subtitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>
            {/* Category and Price in a nested 2-column grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="block font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={EventformData.category}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-500 transition"
                  onChange={handleChange}
                  required
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
                  <option value="Baby Showers">Baby Showers</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="price"
                  className="block font-medium text-gray-700"
                >
                  Price (COP)
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={EventformData.price || ""} // Use empty string to manage 0 display
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-500 transition"
                  required
                  placeholder="e.g., 499.00"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Description and Image Upload */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="block font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  value={EventformData.description}
                  id="description"
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-blue-600 focus:ring-2 focus:ring-blue-500 transition"
                  rows={9} // Adjusted row count to align with other elements
                  required
                />
              </div>

              {/* UPLOAD SECTION (Moved to its own block for visual separation) */}
              <div className="flex flex-col gap-3 pt-2">
                <p className="block font-medium text-gray-700">
                  Event Image{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({editMode ? "Optional" : "Required"})
                  </span>
                </p>

                <div className="flex items-start gap-4">
                  <label
                    htmlFor="image"
                    className="w-40 h-40 shrink-0 cursor-pointer border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-blue-500 transition group hover:text-blue-500 relative overflow-hidden bg-gray-50 shadow-inner"
                  >
                    {/* Display Image or AddIcon */}
                    {image || previewImage ? (
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : previewImage || ""
                        }
                        alt="Preview of the event image."
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full">
                        <AddIcon />
                        <span className="text-xs mt-1 font-medium">
                          Select Event Image
                        </span>
                      </div>
                    )}
                  </label>

                  <input
                    onChange={handleImageChange}
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    hidden
                    required={!editMode && !image && !previewImage}
                  />

                  {/* Remove Image Button (if image exists) */}
                  {(image || previewImage) && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide shadow-md hover:bg-red-700 transition h-10"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {/* END UPLOAD SECTION */}
            </div>
          </div>
          {/* End Main 2-Column Layout */}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className={`${
                editMode
                  ? `bg-sky-700 hover:bg-sky-800`
                  : `bg-blue-600 hover:bg-blue-700`
              } flex-1 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider`}
            >
              {" "}
              {loading
                ? editMode
                  ? "Updating...⏳"
                  : "Creating...⏳"
                : editMode
                ? "Update Event"
                : "Create Event"}
            </button>
            {(editMode || EventformData) && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition hover:bg-gray-400 shadow-md uppercase tracking-wider"
              >
                {editMode ? "Cancel Edit" : "Clear Form"}
              </button>
            )}
          </div>
        </form>
      </div>
      <AdminGridEvents />
    </div>
  );
};

export default AdminEvents;
