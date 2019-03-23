const express=require("express");
// 创建连接池
const mysql=require("mysql")
var pool=mysql.createPool({
  host:"127.0.0.1",
  port:"3306",
  user:"root",
  password:"",
  database:"bbt",
  connectionLimit:20
})
// 创建路由器
var router=express.Router();
// 检查用户名
router.get("/usercheck",(req,res)=>{
	var $uname=req.query.uname;
	if($uname==""){
		res.send("请输入用户名");
		return;
	}
	pool.query("select * from bbt_user where uname=?",[$uname],(err,result)=>{
    console.log(result)
		if(result.length>0){
			res.send("该用户名已存在");
		}else{
			res.send("该用户名可用");
		}
	})
});
// 注册
router.post("/reg",(req,res)=>{
  var obj=req.body;
  if(obj.uname==""){
    res.send("请输入用户名");
		return;
  }
  if(obj.upwd==""){
    res.send("请输入密码");
		return;
  }
  if(obj.user_name==""){
    res.send("请输入昵称");
		return;
  }
  pool.query("INSERT INTO bbt_user SET ?",[obj],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
			res.send({code:200,msg:"add suc"});
		}else{
			res.send({code:300,msg:"add fail"});
		}
  })
})
// 登录
router.post("/login",(req,res)=>{
  var $uname=req.body.uname;
  var $upwd=req.body.upwd
  console.log($uname,$upwd)
  if(!$uname){
    res.send("请输入用户名");
    return;
  }
  if(!$upwd){
    res.send("请输入密码");
    return;
  }
  var sql="select uid from bbt_user where uname=? and upwd=?"
  pool.query(sql,[$uname,$upwd],(err,result)=>{
    if(err) throw err;
    console.log(result);
    if(result.length>0){
      res.send("登录成功")
    }else{
      res.send("用户名或密码错误");
    }
  })
})
// 导出路由器
module.exports=router;