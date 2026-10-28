const Project = require('../models/Project');

// GET all public
exports.getProjects = async(req,res,next)=>{
  try{
    const projects = await Project.find({}).populate("user","username").sort({createdAt:-1});
    res.json(projects);
  }catch(e){next(e)}
}

// GET single
exports.getProjectById = async(req,res,next)=>{
  try{
    const project = await Project.findById(req.params.id).populate("user","username");
    if(!project) return res.status(404).json({message:"Project not found"});
    res.json(project);
  }catch(e){next(e)}
}

// POST create protected
exports.createProject = async(req,res,next)=>{
  try{
    const {title,description,imageUrl,repoUrl,liveUrl}=req.body;
    const project = await Project.create({
      title,description,imageUrl,repoUrl,liveUrl,
      user: req.user._id
    })
    res.status(201).json(project);
  }catch(e){next(e)}
}

// PUT update protected
exports.updateProject = async(req,res,next)=>{
  try{
    let project = await Project.findById(req.params.id);
    if(!project) return res.status(404).json({message:"Not found"});
    // only owner
    if(project.user.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized"})
    }
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    res.json(project);
  }catch(e){next(e)}
}

// DELETE protected
exports.deleteProject = async(req,res,next)=>{
  try{
    const project = await Project.findById(req.params.id);
    if(!project) return res.status(404).json({message:"Not found"});
    if(project.user.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized"})
    }
    await project.deleteOne();
    res.json({message:"Project removed"})
  }catch(e){next(e)}
}
