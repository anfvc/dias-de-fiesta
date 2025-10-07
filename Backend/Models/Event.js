import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      required: true,
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Event = model("Event", eventSchema);

export default Event;
