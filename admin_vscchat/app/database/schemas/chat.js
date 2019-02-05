var Mongoose  = require('mongoose');

var chatSchema = new Mongoose.Schema({
    date:{ type: String},
    username:{type: String},
    content:{type: String}
});

var chatModel = Mongoose.model('chat', chatSchema);

module.exports = chatModel;