const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app=express();

app.use(cors());
app.use(bodyparser.json());


//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'newton@5400',
    database:'crud',
    port:3306
});

// check db connection
db.connect(err=>{
    if(err) throw err;
    console.log('connected db')
})


//get data
app.get('/det',(req,res)=>{
   let qry= "select * from detail";
   db.query(qry,(err,result)=>{
       if(err) console.log(err,'errors')
       if(result.length>0){
           res.send({
               message:'all user data',
               data:result
           })
       }
   })
})


//get single data
app.get('/det/:id',(req,res)=>{
     let gid = req.params.id;
     let qr=`select * from detail where id = ${gid}`

     db.query(qr,(err,result)=>{
         if(err) throw err;
         if(result.length>0){
             res.send({
                message:' user data',
                data:result
            })
         }else{
             res.send({message:'data not found'})
         }
     })
})


//create data
app.post('/det',(req,res)=>{
    let id= req.body.id;
    let name= req.body.name;
    let email= req.body.email;
    let mobile= req.body.mobile;

    let qr= `insert into detail(id,name,email,mobile)
                                values(${id},'${name}','${email}',${mobile})`;
    db.query(qr,(err,result)=>{
        if(err) throw err;
        res.send({message:'data inserted'})
    })
})


//update single data
app.put('/det/:id',(req,res)=>{
    
    let id= req.body.id;
    let namee= req.body.name;
    let emaill= req.body.email;
    let mobilee= req.body.mobile;

    let qr= `update detail set name='${namee}', email='${emaill}', mobile='${mobilee}'
                            where id=${id}`;
    db.query(qr,(err,result)=>{
        if(err) throw err;
        res.send({message:'data updated'})
    })
})


//delete single data
app.delete('/det/:id',(req,res)=>{
    let gid=req.params.id;

    let qr= `delete from detail where id='${gid}'`;
    db.query(qr,(err,result)=>{
        if(err) throw err;
        res.send({message:'data deleted'})
    })
})




app.listen(300,()=>{
    console.log('running')
})