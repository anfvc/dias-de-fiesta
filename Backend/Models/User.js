import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Your full name is required to proceed."],
      minlength: 4,
      maxlength: 50,
      // unique: true
    },
    email: {
      type: String,
      required: [true, "Your email is required to proceed."],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

export default User;
