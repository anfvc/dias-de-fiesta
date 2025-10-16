import AdminGridTestim from "@/components/AdminGridTestim";
import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const AdminTestimonials = () => {
  const { testimonialData, createTestimonial, setTestimonialData } =
    useContext(AdminContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Testimonials Management</h1>

      {/* Create Testimonial Form */}
      <form
        onSubmit={createTestimonial}
        className="bg-white shadow rounded-lg p-6 flex flex-col gap-4 max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={testimonialData.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            placeholder="Enter name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={testimonialData.message}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            rows={3}
            placeholder="Enter testimonial message"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="rating" className="font-medium">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={testimonialData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="border rounded-lg px-3 py-2"
            placeholder="1 to 5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-medium">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={testimonialData.date}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Testimonial
        </button>
      </form>

      <AdminGridTestim />
    </div>
  );
};

export default AdminTestimonials;
