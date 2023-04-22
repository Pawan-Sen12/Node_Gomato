const express = require('express')
const router = express.Router()
const Order = require('../Database/Orders')

router.post('/orderData', async (req,res) =>{
    let data = req.body.order_data
    await data.splice(0,0, {Order_data: req.body.order_data})
    let eId = await Order.findOne({'email': req.body.email})
    console.log(eId);
    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                Order_data: [data]
            }).then(()=>{
                res.json({success : true})
            })
        }catch(error){
            console.log(error.message);
            res.send('Server Error')
        }
    }
    else{
        try{
            await Order.findOneAndUpadate({'email': req.body.email},
                {$push:{order_data:data}}).then(()=>{
                    res.json({success:true})
                })
        } catch(error){
            res.send('Server Error')
        }
    }
})

module.exports = router;