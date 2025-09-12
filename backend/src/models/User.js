import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  UserRoles,
  AvailableUserRoles,
  LoginTypes,
  AvailableLoginTypes,
} from "../constants.js";

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      default: null,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoles.USER,
    },
    loginType: {
      type: String,
      enum: AvailableLoginTypes,
      default: LoginTypes.EMAIL,
    },
  },
  { timestamps: true }
);

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
