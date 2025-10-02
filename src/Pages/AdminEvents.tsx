import React, { useState } from "react";
interface EventFormData {
  title: string;
  description: string;
  subTitle: string;
  // image: string;
  price: number | string;
  category: string;
}

const AdminEvents = () => {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    subTitle: "",
    description: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // const token = localStorage.getItem("token"); // assuming auth is needed
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/admin/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccessMessage("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          // image: "",
          subTitle: "",
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to create event.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Try again.");
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Subtitle</label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            rows={3}
            required
          />
        </div>


        <div>
          <label className="block font-medium">Price</label>
          <input
            type="text"
            name="location"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            name="image"

            // onChange={(e) => setImage(e.target.files[0])}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default AdminEvents;
