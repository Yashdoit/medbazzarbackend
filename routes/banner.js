var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')


router.post('/submit_banner',upload.any(),function(req,res){
    try
    {
        var files= req.files.map((item)=>{
            return item.filename
        })
        pool.query("insert into banner (bannertype,brandid,picture) values(?,?,?) ",[req.body.bannertype, req.body.brandid, files+""],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact database Administrator....'})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:'Banner Submitted Successfully...'})
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})


module.exports=router