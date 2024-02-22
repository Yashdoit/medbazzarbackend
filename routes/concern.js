var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')


router.post('/submit_concern',upload.single('picture'),function(req,res){
    try
    {
        pool.query("insert into concern (concernname,picture) values(?,?) ",[req.body.concernname, req.file.filename],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Concern Admitted Successfully....'})
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.status(200).json({status:false, message:'Server Error: Plz contact server administrator....'})
    }
})




router.get('/display_all_concern',function(req,res){
    try
    {
        pool.query("select * from concern",function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator....'})
            }
            else
            {
                res.status(200).json({status:true, data:result, message:'Success....'})
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.status(200).json({status:false, message:'Server Error: Plz contact server administrator....'})
    }
})





module.exports=router