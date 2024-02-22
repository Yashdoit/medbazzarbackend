var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')


router.post('/check_admin_login',function(req,res){
    pool.query("select * from admins where emailid=? and password=? ",[req.body.emailid, req.body.password],function(error,result){
        if(error)
        {
            res.status(200).json({status:false,message:'Server Error: Plz Contact Database Administrator...'})
        }
        else
        {
            if(result.length==1)
            {
                res.status(200).json({status:true,message:'Login successfully',data:result[0]})
            }
            else
            {
                res.status(200).json({status:false,message:'Invalid Emailid/Password'})
            }
        }
    })
})


module.exports = router