const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default:"No exact description available",
    required:true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  createdAt: {  
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false
});

// Optional: add an index if you're frequently querying by status or priority
// TaskSchema.index({ status: 1, priority: 1 });


const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
