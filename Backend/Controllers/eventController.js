import Event from "../Models/Event.js";
import cloudinary from "../Middleware/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { price, title, subtitle, category, description } = req.body;

    if (!price || !title || !subtitle || !category || !description) {
      return res.status(404).json({ error: "All fields are required." });
    }

    if (!req.file) {
      return res.stattus(404).json({ message: "Image file is required." });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "dias-de-fiesta",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    const newEvent = new Event({
      price,
      title: title
        .split(" ")
        .map((title) => title[0].toUpperCase() + title.slice(1))
        .join(" "),
      subtitle:
        subtitle[0].toUpperCase() + subtitle.slice(1) && !subtitle.endsWith(".")
          ? subtitle + "."
          : subtitle,
      category,
      description:
        description[0].toUpperCase() + description.slice(1) &&
        !description.endsWith(".")
          ? description + "."
          : description,
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id, //every image will get this public id from cloudinary
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: `${title} has been created successfully.` });
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
    //* Checking if the event exists:
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

    if (subtitle) event.subtitle = subtitle.trim();
    if (category) event.category = category.trim();
    if (description)
      // Adding a full stop to the description if it does not have
      event.description =
        description.endsWith(".") || description.endsWith("!")
          ? description
          : description + ".";

    if (price) {
      const numericPrice = Number(price);
      if (isNaN(numericPrice)) {
        return res.status(400).json({ error: "Price must be a valid number." });
      }
      event.price = numericPrice;
    }

    //? If a new image is uploaded, replace the old one:
    if (req.file) {
      //* Delete previous iamge from cloudinary if it exists:
      if (event.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(event.imagePublicId);
          console.log("Old image from cloudinary:", event.imagePublicId);
        } catch (error) {
          console.error(error);
        }
      }

      //? Uploading a new image:
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

      //*Assigning the old event the new image data
      event.image = result.secure_url;
      //* Storing the public id to delete it later if needed.
      event.imagePublicId = result.public_id;
    }

    await event.save();
    res.status(200).json({ message: "Event updated successfully!", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating event." });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        error:
          "Event not found. Please make sure the event you're trying to delete exists.",
      });
    }

    if (event.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(event.imagePublicId);
        console.log(`Deleted image from cloudinary: ${event.imagePublicId}`);
      } catch (error) {
        console.error(error);
      }
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting event. Please try again." });
  }
};

export const deleteAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});

    if (events.length === 0) {
      return res.status(404).json({ error: "You have no events to delete." });
    }

    //? Deleting all images from cloudinary when the users want to delete all the existing events:

    const deletionPromises = events.map(async (event) => {
      //? iterating through all events
      if (event.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(event.imagePublicId); //deleting the images with imagePublicIds in bulk
          console.log(`Deleted Cloudinary image: ${event.imagePublicId}`);
        } catch (error) {
          console.error(
            `Error deleting image ${event.imagePublicId}:`,
            error.message
          );
        }
      }
    });

    await Promise.all(deletionPromises);

    await Event.deleteMany();
    res
      .status(200)
      .json({ message: "All events have been deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting all events." });
  }
};
