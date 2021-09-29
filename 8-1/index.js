const { ApolloServer, gql, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { nanoid } = require('nanoid')
const Authors = require('./models/authors')
const Books = require('./models/books')
const User = require('./models/user')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('hey')
    })

const JWT_SECRET = "Secure"

const typeDefs = gql`
type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}
type Author {
    name: String!
    born: Int
    bookCount: Int
}
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
}
type Token {
    value: String!
}
type Query {
    booksCount: Int!
    authorsCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author],
    me: User
}
type Mutation {
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
    addBook(
        title: String!
        published: Int!
        author: String!
        id: String
        genres: [String!]!
    ): Book
    editAuthor(
        name: String!
        bornTo: Int!
    ): Author
}
`

const resolvers = {
    Query: {
        booksCount: () => Books.collection.countDocuments(),
        authorsCount: () => Authors.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre && args.author) {
                return Books.find( { author: args.author, genres: args.genre} )
            }
            else if (args.author) {
                const books = await Books.find({})
                const filteredBooks = books.filter(book => book.author === args.author)
                return filteredBooks
            }
            else if (args.genre) {
                return Books.find( { genres: args.genre })
            }
            return await Books.find({})
        },
        allAuthors: async () => {
            const authors = await Authors.find({})
            return authors
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Book: {
        author: async (root) => {
            const naemOfAuthor = root.author 
            let authorFullDetails;
            authorFullDetails = await Authors.findOne({ name: naemOfAuthor })
            if (!authorFullDetails) {
                authorFullDetails = await Authors.findById( mongoose.Types.ObjectId(root.author) )
            }
            return authorFullDetails
        }
    },
    Author: {
        bookCount: async (root) => {
            const nameOfAuthor = root.name
            const books = await Books.find({})
            const booksOfAuthor = books.filter(book => book.author === nameOfAuthor)
            return booksOfAuthor.length
        }
    },
    Mutation: {
        createUser: async (root, args) => {
            const newUser = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })
            return await newUser.save()
                .catch(error => {
                    UserInputError(error.message, { invalidArgs: args })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== "secret") {
                return UserInputError("Username or password is typed wrongly!")
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, JWT_SECRET ) }
        },
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                return new UserInputError("Unauthorized. Please login to add books!")
            }
            let author = await Authors.findOne({ name: args.author})
            if (!author) {
                author = new Authors({ name: args.author, born: null, bookCount: 1 })
                author.save()
                    .catch(error => {
                        throw new UserInputError((error.message), {
                            invalidArgs: args,
                        })
                    })
            }
            const bookToAdd = new Books({ ...args, author: author._id })
            return await bookToAdd.save()
                .catch (error => {
                    UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                return new UserInputError("Unauthorized. Please login to add books!")
            }
            await Authors.findOneAndUpdate({ name: args.name }, {$set: {born: args.bornTo} })
            const editedAuthor = await Authors.findOne({ name: args.name })
            return editedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify( auth.substring(7), JWT_SECRET )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({url}) => {
    console.log('Serer is ready at ', url)
})