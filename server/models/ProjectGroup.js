// models/ProjectGroup.js
import mongoose from 'mongoose';
const router = express.Router();

const projectGroupSchema = new mongoose.Schema({
  projectGroupId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
  
  projectDetails: {
    title: { type: String, required: true },
    description: String,
    category: String,
    status: { 
      type: String, 
      enum: ['active', 'completed', 'on-hold', 'cancelled'], 
      default: 'active' 
    },
    priority: { 
      type: String, 
      enum: ['high', 'medium', 'low'], 
      default: 'medium' 
    },
    startDate: Date,
    endDate: Date,
    estimatedHours: Number
  },
  
  assignedStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student' 
  }],
  maxStudents: { type: Number, default: 5 },
  currentStudentCount: { type: Number, default: 0 },
  
  requirements: [String],
  technologies: [String],
  
  deliverables: [{
    title: String,
    description: String,
    dueDate: Date,
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed'], 
      default: 'pending' 
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    submissionDate: Date,
    fileUrl: String
  }],
  
  progress: {
    percentage: { type: Number, min: 0, max: 100, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    milestones: [{
      title: String,
      description: String,
      targetDate: Date,
      completedDate: Date,
      status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
    }]
  },
  
  supervisor: {
    name: String,
    email: String,
    department: String
  },
  
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Update student count when students are added/removed
projectGroupSchema.pre('save', function(next) {
  this.currentStudentCount = this.assignedStudents.length;
  next();
});

const ProjectGroup= mongoose.model('ProjectGroup', projectGroupSchema);
// faltu- const User= mongoose.model('User', userSchema);
export default ProjectGroup;