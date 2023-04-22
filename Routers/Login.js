
const express = require("express");
const User = require("../Database/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const jwtSecret = "mffefdjfdfdfdlkfjdfdjfdlfjdf"

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Enter minimum 5 values").isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
let email = req.body.email;

try{


  let userData = await User.findOne({email});

  if(!userData){
    return res.status(400).json({errors : 'try again'})
  }
   
  const jwsCompare = await bcrypt.compare(req.body.password,userData.password);
  if(jwsCompare){
    return res.status(400).json({errors : 'try again pawan'})
  }

    const data = {
      user :  {
        id : userData.id
      }
    }

    const authToken = jwt.sign(data,jwtSecret)
  return res.json({success : true,authToken:authToken })

}

catch(error){
  console.log(error);
  res.json({success : false})
}
    
  });
  module.exports = router;