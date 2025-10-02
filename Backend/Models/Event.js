import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventSubtitle: {
      type: String,
      required: true,
    },
    eventDescription: {
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
