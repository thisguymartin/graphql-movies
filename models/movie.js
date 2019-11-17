const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String, 
    plot: String, 
    type: String, 
    lastupdated: String,
});

module.exports = mongoose.model('Movie', movieSchema);

