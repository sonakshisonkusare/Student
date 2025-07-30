import mongoose from 'mongoose';

// 1. Define the schema structure
const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  internshipStatus: {
    type: String,
    enum: ['active', 'completed', 'not-started'],
    default: 'not-started',
  },
  internshipDuration: {
    startDate: { type: Date },
    endDate: { type: Date }
  },
  profilePhoto: {
    type: String,
    required: false,
  },
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
const Students = mongoose.model('Students', studentSchema);

// 3. Export the model
export default Students;
