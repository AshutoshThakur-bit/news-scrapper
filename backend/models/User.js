const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bookmarks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}]
});

module.exports = mongoose.model('User, userSchema');