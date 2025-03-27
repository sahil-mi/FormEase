import mongoose from "mongoose";
const { Schema } = mongoose;

const FormDocumentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    heading: { type: String, required: true },
    description: { type: String, required: false },
    is_favorite: { type: Boolean, default: false },
    user: { type: mongoose.Types.ObjectId, ref: "AuthUser" },
  },
  { timestamps: true }
);

const FormDocument =
  mongoose.models.FormDocument ||
  mongoose.model("FormDocument", FormDocumentSchema);

export default FormDocument;
