// scripts/seedData.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const ProjectGroup = require('../models/ProjectGroup');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Student.deleteMany({});
    await ProjectGroup.deleteMany({});
    
    // Create Admin User
    const adminUser = await User.create({
      email: 'admin@mrsac.com',
      password: 'admin123',
      role: 'admin'
    });
    
    // Create Admin Profile
    const admin = await Admin.create({
      userId: adminUser._id,
      adminInfo: {
        firstName: 'John',
        lastName: 'Doe',
        employeeId: 'MRSAC001',
        department: 'IT',
        designation: 'Project Manager',
        phone: '9876543210',
        email: 'admin@mrsac.com',
        permissions: ['manage_students', 'create_projects', 'view_reports']
      }
    });
    
    // Create Student User
    const studentUser = await User.create({
      email: 'student@example.com',
      password: 'student123',
      role: 'student'
    });
    
    // Create Student Profile
    const student = await Student.create({
      userId: studentUser._id,
      studentId: 'STU001',
      createdBy: admin._id,
      personalInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'student@example.com',
        phone: '9876543211'
      },
      academicDetails: {
        university: 'XYZ University',
        course: 'B.Tech CSE',
        semester: 6,
        cgpa: 8.5
      }
    });
    
    // Create Project Group
    const projectGroup = await ProjectGroup.create({
      projectGroupId: 'PG001',
      createdBy: admin._id,
      projectDetails: {
        title: 'E-commerce Website',
        description: 'Build a full-stack e-commerce platform',
        category: 'Web Development',
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
      },
      assignedStudents: [student._id],
      maxStudents: 3,
      technologies: ['React', 'Node.js', 'MongoDB']
    });
    
    // Update student with project group
    await Student.findByIdAndUpdate(student._id, {
      assignedProjectGroup: projectGroup._id
    });
    
    // Update admin with created entities
    await Admin.findByIdAndUpdate(admin._id, {
      $push: {
        createdStudents: student._id,
        createdProjectGroups: projectGroup._id
      }
    });
    
    console.log('Sample data created successfully!');
    console.log('Admin Login: admin@mrsac.com / admin123');
    console.log('Student Login: student@example.com / student123');
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();