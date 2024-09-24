const { Sequelize } = require("sequelize");
const { bookModel } = require("./book.model");
const { userModel } = require("./user.model");
const { roleModel } = require("./role.model");
const { DB_host,DB_port,DB_username,DB_password,DB_database,DB_dialect } = require("../config/env.config")

const db = new Sequelize({
        host: DB_host,
        port: DB_port,
        username: DB_username,
        password: DB_password,
        database: DB_database,
        dialect : DB_dialect
})

const Book = bookModel(db)
const User = userModel(db)
const Role = roleModel(db)

User.hasMany(Book, {foreignKey:"borrower"})
Book.belongsTo(User, {foreignKey:"borrower"})

Role.hasMany(User, {foreignKey:"roleId"})
User.belongsTo(Role,{foreignKey:"roleId"})

module.exports = {db,Book,User,Role}