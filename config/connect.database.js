const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://admin:admin123456@127.0.0.1:27017/QL_Cookie?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        // await mongoose.connect('mongodb://admin:adminXYZdksfn231@127.0.0.1:27017/QL_Cookie?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useFindAndModify: false,
        // });
        console.log('connected to database');
    }catch(e){
        console.log('failed to connect');
    }
}
module.exports = {connect}
