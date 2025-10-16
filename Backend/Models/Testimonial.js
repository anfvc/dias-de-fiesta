import { Schema, model } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Testimonial = model("Testimonial", testimonialSchema);

export default Testimonial;
