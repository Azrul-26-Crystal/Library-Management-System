const { Router } = require("express");
const { createBookHandler, getManyBooksHandler, updateBookHandler, deleteBookHandler, getBookHandler, bookLendingHandler } = require("../controllers/book.controller");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware");

const router = Router()

router.use(isAuthenticated)
router.use(isStaff)

router
        .route("/")
        .post(hasPermission("canManageBooks"),createBookHandler)
        .get(hasPermission("canLendBooks"),getManyBooksHandler)
router
        .route("/:id")
        .patch(hasPermission("canManageBooks"),updateBookHandler)
        .delete(hasPermission("canManageBooks"),deleteBookHandler)
        .get(getBookHandler)

router
        .route("/:id/lend")
        .patch(hasPermission("canLendBooks"),bookLendingHandler)
module.exports = router

/**
 * @openapi
 * /api/books:
 *      get:
 *              tags:
 *                      - Books
 *              summary: Get all the books
 *              responses:
 *                      200:
 *                              description: Success, return all the books in array
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: array
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 *                      500:
 *                              description: Internal server error
 *      post:
 *              tags:
 *                      - Books
 *              summary: Create a new book
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/CreateBookDto"
 *              responses:
 *                      201:
 *                              description: Success, created new book
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 * 
 * /api/books/{id}:
 *      get:
 *              tags:
 *                      - Books
 *              summary: Get a book by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              responses:
 *                      200:
 *                              description: Success, return the book
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: array
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 *                      500:
 *                              description: Internal server error
 *      patch:
 *              tags:
 *                      - Books
 *              summary: Update a book by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/UpdateBookDto"
 *              responses:
 *                      202:
 *                              description: Success, updated the book
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 * 
 *      delete:
 *              tags:
 *                      - Books
 *              summary: Delete a book by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              responses:
 *                      202:
 *                              description: Success, deleted the book
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 *      
 * /api/books/{id}/lend:
 *      patch:
 *              tags:
 *                      - Books
 *              summary: Lend or return book by id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/LendBookDto"
 *              responses:
 *                      202:
 *                              description: Success, transaction completed
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/BookDto"
 */
