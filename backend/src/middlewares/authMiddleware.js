import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/User.js";
import { AvailableUserRoles } from "../constants.js";

const requiredAuth = (allowedRoles = []) => {
  if (!allowedRoles.every((role) => AvailableUserRoles.includes(role))) {
    throw new Error("Invalid roles passed to requiredAuth middleware.");
  }

  return asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        throw new ApiError(401, "Invalid or expired token.");
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        throw new ApiError(403, "Forbidden. You don't have permission.");
      }

      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid or expired token.");
    }
  });
};

export default requiredAuth;
