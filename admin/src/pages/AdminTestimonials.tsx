import AdminGridTestim from "@/components/AdminGridTestim";
import AdminContext from "@/context/AdminContext";
import { useContext, useCallback } from "react";
import { useResetFormOnNavigate } from "@/hooks/useResetFormOnNavigate";

const StarIcon = ({ fill = "currentColor", className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill={fill}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.691-.921 1.99 0l1.321 4.053 4.269.31c.96.07 1.346 1.258.627 1.879l-3.235 2.768 1.057 4.155c.257 1.01-.813 1.791-1.704 1.256L10 15.178l-3.693 2.296c-.89.535-1.961-.246-1.704-1.256l1.057-4.155-3.235-2.768c-.719-.621-.333-1.809.627-1.879l4.269-.31 1.321-4.053z" />
  </svg>
);

const AdminTestimonials = () => {
  const {
    testimonialData,
    createOrUpdateTestimonial,
    setTestimonialData,
    editMode,
    setEditMode,
  } = useContext(AdminContext);
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setTestimonialData({ ...testimonialData, [e.target.name]: e.target.value });
  };

  const resetForm = useCallback(() => {
    setTestimonialData({ name: "", message: "", rating: 1, date: "" });
    setEditMode(false);
  }, [setEditMode, setTestimonialData]);

  useResetFormOnNavigate(resetForm);

  return (
    <div className="p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 max-w-6xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          {editMode ? "Edit Testimonial" : "Create New Testimonial"}{" "}
          <span className="text-md text-gray-500 font-normal text-base">
            (All fields are required)
          </span>
        </h1>

        {/* Create Testimonial Form */}
        <form
          onSubmit={createOrUpdateTestimonial}
          // Form is the grid container, always 1 column
          className="grid grid-cols-1 gap-6"
        >
          {/* 1. Client Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={testimonialData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-sky-600 focus:ring-2 focus:ring-sky-500 transition shadow-sm"
              placeholder="e.g., Jane Doe"
              autoComplete="name"
              required
            />
          </div>

          {/* 2. Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="block font-medium text-gray-700">
              Date Received
            </label>
            <input
              type="date"
              name="date"
              id="date"
              max={today}
              value={testimonialData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-sky-600 focus:ring-2 focus:ring-sky-500 transition shadow-sm"
              required
            />
          </div>

          {/* 3. Rating */}
          <div className="flex flex-col gap-2">
            <label htmlFor="rating" className="block font-medium text-gray-700">
              Rating (1-5 Stars)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="rating"
                id="rating"
                value={testimonialData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="w-20 border border-gray-300 px-4 py-2 rounded-lg outline-sky-600 focus:ring-2 focus:ring-sky-500 transition shadow-sm text-center"
                placeholder="5"
                required
              />
              <div className="flex text-yellow-400">
                {/* Visual representation of stars based on current rating */}
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="w-9 h-9"
                    fill={
                      star <= testimonialData.rating ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 4. Message Content (Full width textarea) */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message Content
            </label>
            <textarea
              name="message"
              id="message"
              value={testimonialData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-sky-600 focus:ring-2 focus:ring-sky-500 transition shadow-sm resize-none"
              rows={7}
              placeholder="The client's feedback here..."
              required
            />
          </div>

          {/* 5. Action Buttons - Still full width at the bottom */}
          <div className="flex gap-4 pt-4 border-t border-gray-100 mt-2">
            <button
              type="submit"
              className={`${
                editMode
                  ? `bg-sky-700 hover:bg-sky-800`
                  : `bg-blue-600 hover:bg-blue-700`
              } flex-1 text-white font-bold py-3 px-4 rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider cursor-pointer`}
            >
              {editMode ? "Update Testimonial" : "Create Testimonial"}
            </button>
            {(editMode || testimonialData) && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition hover:bg-gray-400 shadow-md uppercase tracking-wider cursor-pointer"
              >
                {editMode ? "Cancel Edit" : "Clear Form"}
              </button>
            )}
          </div>
        </form>
      </div>
      <AdminGridTestim />
    </div>
  );
};

export default AdminTestimonials;
