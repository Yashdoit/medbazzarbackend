var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')


router.post('/submit_subcategory',upload.single('icon'),function(req,res){
    try
    {
        pool.query("insert into subcategory (categoryid,subcategoryname,icon) values(?,?,?) ",[req.body.categoryid, req.body.subcategoryname, req.file.filename],function(error,result){
            if(error)
            {
                console.log('DATABASE ERROR',error)
                res.status(200).json({status:false, message:'Server Error: Plz Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true, message:'Subcategory Submitted Successfully'})
            }
        })
    }
    catch(e)
    {
        console.log('SERVER ERROR',e)
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})



router.get('/display_all_subcategory',function(req,res){
    try
    {
        pool.query(" select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S ",function(error,result){
            if(error)
            {
                console.log('DATABASE ERROR',error)
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
        console.log('SERVER ERROR',e)
        res.status(200).json({status:false, message:'Server Error: Plz Contact Server Administrator....'})
    }
})



router.post('/edit_subcategory',function(req,res){
    try
    {
        pool.query("update subcategory set categoryid=?, subcategoryname=? where (subcategoryid=?) ",[req.body.categoryid, req.body.subcategoryname, req.body.subcategoryid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:"Server Error: Plz Contact Database Administrator..."})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:"Sub Category Updated Successfully..."})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:"Server Error: Plz Contact Server Administrator..."})
    }
})




router.post('/edit_subcategoryicon',upload.single('icon'),function(req,res){
    try
    {
        pool.query("update subcategory set icon=? where subcategoryid=? ",[req.file.filename, req.body.subcategoryid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:"Server Error: Plz Contact Database Administrator..."})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:"Sub Category Icon Updated Successfully..."})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:"Server Error: Plz Contact Server Administrator..."})
    }
})



router.post('/delete_subcategory',function(req,res){
    try
    {
        pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:"Server Error: Plz Contact Database Administrator..."})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:"Sub Category Deleted Successfully..."})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:"Server Error: Plz Contact Server Administrator..."})
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