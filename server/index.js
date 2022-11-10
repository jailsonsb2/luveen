const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: './.env'
})
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const prescriptionRouter = require('./routes/prescription');
// const prescriptionRouter = require('./routes/prescription');



const PORT = 3000;
const app = express();
// var username = encodeURIComponent("Samjhana");
// var password = encodeURIComponent("password05#")
// const DB = `mongodb+srv://${username}:${password}@cluster0.hmea1x6.mongodb.net/?retryWrites=true&w=majority`
// const DB = "mongodb+srv://luveen:luveenpassword@cluster0.9hgyzt1.mongodb.net/?retryWrites=true&w=majority";
const DB = "mongodb+srv://luveen:luveenpassword@cluster0.vop3wa1.mongodb.net/?retryWrites=true&w=majority";
//middleware

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
app.use(prescriptionRouter);

// connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`connected at port${PORT}`);
})
