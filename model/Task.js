import{ Schema, model, models } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please state your task.'],
      trim: true,
      maxlength: [200, "Task is too long."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { 

    timestamps: true 
  }
);

const Task = models.Task || model('Task', TaskSchema);

export default Task;