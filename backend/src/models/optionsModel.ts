import mongoose from "mongoose";
const { Schema } = mongoose;

const OptionsSchema = new Schema(
  {
    question_item: { type: mongoose.Types.ObjectId, ref: "QuestionItem" },
    option: { type: String, required: true },
  },
  { timestamps: true }
);

const Options =
  mongoose.models.Options || mongoose.model("Options", OptionsSchema);
export default Options;
