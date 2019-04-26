const express = require('express');
const exphbs=require('express-handlebars');


const app=express();

//Handlebars middleware
app.engine('handlebars',exphbs({
  defaultLayout:'main'
}));
app.set('view engine','handlebars');


//INDEX route
app.get('/',(req,res)=>{
  // res.send('INDEX');
  res.render('index');
});

//ABOUT route
app.get('/about',(req,res)=>{
  res.send('ABOUT');
});






const port=5000;
app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});