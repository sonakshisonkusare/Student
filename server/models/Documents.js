import mongoose from 'mongoose';

// 1. Define the schema structure
const documentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  type: {
    type: String,
    enum: ['noc', 'offerLetter', 'joiningLetter'],
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  submissionStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: null,
  },
  approvedAt: {
    type: Date,
    default: null,
  },
  metadata: {
    type: Object,
    default: {},
  }
});

// 2. Create the model
const Documents = mongoose.model('Documents', documentSchema);

// 3. Export the model
export default Documents;
