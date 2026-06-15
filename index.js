const express = require('express');
const mongoose = require('mongoose');
const app = express();  
const port = 3000;
const path = require('path');
const Chat = require('./models/chat.js');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


main().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
async function  main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

//index route
app.get("/chats",async(req,res) =>{
  let chats = await Chat.find()
  res.render('index.ejs', { chats });
})
//new route
app.get("/chats/new",(req,res) =>{
  res.render('new.ejs');
});
//create route
app.post("/chats",(req,res) =>{
  let {sender, to ,message} = req.body;
  let chat = new Chat({
    sender: sender,
    to: to,
    message: message
  });
  chat.save().then(() => {
    res.redirect('/chats');
  }).catch((error) => {
    console.error('Error saving chat:', error);
    res.status(500).send('Internal Server Error');
  });
});
//edit route
app.get("/chats/:id/edit",async(req,res) =>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render('edit.ejs',{chat});
});
//update route
app.post("/chats/:id",async(req,res) =>{
  let {id} = req.params;
  let {sender, to ,message} = req.body;
  await Chat.findByIdAndUpdate(id,{sender, to ,message});
  res.redirect('/chats');
});
//delete route
app.delete("/chats/:id",async(req,res) =>{
  let {id} = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/chats');
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});