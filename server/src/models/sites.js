const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  iconType: {
    type: String,
    default: 'image'
  },
  iconValue: {
    type: String
  },
  originalIcon: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'sites'
});

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
