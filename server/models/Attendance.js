import mongoose from 'mongoose';

// 1. Define the schema structure
const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: false, // Optional in case the student forgets to check out
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// 2. Create the model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// 3. Export the model
export default Attendance;
