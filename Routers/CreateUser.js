const express = require("express");
const User = require("../Database/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

router.post(
  "/user",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Enter minimum 5 values").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password,salt)

    // let data = new User(req.body);
    // let result = await data.save();
    // result = result.toObject();
    // console.log(result);
    // res.send(result);

    try {
        await User.create({
            name : req.body.name,
            password : setPassword,
            email : req.body.email,
            location : req.body.location
        }).then( res.json({success : true}))

    } catch (error) {
        console.log(error);
        res.json({success : false})

    }
  }
);



module.exports = router;
