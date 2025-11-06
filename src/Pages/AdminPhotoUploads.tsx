import React, { useContext } from "react";
import add from "../assets/add-image.png";
import AdminContext from "@/context/AdminContext";

const AdminPhotoUploads = () => {
  const { photos, setPhotos, previewPhotos, setPreviewPhotos } =
    useContext(AdminContext);

  return (
    <div className="p-6">
      {/* Upload form */}
      <form
        // onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mb-8"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {/* Upload Button */}
          <label
            htmlFor="images"
            className="w-32 h-32 flex items-center justify-center cursor-pointer border border-gray-400 rounded-lg hover:border-blue-500 transition"
          >
            <img
              src={add}
              alt="Add"
              className="w-10 h-10 opacity-60 hover:opacity-100 transition"
            />
          </label>
          <input
            // onChange={handleFileChange}
            name="images"
            type="file"
            id="images"
            multiple
            accept="image/*"
            hidden
          />

          {/* Preview thumbnails */}
          {previewPhotos.map((preview, index) => (
            <div
              key={index}
              className="w-32 h-32 border border-gray-400 rounded-lg overflow-hidden relative"
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          // disabled={loading || images.length === 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {/* {loading ? "Uploading..." : "Upload Photos"} */}
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminPhotoUploads;
