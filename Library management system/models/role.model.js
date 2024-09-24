const { DataTypes } = require("sequelize")

const roleModel = (db) =>{
        return db.define("Role",{
                id: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4
                },
                name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true
                },
                canLendBooks: {
                        type: DataTypes.BOOLEAN,
                        defaultValue:false,
                        allowNull:false
                },
                canManageBooks: {
                        type: DataTypes.BOOLEAN,
                        defaultValue:false,
                        allowNull:false
                },
                canManageStaff: {
                        type: DataTypes.BOOLEAN,
                        defaultValue:false,
                        allowNull:false
                },
                canManageUsers: {
                        type: DataTypes.BOOLEAN,
                        defaultValue:false,
                        allowNull:false
                }
        })
}

module.exports = {roleModel}

/**
 * @openapi
 * components:
 *      schemas:
 *              CreateRoleDto:
 *                      type: object
 *                      properties:
 *                              name:
 *                                      type: string
 *                                      example: librarian
 *                              canLendBooks:
 *                                      type: boolean
 *                                      example: true
 *                              canManageBooks:
 *                                      type: boolean
 *                                      example: true
 *                              canManageStaff:
 *                                      type: boolean
 *                                      example: false
 *                              canManageUsers:
 *                                      type: boolean
 *                                      example: true
 *                      required:
 *                              -name
 * 
 *              UpdateRoleDto:
 *                      type: object
 *                      properties:
 *                              name:
 *                                      type: string
 *                                      example: librarian
 *                              canLendBooks:
 *                                      type: boolean
 *                                      example: true
 *                              canManageBooks:
 *                                      type: boolean
 *                                      example: true
 *                              canManageStaff:
 *                                      type: boolean
 *                                      example: false
 *                              canManageUsers:
 *                                      type: boolean
 *                                      example: false
 *                      required:
 * 
 *              RoleDto:
 *                      type: object
 *                      properties:
 *                              id:
 *                                      type: string
 *                              name:
 *                                      type: string
 *                              canLendBooks:
 *                                      type: boolean
 *                              canManageBooks:
 *                                      type: boolean
 *                              canManageStaff:
 *                                      type: boolean
 *                              canManageUsers:
 *                                      type: boolean
 *                              createdAt:
 *                                      type: string
 *                                      format: date
 *                              updatedAt:
 *                                      type: string
 *                                      format: date
 */