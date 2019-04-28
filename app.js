const express = require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');

const app=express();

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
  useMongoClient:true
})
.then(()=>{
console.log('mongodb connected')
})
.catch(err=>console.log(err));



//Handlebars middleware
app.engine('handlebars',exphbs({
  defaultLayout:'main'
}));
app.set('view engine','handlebars');


//INDEX route
app.get('/',(req,res)=>{
  const title='Welcome';
  res.render('index',{
    title: title
  });
});

//ABOUT route
app.get('/about',(req,res)=>{
  // res.send('ABOUT');
  res.render('about');
});






const port=5000;
app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});