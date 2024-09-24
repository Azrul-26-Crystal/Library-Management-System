const { Router } = require("express");
const { signUpHandler, getCurrentUserHandler, logoutUserHandler, updateUserHandler } = require("../controllers/user.controller");
const passport = require("passport");
const { isAuthenticated } = require("../middleware/access-control.middleware");

const router = Router()

router
        .route("/")
        .post(signUpHandler)
        .get(isAuthenticated, getCurrentUserHandler)
        .patch(isAuthenticated, updateUserHandler)

router
        .route("/login")
        .post(passport.authenticate("local"),getCurrentUserHandler)

router.
        route("/logout").
        post(logoutUserHandler)

module.exports = router

/**
 * @openapi
 * /api/users/login:
 *      post:
 *              tags:
 *                      - Users
 *              summary: Logging in
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/UserInfoDto"
 *              responses:
 *                      201:
 *                              description: Success, Logged In
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 * 
 * /api/users:
 *      post:
 *              tags:
 *                      - Users
 *              summary: Create new user
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/CreateUserDto"
 *              responses:
 *                      201:
 *                              description: Success, User created
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 * 
 *      get:
 *              tags:
 *                      - Users
 *              summary: Get current user profile
 *              responses:
 *                      200:
 *                              description: Success, user profile got
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 *                      500:
 *                              description: Internal server error
 *      
 *      patch:
 *              tags:
 *                      - Users
 *              summary: Update user profile
 *              requestBody:
 *                      require: true
 *                      content:
 *                              application/json:
 *                                      schema:
 *                                              $ref: "#/components/schemas/UpdateUserDto"
 *              responses:
 *                      202:
 *                              description: Success, User updated
 *                              content:
 *                                      application/json:
 *                                              schema:
 *                                                      items:
 *                                                              $ref: "#/components/schemas/UserDto"
 *                      
 * 
 * 
 * /api/users/logout:
 *      post:
 *              tags:
 *                      - Users
 *              summary: Logging out
 *              responses:
 *                      200:
 *                              description: Success, Logged out
 */
