const express = require(`express`);
const Payment = require(`../models/StudentPayments`);

const router= express.Router();

//view
router.route('/report').get((req,res) =>{
    Payment.find().then((Payment)=>{
        res.json({
            success:true,
            existingPayment:Payment

            });
        }).catch((err)=>{
            res.status(400).send('Error of getting the view');
        })
     
})




module.exports=router;