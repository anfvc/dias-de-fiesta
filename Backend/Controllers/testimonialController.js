import Testimonial from "../Models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  const { name, message, rating, date } = req.body;

  try {
    if (!name || !message || !rating || !date) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const newTestimonial = new Testimonial({
      name: name
        .split(" ")
        .map((item) => item[0].toUpperCase() + item.slice(1))
        .join(" "),
      message: message[0].toUpperCase() + message.slice(1),
      rating,
      date,
    });

    console.log(newTestimonial);

    await newTestimonial.save();

    res
      .status(200)
      .json({ message: "A new testimonial has been created successfully!" });
  } catch (error) {
    res.status(500).json({
      error:
        "We could not complete the testimonial creation. Please try again later.",
    });
  }
};

export const fetchTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "There was an error fetching the testimonials." });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    res.status(200).json({
      message: "User has been deleted successfully.",
      deletedTestimonial,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error." });
  }
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name, message, rating, date } = req.body;

  try {
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      res
        .status(404)
        .json({ error: "We couldn't find that testimonial. Does it exist?" });
    }

    if (name) {
      testimonial.name = name
        .split(" ")
        .map((item) => item[0].toUpperCase() + item.slice(1))
        .join(" ");
    }

    if (message) {
      const formattedMessage =
        message.trim().endsWith(".") || message.trim().endsWith("!")
          ? message[0].toUpperCase() + message.slice(1)
          : message[0].toUpperCase() + message.slice(1) + ".";

      testimonial.message = formattedMessage;
    }

    if (rating) {
      testimonial.rating = rating;
    }

    if (date) {
      testimonial.date = date;
    }

    await testimonial.save();

    res
      .status(200)
      .json({ message: "Testimonial updated successfully!", testimonial });
  } catch (error) {
    res.status(500).json({ error: "Error updating testimonial." });
  }
};
