const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    // const token = req.header("x-auth-token");
    const authHeader = req.header("x-auth-token");
    // console.log(authHeader)
  
      const token = authHeader.split(" ")[1];
    
      // console.log(token);
// 
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });


// FOr image uploadin











    // const verified = jwt.verify(token, "passwordKey");
    const verified = jwt.verify(token, process.env.JWT_SEC);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
// adding new object
// can fetch user id
   let id = req.user = verified.id;
   let username = req.user = verified.name;
   console.log(username);
   console.log(id);
    // var username = req.user=verified.name;
    // console.log(username);
    req.token = token;
    // req.decoded = verified;
    console.log(req.decoded = verified);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;