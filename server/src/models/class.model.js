import { Schema, model } from "mongoose";

const classSchema = new Schema(
  {
    teacher: { type: String, required: true },
    students: { type: [String], required: true },
    meeting_id: { type: Number, required: true },
    meeting_join_url: { type: String, required: true },
    meeting_start_url: { type: String, required: true },
    meeting_time: { type: Date, required: true },
  },
  { timestamps: true }
);

const Class = model("Class", classSchema);
Class.createIndexes();
export default Class;
