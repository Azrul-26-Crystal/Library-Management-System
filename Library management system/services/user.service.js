const { where } = require("sequelize")
const { User,Role } = require("../models")

const createNewUser = (body) =>{
        return User.create({...body})
}

const findManyUsers = (searchParams) =>{
        return User.findAll({where:{...searchParams}})
}

const findUserById =async (id)=>{
        const user = await User.findByPk(id,{include: [Role]})
        if (!user) throw new Error("User with specified ID doesn't exist")
        return user
}

const findOneUser = (searchParams) =>{
        return User.findOne({where:{...searchParams}})
}

const findUserByIdAndUpdate = async (id,body) =>{
        const user = await findUserById(id)
        for(const key of Object.keys(body)){
                user[key] = body[key] ?? user[key]
        }

        await user.save()
        return user
}

const findUserByIdAnddelete = async (id) =>{
        const user = await findUserById(id)
        await user.destroy()
        return user
}

module.exports = {createNewUser,findManyUsers,findUserById,findOneUser,findUserByIdAndUpdate,findUserByIdAnddelete}