const Book = require("./book.model")
const {searchableFields, filterableOptions} = require("./book.constants");
const ApiError = require("../../../errors/ApiError")
const User = require("../../modules/user/user.model")


//create new book
const createBookService = async (payload) => {
    const book = new Book(payload);
    return await book.save();
}

//get books
const getBooksService = async (filters, searchTerm) => {
    const {page = 1, limit = 10, ...filterableFields} = filters;
    const skip = limit * (Number(page) - 1)
    let andConditions = [];

    if(searchTerm){
        andConditions.push({
            $or: searchableFields.map((key) => (
                {
                    [key]: {
                        $regex: searchTerm,
                        $options: 'i'
                    }
                }
            ))
        })
    }

    if(Object.keys(filterableFields).length){
        for (const key in filterableFields) {

            if(key && filterableFields[key]){
                if(key === 'publicationYear'){
                    andConditions.push({
                        $expr: {
                            $eq: [{ $year: "$publicationDate" }, parseInt(filterableFields[key])]
                        }
                    })
                }
                else{
                    andConditions.push({
                        [key]: filterableFields[key]
                    })
                }
            }
        }
    }

    const whereCondition = andConditions.length > 0 ? {$and: andConditions} : {}

    const books = await Book.find(whereCondition).sort({createdAt: -1}).skip(skip).limit(limit)
    if(!books.length) {
        throw new ApiError(404, "No books found")
    }
    const totalBooks = await Book.countDocuments()

    const arra = await Book.aggregate([
        {
            $group: {
                _id: null,
                genres: { $addToSet: "$genre" },
                years: { $addToSet: { $year: "$publicationDate" } }
            }
        }
    ])
    return {
        books,
        page,
        limit,
        totalBooks,
    };
}

//get book by _id
const getBookByIdService = async(id) => {
    const book = await Book.findById(id).populate({
        path: 'reviews.user',
        model: 'User',
        select: 'firstName lastName username _id',
    })

    return book;
}

//update book service
const updateBookService = async(id, payload) => {
    const isExist = await Book.findBookByProperty("_id", id);
    if(!isExist) throw new ApiError(404, 'Book not found')
    const res = await Book.findByIdAndUpdate({_id: id}, payload, {
        new: true,
    })
    return res;
}

//delete book service
const deleteBookService = async(id) =>{
    const isExist = await Book.findBookByProperty("_id", id);
    if(!isExist) throw new ApiError(404, 'Book not found')
    const res = await Book.findByIdAndDelete({_id: id})
    return res;
}

//add review service
const postReviewService = async(payload) => {
    const isExist = await Book.findBookByProperty("_id", payload.id);
    if(!isExist) throw new ApiError(404, 'Book not found')
    const user = await new User();
    //TODO: user find by payload.user.email//
    const exist = await user.isUserExists("email", payload.user.email);
    if(!exist) {
        throw new ApiError(404, "User doesn't exist")
    }

    const res = await Book.findByIdAndUpdate({_id: payload.id}, {
        $push: { reviews: {
            comment: payload.comment,
            user: exist._id
            } }
    }, {new: true});
    return res;
}

module.exports = {
    createBookService,
    getBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService,
    postReviewService
}