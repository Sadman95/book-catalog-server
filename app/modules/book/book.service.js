const Book = require("./book.model")
const {searchableFields, filterableOptions} = require("./book.constants");
const ApiError = require("../../../errors/ApiError")


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
    const {genres, years} = arra[0]
    return {
        books,
        page,
        limit,
        totalBooks,
    };
}

//get book by _id
const getBookByIdService = async(id) => {
    const book = await Book.findById(id)
    return book;
}

//update book service
const updateBookService = async(id, payload) => {
    const res = await Book.findByIdAndUpdate({_id: id}, payload, {
        new: true,
    })
    return res;
}

//delete book service
const deleteBookService = async(id) =>{
    const isExist = await Book.findBookById(id);
    if(!isExist) throw new ApiError(404, 'Book not found')
    const res = await Book.findByIdAndDelete({_id: id})
    return res;
}

module.exports = {
    createBookService,
    getBooksService,
    getBookByIdService,
    updateBookService,
    deleteBookService
}