import mongoose from 'mongoose';

// 1. Define the schema structure
const communicationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['chat', 'feedback'],
    required: true,
  },
  feedbackRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
  feedbackText: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  }
});

// 2. Create the model
const Communication = mongoose.model('Communication', communicationSchema);

// 3. Export the model
export default Communication;
