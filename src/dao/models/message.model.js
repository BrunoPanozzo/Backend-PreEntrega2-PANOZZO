const mongoose = require('mongoose')

const messagesCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: String,
    message: String    
})

module.exports = mongoose.model(messagesCollection, messageSchema);