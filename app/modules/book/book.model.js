const {Schema, model} = require("mongoose")
const buffer = require("buffer");

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: true,
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true
    },
    genre: {
        type: String,
        required: [true, "Genre is required"]
    },
    publicationDate: {
        type: Date,
        required: [true, "Publication date is required"]
    },
    featuredImage: {
        type: String,
        contentType: buffer,
        data: String
    }
},
    {
        timestamps: true,
    })

bookSchema.pre("save", async function(next){
    const existBook = await Book.findOne({title: this.title});
    console.log('exist: ', existBook)
    if (existBook){
        const error = new Error("Book already exists")
        error.status = 409
        next(error)
    }
})

const Book = model("Book", bookSchema)
module.exports = Book