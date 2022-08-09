import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true
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

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
})

module.exports = mongoose.model("Wallet", userSchema);
