var express = require('express')
var router  = express.Router()
var pool    = require('./pool')


router.get('/display_all_category',function(req,res,next){
    try
    {
        pool.query("select * from category",function(error,result){
            if(error)
            {
                console.log('ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Pls Contact Database Administrator.... '})
            }
            else
            {
                console.log('ERROR',error)
                res.status(200).json({status:true, message:'Success', data:result})
            }
        })
    }
    catch(e)
    {
        console.log('ERROR',e)
        res.status(200).json({status:false, message:'Server Error: Pls Contact Server Administrator.... '})
    }
})


router.post("/fetch_all_subcategory_by_categoryid",function(req,res){
    try
    {
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator...... '})
            }
            else
            {
                res.status(200).json({status:true, message:'success', data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator...... '})
    }
})



module.exports=router  