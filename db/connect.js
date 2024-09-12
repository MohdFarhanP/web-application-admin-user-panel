const mongoose = require('mongoose');

const connectdb = async () =>{
    try{
    const mongodb =await mongoose.connect('mongodb://localhost:27017/userAuth');
    console.log('mongodb connected',mongodb.connection.host);
    }catch(error){
        console.error('mongodb connecting error',error)
    }
}
module.exports = connectdb;