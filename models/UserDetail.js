const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

const userDetailSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    avatar: String,
    province: Number,
    city: Number,
    zipCode: Number
  },
  { timestamps: true }
);

// userDetailSchema.pre("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
// });

module.exports = mongoose.model("User", userDetailSchema);
