import Event from "../Models/Event.js";
import cloudinary from "../Middleware/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { price, title, subtitle, category, description } = req.body;

    if (!price || !title || !subtitle || !category || !description) {
      return res.status(404).json({ error: "All fields are required." });
    }

    const result = cloudinary.uploader.upload_stream(
      { folder: "dias-de-fiesta" },
      async (error, uploadResult) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Image upload failed." });
        }

        const newEvent = new Event({
          price,
          title: title
            .split(" ")
            .map((title) => title[0].toUpperCase() + title.slice(1))
            .join(" "),
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
    res.status(500).json({ error: "Server error, we couldn't fetch events." });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { price, title, subtitle, category, description } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ error: "Event not found. Please make sure the event exists." });
    }

    if (title) {
      event.title = title
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (subtitle) event.subtitle = subtitle;
    if (category) event.category = category;
    if (description)
      // Adding a full stop to the description if it does not have
      event.description = description.endsWith(".") || description.endsWith("!")
        ? description
        : description + ".";
    if (price) event.price = price;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "dias-de-fiesta" },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }
        );
        stream.end(req.file.buffer);
      });

      event.image = result.secure_url;
    }

    await event.save();
    res.status(200).json({ message: "Event updated successfully!", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating event." });
  }
};
