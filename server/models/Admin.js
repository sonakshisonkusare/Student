// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true 
  },
  adminInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    department: String,
    designation: String,
    phone: String,
    email: { type: String, required: true },
    profileImage: String,
    permissions: [{ 
      type: String, 
      enum: ['manage_students', 'create_projects', 'view_reports', 'manage_documents'] 
    }]
  },
  createdStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student' 
  }],
  createdProjectGroups: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ProjectGroup' 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

const Admin= mongoose.model('Admin', adminSchema);
//faltu - const User= mongoose.model('User', userSchema);
export default Admin;