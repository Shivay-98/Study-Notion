const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>{
        console.log("db connected succesfully")
    }).catch((err) =>{
       console.log("db connection fail");
       process.exit(1);
    })
}