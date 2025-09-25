import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    eventTitle: {
      type: string,
      required: true,
    },
    eventSubtitle: {
      type: string,
      required: true,
    },
    eventDescription: {
      type: string,
      required: true,
    },
    image: {
      required: true,
      type: string,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Event = model("Event", eventSchema);

export default Event;
