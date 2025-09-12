import axios from "axios";
import { google } from "googleapis";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/User.js";
import { LoginTypes } from "../constants.js";

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  public
 */
export const register = asyncHandler(async (req, res) => {
  const { avatar, fullName, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "Email already registered.", []);
  }

  const user = await User.create({
    avatar,
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  const token = user.generateToken();

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser, token },
        "Users registered successfully."
      )
    );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid Email or password.");
  }

  if (user.loginType !== LoginTypes.EMAIL) {
    throw new ApiError(
      400,
      "You have previously registered using " +
        user.loginType?.toLowerCase() +
        ". Please use the " +
        user.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid Email or password.");
  }

  const loggedInUser = await User.findById(user._id).select("-password");
  const token = user.generateToken();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User logged in successfully."
      )
    );
});

/**
 * @desc    Google login
 * @route   POST /api/auth/google
 * @access  public
 */
export const googleLogin = asyncHandler(async (req, res) => {
  const { code } = req.query;

  const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
  );

  const googleRes = await oauthClient.getToken(code);
  oauthClient.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  const { name, email, picture } = userRes.data;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      avatar: picture,
      fullName: name,
      email,
      loginType: LoginTypes.GOOGLE,
    });
  }

  if (user.loginType !== LoginTypes.GOOGLE) {
    throw new ApiError(
      400,
      "You have previously registered using " +
        user.loginType?.toLowerCase() +
        ". Please use the " +
        user.loginType?.toLowerCase() +
        " login option to access your account."
    );
  }

  const loggedInUser = await User.findById(user._id).select("-password");
  const token = user.generateToken();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "User logged in successfully."
      )
    );
});

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  protected
 */
export const me = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "Get current user successfully."));
});

/**
 * @desc    Upload avatar
 * @route   POST /api/auth/avatar
 * @access  public
 */
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Avatar image is required.");
  }

  const imageUrl = `${req.protocol}://${req.host}/images/${req.file.filename}`;
  res
    .status(200)
    .json(new ApiResponse(200, imageUrl, "Image uploaded successfully."));
});
