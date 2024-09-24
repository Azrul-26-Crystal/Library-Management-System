const { Router } = require("express");
const { isAuthenticated, isStaff, hasPermission } = require("../middleware/access-control.middleware");
const { findAllRoleHandler, createRoleHandler, updateRoleHandler, deleteRoleHandler } = require("../controllers/role.controller");

const router = Router()

router.use(isAuthenticated)
router.use(isStaff)
router.use(hasPermission("canManageStaff"))

router
        .route("/")
        .get(findAllRoleHandler)
        .post(createRoleHandler)

router
        .route("/:id")
        .patch(updateRoleHandler)
        .delete(deleteRoleHandler)

module.exports = router

/**
 * @openapi
 * /api/roles:
 *      get:
 *              tags:
 *                      - Roles
 *              summary: Find all roles
 *              responses:
 *                      200:
 *                              description: Success, return all the roles in array
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      type: array
 *                                                      items:
 *                                                              $ref: "#/components/schemas/RoleDto"
 *                      500:
 *                              description: Internal server error
 *      post:
 *              tags:
 *                      - Roles
 *              summary: Create a new Role
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/CreateRoleDto"
 *              responses:
 *                      201:
 *                              description: Success, created new role
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/RoleDto"
 * 
 * /api/roles/{id}:
 *      patch:
 *              tags:
 *                      - Roles
 *              summary: Update a role by Id
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
 *                                              $ref: "#/components/schemas/UpdateRoleDto"
 *              responses:
 *                      202:
 *                              description: Success, updated the role
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/RoleDto"
 * 
 *      delete:
 *              tags:
 *                      - Roles
 *              summary: Delete a role by Id
 *              parameters:
 *                      - in: path
 *                        name: id
 *                        required: true
 *                        schema:
 *                              type: string
 *              responses:
 *                      202:
 *                              description: Success, deleted the role
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/RoleDto"
 *      
 */
