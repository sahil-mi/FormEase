import mongoose from "mongoose";
const { Schema } = mongoose;

const AuthUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: false, trim: true },
    password: { type: String, required: false, minlength: 6 },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

const AuthUser =
  mongoose.models.AuthUser || mongoose.model("AuthUser", AuthUserSchema);
export default AuthUser;
