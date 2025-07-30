import mongoose from 'mongoose';

// 1. Define the schema structure
const projectSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Students',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasks: [
    {
      name: { type: String, required: true },
      status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
      dueDate: { type: Date, required: false }
    }
  ],
  milestones: [
    {
      name: { type: String, required: true },
      targetDate: { type: Date, required: false },
      status: { type: String, enum: ['pending', 'achieved', 'missed'], default: 'pending' }
    }
  ],
  updates: [
    {
      text: { type: String, required: true },
      date: { type: Date, default: Date.now },
      submittedBy: { type: String, required: true } // could also be ObjectId if linked to User
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// 2. Create the model
const Projects = mongoose.model('Projects', projectSchema);

// 3. Export the model
export default Projects;
