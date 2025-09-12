import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/User.js";

/**
 * @desc    Get all user
 * @route   GET /api/users
 * @access  protected
 */
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(new ApiResponse(200, users, "Users get successfully."));
});

/**
 * @desc    Get user
 * @route   GET /api/users/:id
 * @access  protected
 */
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res.status(200).json(new ApiResponse(200, user, "User get successfully."));
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  protected
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { avatar, fullName, email } = req.body;

  const user = await User.findById(id).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (email && (await User.findOne({ email, _id: { $ne: id } }))) {
    throw new ApiError(400, "Email is already in use by another account.");
  }

  user.avatar = avatar ?? user.avatar;
  user.fullName = fullName ?? user.fullName;
  user.email = email ?? user.email;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully."));
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  protected
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully."));
});
