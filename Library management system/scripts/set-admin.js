const { createNewRole } = require("../services/role.service")
const { findUserById } = require("../services/user.service")

const setAdmin = async ()=>{
        const admin = await createNewRole({
                name:"admin",
                canLendBooks:true,
                canManageUsers:true,
                canManageStaff:true,
                canManageBooks:true
        })
        const user = await findUserById("4e9a6dbc-6dcb-4521-a3eb-99009170edab")
        user.isStaff = true
        user.roleId = admin.id
        await user.save()

        console.log(user)

}

setAdmin()