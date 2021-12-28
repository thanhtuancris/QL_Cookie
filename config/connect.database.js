const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://adminITVN:ITVNadmin123;;@66.42.59.118:27017/QLCookie?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log('connected to database');
    }catch(e){
        console.log('failed to connect');
    }
}
module.exports = {connect}
