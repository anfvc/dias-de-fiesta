import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Your full name is required to proceed."],
      minlength: 4,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Your email is required to proceed."],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "A password is required to proceed."],
      minlength: 5,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 5,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Your password must contain at least a number, an uppercase character and an special character.",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user", "editor"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

export default User;
