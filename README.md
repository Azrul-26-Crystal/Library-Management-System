# Library-Management-System
Library management system to manage library transactions, books, users, and staffs using NodeJs and MySQL as database.

* In this project, we are to build a library management system using JavaScript, and MySQL as the database.

* The system should allow for CRUD operations for books,users and library transactions(lending/returning books)

* Library staffs have certain access limitation to their roles in the system. E.g. Admin can do library transactions, manage books, users and staffs. While librarian can only do library transactions, manage books and users.

* User passwords also need to be properly secured before being saved in the database by using hashing and salting.

* Lastly, proper documentation has been exposed via Swagger.js


## Instructions on how to use Library management system on Node.js.
1. Run "npm install" in the console to install the necessary packages.
2. Create an .env file in the root folder. Inside the folder, insert this information
   * PORT = 3000
   * DB_username = "root"
   * DB_host = "127.0.0.1"
   * DB_password = YOUR_PASSWORD
   * DB_dialect = "mysql"
   * DB_database = "libraryApi"
3. This information can be obtained from your MySQL workbench. If you didn't installed MySQL yet, you can install it first or you can follow next instructions. (Skip until 7 if you have already installed MySQL)
4. If you didn't want to install MySQL, you can use SQLite to create the database. SQLite is easier to use and didn't have to create a server to save the database.
5. Download SQLite/DB Browser and install it.
6. And then open **models** folder in the Library management system, and open **index.js** file. In it, change the information inside the "new Sequelize({}) into this:
   * dialect : "sqlite",
   * storage : "libraryApi"
7. After the database has been initialized, run "npm run dev" in the console to start the server. If you are using MySQL, you can check that the database has been created. If you are using SQLite, you can see that a new "libraryApi" has been created and can be open using DB Browser.
8. Now, to test the system, you can use Insomnia or Postman to test the api. Or you can open the browser and insert this in the url [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Create user account
1. Now to use the system. First you need to create a new user. Scroll down to find Users. Click on the Users to open it, and then choose the one with POST /api/users
2. Click on try it out and modify the username, email, password to suit your user.
3. And then click on execute. And your account should be saved inside the database now.

### Logging in
1. Under the same Users, hover to the one with POST /api/users/login.
2. Follow the same steps as before and fill your email and password, after that click execute.
3. The server will response by saying Login Successful.
4. During this stage, you can access your current profile info, update your profile and log out.
5. Since you have just created this new account. You don't have any access to any other stuff like Admin,Roles and Books.

### Be an admin
1. To be an admin, open the **scripts** folder in the library management system, then open **set-admin.js** file.
2. Inside the bracket in **findUserByID**, change the ID to your user account.
3. You can obtain you user ID by checking under Users GET /api/users, and then click try it out and execute it.
4. After you have finished replacing the ID, run "node set-admin.js" in the console to change you account from User to Admin.
5. Now try to login again with your account and you can see that you become an admin.
6. After you have been an admin, now all the other resources can be accessible by your account.
7. Feel free to check out other content.
