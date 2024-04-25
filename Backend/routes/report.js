const express = require("express");
const db=require('../db')
const fetchuser=require('../middleware/fetchuser')
const router = express.Router();

// Create the report using /createreport api. Login req
router.post("/createreport",fetchuser,async (req,res)=>{
    try{
        const {E_ID, Report}=req.body;
        let sql=`insert into report values(${E_ID},'${Report}','${req.user.id}');`
        db.query(sql,async (err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).send("Internal server error")
            }
            let sql=`update events set Report=1 where E_ID=${E_ID};`
            db.query(sql,(err,result)=>{
                if(err){
                    console.log(err)
                    return res.status(500).send("Internal server error")
                }
            })
            res.send(result)
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
})

// Fetch all reports using /getreport api. Login req
router.get('/getreport/:id',fetchuser,async (req,res)=>{
    let sql=`Call get_report(${req.params.id});`
    try{
     db.query(sql, (err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send("Internal server error");    
        }  
        res.send(result);
    })
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports=router