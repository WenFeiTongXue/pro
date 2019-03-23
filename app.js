//创建服务器
const express=require("express");
const server=express();
server.listen(80);
//引入body-parser模块并设置
const bodyParser=require("body-parser");
server.use(bodyParser.urlencoded({
  extended:false
}))
// 挂载静态资源
server.use(express.static("./public"))
//引入路由器并挂载至特定路径
const userRouter=require("./routes/user.js");
server.use("/user",userRouter);