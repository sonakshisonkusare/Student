// models/Document.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  documentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  belongsTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  
  documentInfo: {
    title: { type: String, required: true },
    description: String,
    fileName: { type: String, required: true },
    originalName: String,
    fileType: String,
    fileSize: Number,
    fileUrl: { type: String, required: true },
    category: { 
      type: String, 
      enum: ['resume', 'certificate', 'report', 'joining_letter', 'id_proof'],
      required: true
    }
  },
  
  uploadedBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['student', 'admin'], required: true }
  },
  
  metadata: {
    tags: [String],
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    verificationDate: Date
  },
  
  status: { 
    type: String, 
    enum: ['active', 'archived', 'rejected'], 
    default: 'active' 
  },
  uploadDate: { type: Date, default: Date.now },
  downloadCount: { type: Number, default: 0 }
}, { 
  timestamps: true 
});

const Document= mongoose.model('Document', documentSchema);
//faltu - const User= mongoose.model('User', userSchema);
export default Document;