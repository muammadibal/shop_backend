import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: [8, "Password min 8 characters"],
      required: true,
    },
    username: String,
    avatar: String,
    address: String,
    province: Number,
    city: Number,
    zipCode: Number,
    role: [{ type: String, default: "user" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", userSchema);
