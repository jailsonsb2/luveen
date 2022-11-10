const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
  testname: String,
  img: {
    // data: Buffer,
    // contentType: String,
    type: String,
    default:"",
  },
  
},{timestamps: true});
const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
