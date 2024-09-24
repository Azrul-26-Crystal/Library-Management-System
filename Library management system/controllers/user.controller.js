const asyncHandler = require("express-async-handler")
const { createNewUser, findUserByIdAndUpdate } = require("../services/user.service")

const signUpHandler = asyncHandler(async (req,res) => {
        const {username,password,email} = req.body
        if(!(username && password && email)) throw new Error("Bad request, username, email and password are required")

        const user = await createNewUser({username,password,email})
        res.status(201).json(user)
})

const getCurrentUserHandler = asyncHandler(async (req,res)=>{
        res.json(req.user)
})

const logoutUserHandler = asyncHandler(async (req,res)=>{
        req.logout((err) =>{
                if (err) throw new Error("unable to logout")
        })
        res.sendStatus(200)
})

const updateUserHandler = asyncHandler(async (req,res)=>{
        const {password,email,username} = req.body
        const user = await findUserByIdAndUpdate(req.user.id,{password,email,username})
        res.json(user)
})

module.exports = {signUpHandler,getCurrentUserHandler,logoutUserHandler,updateUserHandler}