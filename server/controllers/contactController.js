const Message = require('../models/Message');

// POST /api/contact  public
exports.createMessage = async(req,res,next)=>{
  try{
    const {name,email,message}=req.body;
    const msg = await Message.create({name,email,message});
    res.status(201).json(msg);
  }catch(e){next(e)}
}
