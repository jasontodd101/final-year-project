const express=require('express');
const db=require('./db')
db.connect((err)=>{
    if(err){
    throw err;}
    else {console.log("My sql connected");}
})
var cors = require('cors')
var app = express()


app.use(cors())
const port = 5000
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
app.use('/api/result', require('./routes/result'))
app.use('/api/report', require('./routes/report'))
app.use('/api/participation', require('./routes/participated_by'))

db.query('drop trigger if exists set_result;')
db.query('create trigger set_result '+
'AFTER INSERT ON result '+
'for each row '+
'begin '+
'update events set Result=Result+1 where E_ID=new.E_ID; End;')

app.listen(port,()=>{
    console.log('Server running on port https://localhost:5000')
})

db.query('drop procedure if exists get_report;')
db.query("CREATE PROCEDURE get_report("+
'EvntID int) '+
'BEGIN '+
'Select r.E_ID,r.Report,r.USN,e.EName from report r join events e using(E_ID) where E_ID=EvntID; '+
'END')

