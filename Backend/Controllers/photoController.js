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
                  console.error(error);
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
        photo: uploadResult.secure_url,
        photoPulbicId: uploadResult.public_id,
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
