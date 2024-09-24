const { DataTypes } = require("sequelize")
const bcryptjs = require("bcryptjs")

const userModel = (db) =>{
        return db.define("User",{
                id: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4
                },
                username: {
                        type: DataTypes.STRING,
                        allowNull:false,
                        unique: true
                },
                email: {
                        type: DataTypes.STRING,
                        allowNull:false,
                        unique: true
                },
                password: {
                        type: DataTypes.STRING,
                        allowNull:false
                },
                isStaff: {
                        type: DataTypes.BOOLEAN,
                        allowNull:false,
                        defaultValue:false
                }
        },{
                hooks:{
                        beforeSave: async (user) =>{
                                if(user.changed("password")){
                                        const salt = await bcryptjs.genSalt()
                                        const hash = await bcryptjs.hash(user.password,salt) 
                                        user.password = hash
                                }
                        }
                }
        })
}

module.exports = {userModel}

/**
 * @openapi
 * components:
 *      schemas:
 *              CreateUserDto:
 *                      type: object
 *                      properties:
 *                              username:
 *                                      type: string
 *                                      example: Azrul
 *                              email:
 *                                      type: string
 *                                      example: azrul@gmail.com
 *                              password:
 *                                      type: string
 *                                      description: The user's password (Will be hashed before saving)
 *                                      example: password
 * 
 *                      required:
 *                              -username
 *                              -email
 *                              -password
 *              CreateStaffDto:
 *                      type: object
 *                      properties:
 *                              username:
 *                                      type: string
 *                                      example: Azrul
 *                              email:
 *                                      type: string
 *                                      example: azrul@gmail.com
 *                              password:
 *                                      type: string
 *                                      description: The user's password (Will be hashed before saving)
 *                                      example: password
 *                              roleId:
 *                                      type: boolean
 *                                      description: The id of the role created
 * 
 *                      required:
 *                              -username
 *                              -email
 *                              -password
 *                              -roleId
 *              UpdateUserDto:
 *                      type: object
 *                      properties:
 *                              username:
 *                                      type: string
 *                                      example: Azrul
 *                              email:
 *                                      type: string
 *                                      example: azrul@gmail.com
 *                              password:
 *                                      type: string
 *                                      example: password
 * 
 *                      required:
 *              UserInfoDto:
 *                      type: object
 *                      properties:
 *                              email:
 *                                      type: string
 *                                      default: azrul@gmail.com
 *                              password:
 *                                      type: string
 *                                      default: password
 *                      require:
 *                              -email
 *                              -password
 * 
 *              UserDto:
 *                      type: object
 *                      properties:
 *                              id:
 *                                      type: string
 *                              username:
 *                                      type: string
 *                              email:
 *                                      type: string
 *                              password:
 *                                      type: string
 *                              isStaff:
 *                                      type: boolean
 *                              createdAt:
 *                                      type: string
 *                                      format: date
 *                              updatedAt:
 *                                      type: string
 *                                      format: date
 *                              roleId:
 *                                      type: string
 */