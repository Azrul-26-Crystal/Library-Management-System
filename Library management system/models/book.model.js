const { DataTypes } = require("sequelize")

const bookModel = (db) =>{
        return db.define("Book",{
                id: {
                        type: DataTypes.UUID,
                        allowNull: false,
                        primaryKey: true,
                        defaultValue: DataTypes.UUIDV4
                },
                title: {
                        type: DataTypes.STRING,
                        allowNull: false
                },
                author: {
                        type: DataTypes.STRING,
                        allowNull: false
                },
                isAvailable: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: true
                }
        })
}

module.exports = {bookModel}

/**
 * @openapi
 * components:
 *      schemas:
 *              CreateBookDto:
 *                      type: object
 *                      properties:
 *                              title:
 *                                      type: string
 *                                      example: An Amazing Book
 *                              author:
 *                                      type: string
 *                                      example: Azrul
 *                              isAvailable:
 *                                      type: boolean
 *                                      default: true
 *                      required:
 *                              -title
 *                              -author
 *                              -isAvailable
 * 
 *              UpdateBookDto:
 *                      type: object
 *                      properties:
 *                              title:
 *                                      type: string
 *                                      example: An Amazing Book
 *                              author:
 *                                      type: string
 *                                      example: Azrul
 *                      required:
 * 
 *              LendBookDto:
 *                      type: object
 *                      properties:
 *                              action:
 *                                      type: string
 *                                      example: lend
 *                              userId:
 *                                      type: string
 *                      required:
 *                              -action
 *                              -userId
 * 
 *              BookDto:
 *                      type: object
 *                      properties:
 *                              id:
 *                                      type: string
 *                              title:
 *                                      type: string
 *                              author:
 *                                      type: string
 *                              isAvailaible:
 *                                      type: boolean
 *                              createdAt:
 *                                      type: string
 *                                      format: date
 *                              updatedAt:
 *                                      type: string
 *                                      format: date
 *                              borrower:
 *                                      type: string
 */