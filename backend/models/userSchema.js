import { Schema, model } from "mongoose";
//Create Schema
const userDataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);
//Create Model
const userData = model("UserData", userDataSchema);
export default userData;