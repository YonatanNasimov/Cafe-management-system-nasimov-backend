const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = (_id,_role) => {
    let token = jwt.sign({_id,_role},process.env.TOKEN,{expiresIn:"29d"});
    return token
  }
  