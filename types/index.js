const graphql = require('graphql')
const {
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt, 
    GraphQLList 
} = graphql

const Book = require('../models/book')
const Author = require('../models/author')



// create graphql schema type

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        pages: { type: GraphQLInt },
        author: {
        type: AuthorType,
        resolve(parent, args) {
            return Author.findById(parent.authorID);
        }
    }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({ authorID: parent.id });
            }
        }
    })
})


module.exports = {
    AuthorType,
    BookType
  }

