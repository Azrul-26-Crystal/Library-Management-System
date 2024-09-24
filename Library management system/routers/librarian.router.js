const { Router } = require("express");
const { getAllUsersHandler, deleteUserHandler } = require("../controllers/admin.controller")
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware");

const router = Router()

router.use(isAuthenticated)
router.use(isStaff)

router
        .route("/users/")
        .get(hasPermission("canManageUsers"),getAllUsersHandler)

router
        .route("/users/:id")
        .delete(hasPermission("canManageUsers"),deleteUserHandler) 

module.exports = router

/**
 * @openapi    
 * /api/librarian/users:
 *      get:
 *              tags:
 *                      - Librarian
 *              summary: Get all the Users
 *              responses:
 *                      200:
 *                              description: Success, return all Users in array
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 *                      500:
 *                              description: Internal server error
 * 
 * /api/librarian/users/{id}:
 *      delete:
 *              tags:
 *                      - Librarian
 *              summary: Delete a User by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              responses:
 *                      202:
 *                              description: Success, deleted the User
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 */
