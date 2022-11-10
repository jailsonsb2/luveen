const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(token, "passwordkey",(err,user)=>{
            if(err) res.status(403).json("token is not valid");
            req.user= user;
            next();
            
        })
    }
    else{
        return res.status(401).json("you are not authenticate");
    }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  };