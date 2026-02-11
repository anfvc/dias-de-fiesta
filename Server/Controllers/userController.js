import User from "../Models/User.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    //? Input validation
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password, and name are required." });
    }

    //? Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address." });
    }

    //? Validate password strength BEFORE hashing
    if (
      !validator.isStrongPassword(password, {
        minLength: 5,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({
        error:
          "Your password must contain at least 5 characters, an uppercase letter, a number, and a special character.",
      });
    }

    const foundUser = await User.findOne({ email: email.toLowerCase() });

    //? If a user is found, we send a warning message saying it can't be registered.
    if (foundUser) {
      return res.status(400).json({ error: "This email already exists." });
    }

    //? If no user is found, we proceed to create a new user:
    //? - by hashing their validated password

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      name: name
        .split(" ")
        .map((name) => name[0].toUpperCase() + name.slice(1))
        .join(" "),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: `${newUser.email} has been successfully registered.` });
  } catch (error) {
    console.error(error);
    //? Check for Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    res.status(500).json({
      error: "Something went wrong. Please try again later or reach support.",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //? Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    //? Finding the user:
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid credentials. Please try again." });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid credentials. Please try again." });
    }

    const token = jwt.sign(
      {
        // user,
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // Using 'expires' property for the Date object (Date objects are not valid for maxAge)
      maxAge: process.env.JWT_MAX_AGE,
    });

    // console.log(token);
    res.status(200).json({
      message: `You have sucessfully logged in!`,
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

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "We could not fetch any user. Please check." });
  }
};

export const fetchCurrentUser = async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = await User.findById(id);

    const currentUser = req.user;

    if (!currentUser) {
      return res.status(404).json({
        error: "We could not find this user. Are you sure it exists?",
      });
    }
    console.log(currentUser);
    res.status(200).json(currentUser);

    // req.json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "We could not fetch the user. Please try again later." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ error: "This account does not exist." });
    }

    res.status(200).json({ message: "User has been deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server Error." });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: `Please select a role.` });
    }

    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({ error: "This user does not exist." });
    }

    if (foundUser.role === "admin" || foundUser.role === "owner") {
      return res.status(409).json({
        error: `${foundUser.name} has already ${foundUser.role} rights.`,
      });
    }

    const udpatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    console.log(`${udpatedUser.name} has now ${udpatedUser.role} rights.`);

    res.status(200).json({
      message: `${udpatedUser.name} has now ${udpatedUser.role} rights.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error." });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "You have been logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error. Please try again later." });
  }
};
