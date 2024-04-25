const express = require("express");
const db=require('../db')
const fetchuser=require('../middleware/fetchuser')
const router = express.Router();

// Create the result using /createresult api. Login req
router.post("/createresult",fetchuser,async (req,res)=>{
    try{
        const {E_ID,USN,Marks}=req.body
        let sql=`insert into result values('${USN}',${E_ID},${Marks},'${req.user.id}');`
        db.query(sql,async (err,result)=>{
            if(err){
                console.log(err)
                return res.status(500).send("Internal server error")
            }
            res.send(result)
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
})


// Fetch all result using /getresult api. Login req
router.get('/getresult',fetchuser,async (req,res)=>{
    let sql='Select PName,Branch,Sem,EName,Marks,E_ID,USN from result join participants using(USN) join events using(E_ID) order by E_ID desc, marks desc;'
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



router.get('/getspecificresult/:id',fetchuser,async (req,res)=>{

    let sql=`Select PName,Branch,Sem,EName,Marks,E_ID,USN from result join participants using(USN) join events using(E_ID) where E_ID=${req.params.id} order by marks desc;`
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