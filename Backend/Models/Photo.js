import { Schema, model } from "mongoose";

const photoSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  photoPublicId: {
    type: String,
    required: true,
  },
});

const Photo = model("Photo", photoSchema);

export default Photo;
