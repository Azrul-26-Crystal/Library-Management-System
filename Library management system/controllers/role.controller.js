const asyncHandler = require("express-async-handler")
const { createNewRole, findRoleByIdAndUpdate, findRoleByIdAnddelete, findManyRoles } = require("../services/role.service")

const createRoleHandler = asyncHandler (async (req,res)=>{
        const {name, ...perms} = req.body
        const role = await createNewRole({name,...perms})
        res.status(201).json(role)
})

const updateRoleHandler = asyncHandler (async (req,res)=> {
        const {name, ...perms} = req.body
        const role = await findRoleByIdAndUpdate(req.params.id, {name, ...perms})
        res.status(202).json(role)
})

const deleteRoleHandler = asyncHandler (async (req,res)=> {
        const {name, ...perms} = req.body
        const role = await findRoleByIdAnddelete(req.params.id)
        res.status(202).json(role)
})

const findAllRoleHandler = asyncHandler (async (req,res)=> {
        const roles = await findManyRoles({})
        res.json(roles)
})

module.exports = {createRoleHandler,updateRoleHandler,deleteRoleHandler,findAllRoleHandler}