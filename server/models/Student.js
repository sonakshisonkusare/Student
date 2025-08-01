// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  studentId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Admin', 
    required: true 
  },
  assignedProjectGroup: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ProjectGroup',
    default: null
  },
  
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    profileImage: String,
    dateOfBirth: Date,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  
  academicDetails: {
    university: String,
    college: String,
    department: String,
    course: String,
    semester: Number,
    cgpa: { type: Number, min: 0, max: 10 },
    yearOfStudy: Number,
    expectedGraduation: Date
  },
  
  internshipInfo: {
    startDate: Date,
    endDate: Date,
    duration: String,
    status: { 
      type: String, 
      enum: ['active', 'completed', 'on-hold'], 
      default: 'active' 
    },
    stipend: Number,
    mentorName: String,
    mentorEmail: String
  },
  
  skills: [String],
  documents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Document' 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

const Student= mongoose.model('Student', studentSchema);
//faltu - const User= mongoose.model('User', userSchema);
export default Student;