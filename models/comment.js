const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    name:  String,
    email:  String,
    text:  String,
    movie_id:  String,
})

module.exports = mongoose.model('Comment', commentSchema )