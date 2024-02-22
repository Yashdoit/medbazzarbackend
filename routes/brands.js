var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')


//SUBMIT BRANDS 
router.post('/submit_brands',upload.single('brandicon'),function(req,res,next){
    try
    {
        pool.query("insert into brands (brandname,brandicon) values(?,?) ",[req.body.brandname, req.file.filename],function(error,result){
            if(error)
            {
                console.log('ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Brand Submitted Successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})



//DISPLAY ALL BRANDS
router.get('/display_all_brands',function(req,res){
    try
    {
        pool.query("select * from brands where brandid!=0",function(error,result){
            if(error)
            {
                console.log("DATABASE ERROR",error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Success', data:result})
            }
        })
    }
    catch(e)
    {
        console.log("SERVER ERROR",e)
        res.status(200).json({status:false, message:"Server Error: Plz Contact Server Administrator...."})
    }
})


//UPDATE BRANDS DATA
router.post('/edit_brands',function(req,res){
    try
    {
        pool.query("update brands set brandname=? where brandid=?",[req.body.brandname, req.body.brandid],function(error,result){
            if(error)
            {
                console.log('DATABASE ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Brand Updated Successfully'})
            }
        })
    }
    catch(e)
    {
        console.log("SERVER ERROR",e)
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})


//UPDATE BRANDS ICON
router.post('/edit_brandicon',upload.single('brandicon'),function(req,res){
    try
    {
        pool.query("update brands set brandicon=? where brandid=?",[req.file.filename, req.body.brandid],function(error,result){
            if(error)
            {
                console.log('DATABASE ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Icon Updated Successfully'})
            }
        })
    }
    catch(e)
    {
        console.log("SERVER ERROR",e)
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})




//DELETE BRANDS
router.post('/delete_brands',function(req,res){
    try
    {
        pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
            if(error)
            {
                console.log('DATABASE ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Brand Deleted Successfully'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})









module.exports=router;