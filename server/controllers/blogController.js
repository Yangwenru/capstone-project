const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// GET all blog public
exports.getBlogPosts = async(req,res,next)=>{
  try{
    const posts = await BlogPost.find({}).populate("author","username").sort({createdAt:-1});
    res.json(posts);
  }catch(e){next(e)}
}

// GET single blog with comments
exports.getBlogPostById = async(req,res,next)=>{
  try{
    const post = await BlogPost.findById(req.params.id).populate("author","username");
    if(!post) return res.status(404).json({message:"Post not found"});
    const comments = await Comment.find({post:post._id}).populate("author","username").sort({createdAt:-1});
    res.json({...post._doc, comments})
  }catch(e){next(e)}
}

// POST create blog protected
exports.createBlogPost = async(req,res,next)=>{
  try{
    const {title,content}=req.body;
    const post = await BlogPost.create({title,content, author:req.user._id})
    await post.populate("author","username")
    res.status(201).json(post);
  }catch(e){next(e)}
}

// PUT update blog only author
exports.updateBlogPost = async(req,res,next)=>{
  try{
    let post = await BlogPost.findById(req.params.id);
    if(!post) return res.status(404).json({message:"Post not found"});
    if(post.author.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized as author"})
    }
    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    await post.populate("author","username");
    res.json(post);
  }catch(e){next(e)}
}

// DELETE blog only author
exports.deleteBlogPost = async(req,res,next)=>{
  try{
    const post = await BlogPost.findById(req.params.id);
    if(!post) return res.status(404).json({message:"Post not found"});
    if(post.author.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"Not authorized as author"})
    }
    await Comment.deleteMany({post:post._id})
    await post.deleteOne();
    res.json({message:"Blog post deleted"})
  }catch(e){next(e)}
}

// get comments for post
exports.getPostComments = async(req,res,next)=>{
  try{
    const comments = await Comment.find({post:req.params.postId}).populate("author","username").sort({createdAt:-1});
    res.json(comments);
  }catch(e){next(e)}
}

// create comment protected
exports.createComment = async(req,res,next)=>{
  try{
    const {body}=req.body;
    const comment = await Comment.create({
      body,
      post: req.params.postId,
      author: req.user._id
    })
    await comment.populate("author","username")
    res.status(201).json(comment);
  }catch(e){next(e)}
}
