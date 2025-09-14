import User from "../Models/User.js";
import { hash, compare } from "bcrypt";

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    //? If a user is found, we send a warning message saying it can't be registered.
    if (foundUser) {
      return res.status(400).json({ error: "This email already exists." });
    }

    //? If no user is found, we proceed to create a new user:
    //? - by hashing their password

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      name: name[0].toUpperCase() + name.slice(1),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User has been registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Something went wrong. Please try again later or reach support.",
      });
  }
};

export const loginUser = async (req, res) => {};
