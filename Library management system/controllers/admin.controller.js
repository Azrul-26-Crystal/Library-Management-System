const asyncHandler = require("express-async-handler")
const { findManyUsers, createNewUser, findUserByIdAndUpdate, findUserByIdAnddelete, findUserById } = require("../services/user.service")

const getAllStaffHandler = asyncHandler (async (req,res)=>{
        const staff = await findManyUsers({isStaff :true})
        res.json(staff)
})

const createStaffUserHandler = asyncHandler (async (req,res)=>{
        const {roleId,email,username,password} = req.body
        if(!(roleId && email && username && password)) throw new Error("Bad Request, please use all fields")

        const newStaffMember = await createNewUser({roleId,email,username,password,isStaff:true})

        res.status(201).json(newStaffMember)
})

const updateStaffHandler = asyncHandler (async (req,res)=>{
        const {roleId,email,username,password} = req.body

        const Staff = await findUserByIdAndUpdate(req.params.id, {roleId,email,username,password})
        await Staff.save()
        const updatedStaff = await findUserById(Staff.id)
        res.status(202).json(updatedStaff)
})

const deleteStaffHandler = asyncHandler (async (req,res)=>{
        const Staff = await findUserByIdAndUpdate(req.params.id, {isStaff : false})
        Staff.roleId =null
        await Staff.save()
        res.status(202).json(Staff)
})

const getAllUsersHandler = asyncHandler (async (req,res)=>{
        const users = await findManyUsers({})
        res.json(users)
})

const deleteUserHandler = asyncHandler (async (req,res)=>{
        const user = await findUserByIdAnddelete(req.params.id)
        res.status(202).json(user)
})



module.exports = {getAllStaffHandler,createStaffUserHandler,updateStaffHandler,deleteStaffHandler, getAllUsersHandler,deleteUserHandler}