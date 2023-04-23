const mongoose = require("mongoose");

const Urlschema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    }
});

const URL = mongoose.model('url',Urlschema);
module.exports = URL;