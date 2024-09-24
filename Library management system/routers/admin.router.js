const { Router } = require("express")
const { getAllStaffHandler, createStaffUserHandler, updateStaffHandler, deleteStaffHandler, getAllUsersHandler, deleteUserHandler } = require("../controllers/admin.controller")
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware")

const router = Router()

router.use(isAuthenticated)
router.use(isStaff)

router
        .route("/staff")
        .get(hasPermission("canManageStaff"),getAllStaffHandler)
        .post(hasPermission("canManageStaff"),createStaffUserHandler)

router
        .route("/staff/:id")
        .patch(hasPermission("canManageStaff"),updateStaffHandler)
        .delete(hasPermission("canManageStaff"),deleteStaffHandler)

router
        .route("/users/")
        .get(hasPermission("canManageUsers"),getAllUsersHandler)

router
        .route("/users/:id")
        .delete(hasPermission("canManageUsers"),deleteUserHandler) 

module.exports = router

/**
 * @openapi
 * /api/admin/staff:
 *      get:
 *              tags:
 *                      - Admin
 *              summary: Get all the Staffs
 *              responses:
 *                      200:
 *                              description: Success, return all staffs in array
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 *                      500:
 *                              description: Internal server error
 *      post:
 *              tags:
 *                      - Admin
 *              summary: Create a new staff
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/CreateStaffDto"
 *              responses:
 *                      201:
 *                              description: Success, created new staff
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 * 
 * /api/admin/staff/{id}:
 *      patch:
 *              tags:
 *                      - Admin
 *              summary: Update a staff's role by Id
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
 *                                              $ref: "#/components/schemas/UpdateUserDto"
 *              responses:
 *                      202:
 *                              description: Success, updated the staff's role
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 * 
 *      delete:
 *              tags:
 *                      - Admin
 *              summary: Delete a staff by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              responses:
 *                      202:
 *                              description: Success, deleted the Staff
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 *      
 * /api/admin/users:
 *      get:
 *              tags:
 *                      - Admin
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
 * /api/admin/users/{id}:
 *      delete:
 *              tags:
 *                      - Admin
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
