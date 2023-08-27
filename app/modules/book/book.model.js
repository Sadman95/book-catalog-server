const {Schema, model} = require("mongoose")
const buffer = require("buffer");
const ApiError = require("../../../errors/ApiError")

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
    if (existBook){
        throw new ApiError(409, "Book already exists")
    }
    next()
})

const Book = model("Book", bookSchema)
module.exports = Book