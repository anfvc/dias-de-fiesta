import Photo from "../Models/Photo.js";
import cloudinary from "../Middleware/cloudinary.js";

export const uploadPhotos = async (req, res) => {
  try {
    const files = Array.isArray(req.files) ? req.files : [req.file];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Photo files are required." });
    }

    const uploadResults = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "dias-de-feista/photos" },
              (error, result) => {
                if (error) {
                  console.error(`line 20:`, error);
                  reject(error);
                } else {
                  resolve(result);
                  console.log(result);
                }
              }
            );
            stream.end(file.buffer);
          })
      )
    );

    const newPhotos = await Photo.insertMany(
      uploadResults.map((uploadResult) => ({
        photo: uploadResult.secure_url, //needs to be exactly the same as the mongoose field "photo"
        photoPublicId: uploadResult.public_id,
      }))
    );

    console.log(newPhotos);

    res.status(201).json({
      message: "Photos successfully uploaded.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error. Please try again later." });
  }
};

export const fetchPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });

    if (!photos || photos.length === 0) {
      // Return 200 with an empty array if no photos are found, for better frontend handling
      return res
        .status(200)
        .json({ message: `No photos to show at the moment.`, photos: [] });
    }

    res
      .status(200)
      .json({ message: `All photos fetched successfully!`, photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Server Error, please try again later.`,
    });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { photoPublicId } = req.body;

    if (!id || !photoPublicId) {
      return res
        .status(400)
        .json({ error: "Missing Photo ID or Public ID for deletion." });
    }

    const cloudinaryResult = await cloudinary.uploader.destroy(photoPublicId);

    console.log(cloudinaryResult);

    if (!["ok", "not found", "not_found"].includes(cloudinaryResult.result)) {
      console.warn(
        `Cloudinary deletion warning for ID ${photoPublicId}: ${cloudinaryResult.result}`
      );
    }

    const deletedPhoto = await Photo.findByIdAndDelete(id);

    if (!deletedPhoto) {
      return res
        .status(404)
        .json({ error: `We couldn't delete this photo. Does it exist?` });
    }

    res.status(200).json({ message: `Photo deleted successfully!` });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({
      error: `Server Error: Failed to delete photo.`,
    });
  }
};
