const mongoose = require('mongoose');

// serverless 环境下缓存连接，避免每次冷启动重复连接
let cached = global._mongooseConn;

const connectDB = async ()=>{
  if (cached && mongoose.connection.readyState === 1) return cached;
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    cached = conn;
    global._mongooseConn = conn;
    console.log(`Mongo Connected: ${conn.connection.host}`)
    return conn;
  }catch(err){
    console.error(err);
    // 本地开发直接退出；serverless 环境不能 process.exit
    if (!process.env.VERCEL) process.exit(1);
  }
}
module.exports = connectDB;
