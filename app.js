require('dotenv').config()

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');

const Movie = require('./models/movie')
const Comment = require('./models/comment')


require('colors');

const app = express();

const mongoAtlas = process.env.MONGO_URI
mongoose.connect(mongoAtlas, (error, client) => {
    if(error){
        throw error
    }
    client.db.databaseName = 'sample_mflix'
    console.log("Connected to `" + process.env.DATABASE_NAME + "`!");
})
mongoose.connection.once('open', () => {
    console.log('conneted to MONGODB Atlas for Graphql'.green);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.get("/", async (request, response) => {
    try {
        response.send({person, comments});
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000'.green);
}); 