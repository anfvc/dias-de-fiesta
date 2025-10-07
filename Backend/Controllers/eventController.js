import Event from "../Models/Event.js";
import cloudinary from "../Middleware/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { price, title, subtitle, category, description } = req.body;

    if (!price || !title || !subtitle || !category || !description) {
      return res.status(400).json({error: "All fields are required."})
    }

    const result = cloudinary.uploader.upload_stream(
      { folder: "dias-de-fiesta" },
      async (error, uploadResult) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Image upload failed." });
        }

        const newEvent = new Event({
          price,
          title,
          subtitle,
          category,
          description,
          image: uploadResult.secure_url,
        });

        await newEvent.save();

        res
          .status(201)
          .json({ message: `${title} has been created successfully.` });
      }
    );

    if (req.file) {
      result.end(req.file.buffer);
    } else {
      res.status(400).json({ error: "No image file provided." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorData: "Something went wrong, please try again." });
  }
};

export const fetchAllEvents = async (req, res) => {
  try {
    const allEvents = await Event.find({});
    res.status(200).json(allEvents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error, we couldn't fetch events." });
  }
};
