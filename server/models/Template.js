import mongoose from 'mongoose';

// 1. Define the schema structure
const templateSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
  },
  templateContent: {
    type: String,
    required: true, // HTML or plain text
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  generatedDocuments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Documents',
    }
  ]
});

// 2. Create the model
const Template = mongoose.model('Template', templateSchema);

// 3. Export the model
export default Template;
