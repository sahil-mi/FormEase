import mongoose from "mongoose";
const { Schema } = mongoose;

const StyleSchema = new Schema(
  {
    form_document: { type: mongoose.Types.ObjectId, ref: "FormDocument" },
    question_item: { type: mongoose.Types.ObjectId, ref: "QuestionItem" },
    text_type: { type: Number, required: true }, // 0 - normal,1 - bold, 2-italic
  },
  { timestamps: true }
);

const Style = mongoose.models.Style || mongoose.model("Style", StyleSchema);

export default Style;
