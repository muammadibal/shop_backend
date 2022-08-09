import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    address: String,
    province: Number,
    city: Number,
    zipCode: Number,
    role: [Number],
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Wallet", userSchema);
