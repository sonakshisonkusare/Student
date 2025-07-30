import mongoose from 'mongoose';

// 1. Define the structure (schema) of your data
const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['attendance', 'taskCompletion', 'documentStats', 'projectProgress'], // you can add more types here
  },
  data: {
    type: Object,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  }
});

// 2. Create the model
const Analytics = mongoose.model('Analytics', analyticsSchema);

// 3. Export the model
export default Analytics;
