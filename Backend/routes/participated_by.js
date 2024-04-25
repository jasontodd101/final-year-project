const express = require("express");
const db=require('../db')
const fetchuser=require('../middleware/fetchuser')
const router = express.Router();

// Store the participated_by data using /participatedby api. Login req

router.post("/participatedby",fetchuser,(req,res)=>{
    try{
    const E_ID=req.body.E_ID
    let sql=`insert into participated_by values(${E_ID},"${req.user.id}")`
    db.query(sql,async(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).send("Internal server error");    
        }
        res.send({USN:req.user.id})
    })
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})



router.get("/getevents",fetchuser,(req,res)=>{
  try{
  let sql=`select E_ID from participated_by where PUSN='${req.user.id}'`
  db.query(sql,async(err,result)=>{
      if(err){
          console.log(err)
          return res.status(500).send("Internal server error");    
      }
      res.send(result)
  })
}  catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error");
}

})




module.exports=router