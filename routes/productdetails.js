var express = require('express')
var router  = express.Router()
var pool    = require('./pool')
var upload  = require('./multer')

router.post('/submit_product_details',upload.any(),function(req,res){
    try
    {
        var files = req.files.map((item)=>{
            return item.filename
        })

        pool.query("insert into productdetails (categoryid,subcategoryid,brandid,productid,productsubname,weight,weighttype,type,packaging,qty,price,offerprice,offertype,description,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",[req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productsubname, req.body.weight, req.body.weighttype, req.body.type, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype, req.body.description,files+""],function(error,result){
            if(error)
            {   
                console.log('DB',req.files)
                res.status(200).json({status:false, message:"Server Error: Plz Contact Database Administrator...."})
            }
            else
            {
                res.status(200).json({status:true, message:"Product Details Submitted Successfully"})
            }
        })
    }
    catch(e)
    {
        console.log('ERROR',e)
        res.status(200).json({status:false, message:"Server Error: Plz Contact Server Administrator...."})
    }
})





router.get("/display_all_product_details",function(req,res){
    try
    {
        pool.query("select PD.*, (select C.categoryname from category C where C.categoryid=PD.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=PD.subcategoryid) as subcategoryname, (select B.brandname from brands B where B.brandid=PD.brandid) as brandname, (select P.productname from products P where P.productid=PD.productid) as productname from productdetails PD ",function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:'success', data:result})
            }
        })
    }
    catch(e)
    {
        console.log(e)
        res.status(200).json({status:false, message:'Server Error: Plz contact Server administrator...'})
    }
})




router.post("/edit_product_details",function(req,res){
    try
    {
        pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=?, productsubname=?, weight=?, weighttype=?, type=?, packaging=?, qty=?, price=?, offerprice=?, offertype=?, description=? where (productdetailid=?) ",[req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productsubname, req.body.weight, req.body.weighttype, req.body.type, req.body.packaging, req.body.qty, req.body.price, req.body.offerprice, req.body.offertype, req.body.description, req.body.productdetailid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:'Product Details Updated Successfully...'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
    }
})



router.post("/edit_product_details_picture",upload.single('picture'),function(req,res){
    try
    {
        pool.query("update productdetails set picture=? where productdetailid=? ", [req.file.filename, req.body.productdetailid], function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:'Product Details Deleted Successfully...'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
    }
})



router.post("/delete_product_details",function(req,res){
    try
    {
        pool.query("delete from productdetails where productdetailid=?",[req.body.productdetailid], function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
            }
            else
            {
                console.log(error)
                res.status(200).json({status:true, message:'Product Details Picture Successfully...'})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false, message:'Server Error: Plz contact database administrator...'})
    }
})





module.exports = router;