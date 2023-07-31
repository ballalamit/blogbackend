const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String, 
    required: true,
  },
  author_id: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    default: null,
  },
}, {
  timestamps: true,
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;
