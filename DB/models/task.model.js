import { Schema, Types, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      minLength: 10,
      maxLength: 300,
    },
    user: {
      type: Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

TaskSchema.pre(/^find/, { document: false, query: true }, function () {
  this.populate([{ path: "user", select: "name email" }]);
});

const TaskModel = model("Task", TaskSchema);

export default TaskModel;
