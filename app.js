const express = require('express');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');

const app=express();

//Map global promise - will get rid of warning
mongoose.Promsie=global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev',{
  useMongoClient:true
})
.then(()=>{
console.log('mongodb connected')
})
.catch(err=>console.log(err));

//Load idea model
require('./models/Coffee');
const Coffee=mongoose.model('coffee');

//Handlebars middleware
app.engine('handlebars',exphbs({
  defaultLayout:'main'
}));
app.set('view engine','handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

//INDEX route
app.get('/',(req,res)=>{
  const title='Welcome';
  res.render('index',{
    title: title
  });
});

//ABOUT route
app.get('/about',(req,res)=>{
  res.render('about');
});

//Idea index page
app.get('/orders',(req,res)=>{
  Coffee.find({})
    .sort({date:'desc'})
    .then(orders=>{
      orders.dateDiff=(Date.now() -orders.date);
      console.log(orders.date);
      res.render('orders/index',{
        orders:orders
      });
    });
  
});


//Add Coffee form
app.get('/orders/add',(req,res)=>{
  res.render('orders/add');
});

//Edit Coffee form
app.get('/orders/edit/:id',(req,res)=>{
  Coffee.findOne({
    _id: req.params.id
  })
  .then(orders=>{
    res.render('orders/edit',{
      order:orders
    });
  });
});

//Process Form
app.post('/orders',(req,res)=>{
  let errors=[];

  if(!req.body.drinkType) {
    errors.push({text:'Please add your drink type'});
    
  };
  if(!req.body.drinkSize) {
    errors.push({text:'Please add your drink size'});
  };

  if (errors.length>0){
    res.render('orders/add', {
      errors:errors,
      drinkType:req.body.drinkType,
      drinkSize:req.body.drinkSize,
      drinkMilk: req.body.drinkMilk,
      drinkStrength: req.body.drinkStrength,
      drinkTopping: req.body.drinkTopping
    });
    
  } else {
    const newUser={
      drinkType:req.body.drinkType,
      drinkSize:req.body.drinkSize,
      drinkMilk: req.body.drinkMilk,
      drinkStrength: req.body.drinkStrength,
      drinkTopping: req.body.drinkTopping
    };
    new Coffee(newUser)
      .save() 
      .then(coffee=>{
        console.log(coffee);
        res.redirect('/orders')
      }) 
  }
});

//Edit form process
// app.put('/orders/:id',(req,res)=>{
//   res.send('ok');
//   console.log(order);
// });

app.put('/orders/:id',(req,res)=>{
  Coffee.findOne({
    _id:req.params.id
  })
  .then(orders=>{
    //Change values
    
    console.log("orders.drinkType = " + orders.drinkType);

    // window.addEventListener('load', ()=>{
    //   if (document.getElementById('drinkType').value==orders.drinkType) {
    //     console.log('yes')};
    // }, false);

    orders.drinkType = req.body.drinkType;
    // coffee.title=req.body.title;
    // idea.details=req.body.details;

    orders.save()
      .then(orders=>{
        res.redirect('/orders');
      })
 
  })
});

//Delete Idea
app.delete('/orders/:id',(req,res)=>{
  Coffee.remove({_id: req.params.id})
    .then(()=>{
      res.redirect('/orders');
    })
});

const port=5000;
app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});

