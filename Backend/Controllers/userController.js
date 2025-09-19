import User from "../Models/User.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(token);

    await newUser.save();
    res.status(201).json({ message: `${newUser.email} has been successfully registered.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong. Please try again later or reach support.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //? Finding the user:
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "This user does not exist. Please register." });
    }

    const isMatch = compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password are invalid." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `${user.name} has sucessfully logged in!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({ error: "Server Error, please try again later." });
  }
};
