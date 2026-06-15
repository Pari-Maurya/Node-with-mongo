const mongoose = require('mongoose');
const Chat = require('./models/chat.js');


main().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
async function  main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsApp');
}

let allChats = [
  {
    sender: 'Alice',
    to: 'Bob',
    message: 'Hello, Bob!',
    created_at: new Date(),
  },
  {
    sender: 'Bob',
    to: 'Alice',
    message: 'Hi, Alice! How are you?',
    created_at: new Date(),
  },
  {
    sender: 'Charlie',
    to: 'Alice',
    message: 'Hey Alice, are you coming to the party?',
    created_at: new Date(),
  },
  {
    sender: "Mohan",
    to: "Sohan",
    message: "Hey Sohan, how's it going?",
    created_at: new Date(),
  },
  {
    sender: "Sohan",
    to: "Mohan",
    message: "Hi Mohan, I'm doing well! How about you?",
    created_at: new Date(),
  }
];

Chat.insertMany(allChats);

