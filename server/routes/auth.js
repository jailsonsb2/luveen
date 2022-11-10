const express = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already existed" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    
    let user = new User({
        name, email, password: hashedPassword,
    })
    user = await user.save();
    res.json(user);
   

  } catch (error) {
    res.status(500).json({error: error.message});
  }
});
// signin route
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    // const token = jwt.sign({ id: user._id }, "passwordKey");
    
    // const token = jwt.sign({id:user._id,}, process.env.JWT_SEC,{expiresIn:"3d"});
    const token = jwt.sign({id:user._id,type:user.type, name:user.name}, process.env.JWT_SEC,{expiresIn:"3d"});
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res)=>{
  try {
    const token = req.header('x-auth-token');
    if(!token) return res.json(false);
  
    const verified = jwt.verify(token, "passwordkey");
    if(!verified) return res.json(false);
  
    // verified ma id xa...coz sigin in garda ko jwt.sign ma has id
    const user = User.findById(verified.id);
    if(!user) return res.json(false);
  
    res.json(true);
    
  } catch (error) {
    res.status(500).json({error: e.message});
  }
 
});

// get user data

authRouter.get("/", auth,async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});


module.exports = authRouter;
