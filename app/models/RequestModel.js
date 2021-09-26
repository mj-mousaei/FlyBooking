const mongoose = require("mongoose");



  const RequestSchema = new mongoose.Schema(
    {
        user : { type : mongoose.Schema.Types.ObjectId , ref : 'UserModel'},
        orgin : String,
        destination : String,
    }, { timestamps : true }
); 




const RequestModel = mongoose.model('Request', RequestSchema);

module.exports = RequestModel;