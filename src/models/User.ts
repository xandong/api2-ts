import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  nickname: String,
  age: Number,
});

export const User = mongoose.model("User", userSchema);
