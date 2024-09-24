const { where } = require("sequelize")
const { User,Book } = require("../models")

const createNewBook = (body) =>{
        return Book.create({...body})
}

const findManyBooks = (searchParams) =>{
        return Book.findAll({where:{...searchParams}})
}

const findBookById =async (id)=>{
        const book = await Book.findByPk(id, {include: [User]})
        if (!book) throw new Error("Book with specified ID doesn't exist")
        return book
}

const findOneBooks = (searchParams) =>{
        return Book.findOne({where:{...searchParams}})
}

const findBookByIdAndUpdate = async (id,body) =>{
        const book = await findBookById(id)
        for(const key of Object.keys(body)){
                book[key] = body[key] ?? book[key]
        }

        await book.save()
        return book
}

const findBookByIdAnddelete = async (id) =>{
        const book = await findBookById(id)
        await book.destroy()
        return book
}

module.exports = {createNewBook,findManyBooks,findBookById,findOneBooks,findBookByIdAndUpdate,findBookByIdAnddelete}