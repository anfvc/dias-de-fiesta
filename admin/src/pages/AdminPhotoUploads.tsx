import { useContext } from "react";
import AdminContext from "@/context/AdminContext";
import AdminGridPhotos from "@/components/AdminGridPhotos";
import AddIcon from "@/components/AddIcon";
import type { PhotoUploadData } from "@/types/photos";

const AdminPhotoUploads = () => {
  const {
    selectedPhotos,
    setSelectedPhotos,
    uploadPhotos,
    loading,
    updatePhotoMetadata,
  } = useContext(AdminContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFilesArray = Array.from(files);

      //* 1. Update the state with the actual File objects:
      // setSelectedPhotos((photos) => [...photos, ...newPhotosArray]);

      const newPhotoData: PhotoUploadData[] = newFilesArray.map((file) => ({
        file: file,
        previewUrl: URL.createObjectURL(file),
        category: "",
        title: "",
      }));

      console.log(selectedPhotos);

      //* 2. Generate temporary URLs for the new files and update previewPhotos:
      // const newPreviewPhotos = newPhotosArray.map((file) =>
      //   URL.createObjectURL(file)
      // );
      // setPreviewPhotos((photos) => [...photos, ...newPreviewPhotos]);

      setSelectedPhotos((photos) => [...photos, ...newPhotoData]);

      // console.log(e.target.files);
      // console.log(File);

      //* 3. Clear the input value to allow the same file(s) to be selected again:
      e.target.value = ``;
    }
  };

  const handleDeletePreview = (index: number) => {
    //* 1. Get the URL to remove before removal:
    const urlToRevoke = selectedPhotos[index].previewUrl;

    //* 2. Filter out the removed item from both arrays:
    setSelectedPhotos((file) => file.filter((_, i) => i !== index));
    // setPreviewPhotos((file) => file.filter((_, i) => i !== index));

    URL.revokeObjectURL(urlToRevoke);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //? The check for selectedPhotos.length is handled inside uploadPhotos:
    uploadPhotos();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 font-sans">
      <div className="flex justify-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Photo Upload Manager
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center mb-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <p className="text-gray-600 text-sm text-center">
          Select photos and fill out the **Title** and **Category** fields below
          each image.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Upload Button */}
          <label
            htmlFor="images"
            className="w-32 h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 text-gray-500 rounded-xl hover:border-blue-500 transition group hover:text-blue-500 bg-gray-50"
          >
            <AddIcon />
            <span className="text-xs mt-1 font-medium">Select Photos</span>
          </label>
          <input
            onChange={handleFileChange}
            name="images"
            type="file"
            id="images"
            multiple
            accept="image/*"
            hidden
          />
        </div>

        {/* New structure for selected photos: Thumbnail + Separate Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {selectedPhotos.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-xl shadow-inner border border-gray-200"
            >
              {/* Photo Thumbnail Container */}
              <div className="w-full h-48 relative border-4 border-white rounded-lg overflow-hidden shadow-md mb-3">
                <img
                  src={item.previewUrl}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-full"
                />

                <button
                  type="button"
                  onClick={() => handleDeletePreview(index)}
                  className="absolute top-2 right-2 bg-red-600/90 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-red-700 transition duration-200 shadow-xl z-10"
                  aria-label="Remove photo"
                  title="Remove photo"
                >
                  &times;
                </button>
              </div>

              {/* Separate Input Fields (Now always visible) */}
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor={`title-${index}`}
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id={`title-${index}`}
                    type="text"
                    placeholder="e.g., Beach Sunset"
                    value={item.title}
                    onChange={(e) =>
                      updatePhotoMetadata(index, "title", e.target.value)
                    }
                    className="w-full text-sm p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={`category-${index}`}
                    className="block text-xs font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    id={`category-${index}`}
                    value={item.category}
                    className="w-full text-sm text-gray-700 p-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                    onChange={(e) =>
                      updatePhotoMetadata(index, "category", e.target.value)
                    }
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
                    <option value="Children's Parties">
                      Children's Parties
                    </option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Display selected count */}
        {selectedPhotos.length > 0 && (
          <p className="text-sm text-gray-600 font-medium mt-4">
            {selectedPhotos.length} photo(s) ready for upload.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || selectedPhotos.length === 0}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider shadow-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto mt-4"
        >
          {loading
            ? "Uploading..."
            : `Upload ${
                selectedPhotos.length > 0 ? `(${selectedPhotos.length})` : ""
              } Photos`}
        </button>
      </form>
      <AdminGridPhotos />
    </div>
  );
};

export default AdminPhotoUploads;
