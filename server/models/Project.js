const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  imageUrl: {type:String},
  repoUrl: {type:String},
  liveUrl: {type:String},
  user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}
})
module.exports = mongoose.model('Project', projectSchema);
