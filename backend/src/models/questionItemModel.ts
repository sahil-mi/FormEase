import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionItemSchema = new Schema(
  {
    form_document: { type: mongoose.Types.ObjectId, ref: "FormDocument" },
    question: { type: String, required: true },
    question_type: { type: Number, required: true }, // 0 - short answer, 1 - multiple , 2 - dropdown
    is_required: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const QuestionItem =
  mongoose.models.QuestionItem ||
  mongoose.model("QuestionItem", QuestionItemSchema);

export default QuestionItem;
