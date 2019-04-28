const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//Create Schema
const CoffeeSchema=new Schema({
  drinkType:{
    type:String,
    required:true,
  },
  drinkSize:{
    type:String,
    required:true
  },
  drinkMilk:{
    type:String
  },
  drinkStrength:{
    type:String
  },
  drinkTopping:{
    type:String
  },
  date:{
    type:Date,
    default: Date.now()
  }
});

mongoose.model('coffee',CoffeeSchema);