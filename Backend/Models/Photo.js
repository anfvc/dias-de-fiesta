import { Schema, model } from "mongoose";

const photoSchema = new Schema(
  {
    photo: { //change to photo from image as the promise was failing
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
    category: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
);

const Photo = model("Photo", photoSchema);

export default Photo;
