const express = require('express');
const router = express.Router()
const GOMATO = require('../Database/GOMATO');
// const CategoryName = require('../Database/CategoryName')


router.post('/foodData',async(req,res)=>{

   let result =  await GOMATO.find()
    res.send(result)
    console.log(result);
})

module.exports = router;
