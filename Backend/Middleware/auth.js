import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const verifyAdminRole = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const token = auth.split(" ")[1]; // -> ["Bearer", "token"]

    // console.log(req.headers.authorization);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ error: `This user does not exist.` });
    }

    if (currentUser.role !== "admin" || currentUser.role !== "owner") {
      return res
        .status(403)
        .json({ error: `Permission denied. You don't have admin rights.` });
    }
    console.log(decoded);
    console.log(currentUser);

    req.user = currentUser; //If all the checks are correct, we attach the user to the request object and call
    console.log(req.user);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: `Unauthorized access. Please speak to your admin.` });
  }
};
