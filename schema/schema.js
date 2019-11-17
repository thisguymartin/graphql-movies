const graphql = require('graphql')
const Movie = require('../models/movie')
const Comment = require('../models/comment')

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLID,  
    GraphQLList,
    GraphQLString,
    GraphQLNonNull 
} = graphql

const MovieType = new GraphQLObjectType({
    name:'Movie',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString }, 
        plot: { type: GraphQLString }, 
        type: { type: GraphQLString }, 
        lastupdated: { type: GraphQLString }, 
        comments: {
            type: MovieCommentType,
            resolve(parent, args) {
                return Comment.find({movie_id: parent.id});
            }
        }
    })
})

const MovieCommentType = new GraphQLObjectType({
    name:'Comment',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString }, 
        email: { type: GraphQLString }, 
        text: { type: GraphQLString }, 
        movie_id: { type: GraphQLID },
        movie: {
            type: MovieType,
            resolve(parent, args) {
                return Movie.findById(parent.movie_id);
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Movie.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find();
            }
        },
        comment: {
            type: MovieCommentType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Comment.findById(args.id);
            }
        },
        comments: {
            type: new GraphQLList(MovieCommentType),
            resolve(parent, args) {
                return Comment.find();
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                plot: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let movie = new Movie({
                    title: args.title,
                    plot: args.plot,
                    type: args.type
                })
                return movie.save();
            }
        },
        addComment:{
            type:MovieCommentType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                email: { type: new GraphQLNonNull(GraphQLString)},
                movie_id: {type: GraphQLID}
            },
            resolve(parent,args){
                let comment = new Comment({
                    name:args.name,
                    email:args.email,
                    movie_id:args.movie_id
                })
                return comment.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})