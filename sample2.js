const express=require('express');
const app=express();
port=2003;

app.get('/',(req,res)=>{
    res.send('home')
});
app.listen(port,()=>
    console.log(`Ready`));



    