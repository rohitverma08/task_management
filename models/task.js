const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    task_date: {
        type: Date,
        required: true,
    },
    task_assign_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    task_priority: {
        type: String,
        enum: ['Top', 'Hight', 'Middle', 'low'],
        default: 'Middle'
    },
    task_duration: {
        type: Number,
        required: true,
    },
    task_status: {
        type: String,
        enum: ['pending', 'starting', 'complete', 'delete'],
        default: 'pending'
    }
}, {
    timestamps: true,
});
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;