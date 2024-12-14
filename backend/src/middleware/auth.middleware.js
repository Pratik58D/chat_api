import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwtCookie;
    // console.log("this is token", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("this is decoded", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauathorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protected middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
