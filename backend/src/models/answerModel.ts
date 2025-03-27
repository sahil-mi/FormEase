import mongoose from "mongoose";
const { Schema } = mongoose;

const AnswersSchema = new Schema(
  {
    question_item: { type: mongoose.Types.ObjectId, ref: "QuestionItem" },
    option: { type: mongoose.Types.ObjectId, required: false, ref: "Options" },
    answer: { type: String, required: false },
  },
  { timestamps: true }
);

const Answers =
  mongoose.models.Answers || mongoose.model("Answers", AnswersSchema);
export default Answers;
