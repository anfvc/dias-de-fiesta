import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const AdminGridPhotos = () => {
  const { uploadedPhotos, loading, fetchPhotos, setUploadedPhotos } =
    useContext(AdminContext);


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Current Gallery ({uploadedPhotos.length} Photos)
      </h2>

      {loading && uploadedPhotos.length === 0 ? (
        <div className="text-center py-10 text-gray-500 italic">
          Loading photos...
        </div>
      ) : uploadedPhotos.length === 0 ? (
        <div className="text-center py-10 text-gray-500 italic">
          No photos have been uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {uploadedPhotos.map((photo) => (
            <div
              key={photo._id}
              className="aspect-square border border-gray-300 rounded-lg overflow-hidden relative group shadow-md"
            >
              <img
                // Assuming photo object structure is { _id, photo: URL, photoPublicId }
                src={photo.photo}
                alt={`Gallery Photo ${photo._id}`}
                className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
              />

              {/* Deletion Overlay/Button */}
              <button
                type="button"
                // onClick={() => handleDeletePhoto(photo._id, photo.photoPublicId)}
                className="absolute top-0 right-0 m-2 bg-red-600 text-white rounded-full p-2 flex items-center justify-center opacity-0 group-hover:opacity-90 transition duration-300 hover:bg-red-700 shadow-xl"
                aria-label="Delete permanent photo"
                title="Delete Photo Permanently"
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGridPhotos;
