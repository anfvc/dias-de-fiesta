import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const verifyAdminRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // -> ["Bearer", "token"]

    console.log(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        error: `Permission denied. We haven't received a token from the server.`,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ error: `This user does not exist.` });
    }

    if (currentUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: `Permission denied. You don't have admin rights.` });
    }

    console.log(req.user);

    req.user = currentUser; //If all the checks are correct, we attach the user to the request object and call
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: `Unauthorized access. Please speak to your admin.` });
  }
};
