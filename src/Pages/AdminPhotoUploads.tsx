import { useContext, useEffect } from "react";
import AdminContext from "@/context/AdminContext";
import AdminGridPhotos from "@/components/AdminGridPhotos";
import AddIcon from "@/components/AddIcon";

const AdminPhotoUploads = () => {
  const {
    selectedPhotos,
    setSelectedPhotos,
    previewPhotos,
    setPreviewPhotos,
    uploadPhotos,
    loading,
  } = useContext(AdminContext);

  useEffect(() => {
    previewPhotos.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newPhotosArray = Array.from(files);

      //* 1. Update the state with the actual File objects:
      setSelectedPhotos((photos) => [...photos, ...newPhotosArray]);

      console.log(selectedPhotos);

      //* 2. Generate temporary URLs for the new files and update previewPhotos:
      const newPreviewPhotos = newPhotosArray.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewPhotos((photos) => [...photos, ...newPreviewPhotos]);

      console.log(e.target.files);
      console.log(File);

      //* 3. Clear the input value to allow the same file(s) to be selected again:
      e.target.value = ``;
    }
  };

  const handleDeletePreview = (index: number) => {
    //* 1. Get the URL to remove before removal:
    const urlToRevoke = previewPhotos[index];

    //* 2. Filter out the removed item from both arrays:
    setSelectedPhotos((file) => file.filter((_, i) => i !== index));
    setPreviewPhotos((file) => file.filter((_, i) => i !== index));

    URL.revokeObjectURL(urlToRevoke);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //? The check for selectedPhotos.length is handled inside uploadPhotos:
    uploadPhotos();
  };

  return (
    <div className="p-6">
      {/* Upload form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mb-8"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {/* Upload Button */}
          <label
            htmlFor="images"
            className="w-32 h-32 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition group"
          >
            {/* Replaced image import with inline SVG for robustness */}
            <AddIcon />
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

              <button
                type="button"
                onClick={() => handleDeletePreview(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold opacity-80 hover:opacity-100 transition duration-200 shadow-lg"
                aria-label="Remove photo"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* Display selected count */}
        {selectedPhotos.length > 0 && (
          <p className="text-sm text-gray-600 font-medium">
            {selectedPhotos.length} photo(s) selected.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || selectedPhotos.length === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
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
