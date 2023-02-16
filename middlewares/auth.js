const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({msg:"You Need To Send Token To This Endpoint URL"})
  }
  try{
    let decodeToken = jwt.verify(token,process.env.TOKEN);
    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({msg:"Token Invalid OR Expired, Log In Again OR You Hacker!"})
  }
}

exports.authAdmin = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({msg:"You Need To Send Token To This Endpoint URL"})
  }
  try{
    let decodeToken = jwt.verify(token,process.env.TOKEN);
    // check if the role in the token of admin
    if(decodeToken._role != "admin"){
      return res.status(401).json({msg:"Token Invalid OR Expired, code: 3"})
    }
   
    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({msg:"Token Invalid OR Expired, Log In Again OR You Hacker!"})
  }
}
