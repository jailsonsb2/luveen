const mongoose = require('mongoose');
const { productSchema } = require('./product');

const useSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
          validator: (value) => {
            const re =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.match(re);
          },
          message: "Please enter a valid email address",
        },
      },
      password: {
        required: true,
        type: String,
      },
      address:{
        type: String,
        default:'',
      },
      type: {
        type: String,
        default: 'user',
      },
      isAdmin:{
        type:Boolean,
        default: 'false',
      },
        //   cart
      cart: [
        {
          product: productSchema,
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],

    
  
   
}, {timestamps: true}
);
const User = mongoose.model('User', useSchema);
module.exports = User;