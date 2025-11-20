import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token; //get the token from cookies

    if (!token) {
      return res
        .status(401)
        .json({
          error: "Access denied. No token provided. Please log in.",
          name: "NoToken",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id).select(
      "id name email role"
    ); //? telling DB to only return these fields
    // console.log("decoded:", decoded);
    // console.log("currentUser:", currentUser);

    if (!currentUser) {
      res.clearCookie("token");
      return res.status(401).json({ error: `This user does not exist.` });
    }
    req.user = currentUser; //If all the checks are correct, we attach the user to the request object and call
    // console.log(req.user);
    next();
  } catch (error) {
    // console.log(error);
    res.clearCookie("token");

    if (error.name === "TokenExpiredError") {
      //* 1. Clear expired token:
      res.clearCookie("token");

      //* 2. Sending specific error to the frontend:
      return res.status(401).json({
        name: "TokenExpiredError",
        error: "Session has expired. Please log in again.",
      });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

export const verifyRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: "We could not verify your role. Please log in again.",
        });
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: `Permission denied. You need ${allowedRoles.join(
            " or "
          )} rights to perform this action.`,
        });
      }

      next();
    } catch (error) {
      res
        .status(401)
        .json({ error: `Unauthorized access. Please speak to your admin.` });
    }
  };
};
