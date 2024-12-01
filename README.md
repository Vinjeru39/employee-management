# Employee Management Portal

> A portal to sEmployee CRUD operations

## Project Setup

The project uses nodejs and express on the backend.The frontend is written in react.

To be able to run the application on your machine, first install all the necessary packages by running `npm install` in the root folder. Thereafter, navigate to the frontend folder and run the same command there as well. Now, you can start your backend with the command `npm start`. Create another terminal window, navigate to the frontend and run `npm run dev` to start the react server. Now, navigate to the address listed on the terminal to see the sample pages.

### The backend

- First we create a folder e.g _employee-system_ in this case.

- In the folder, we run the `npm init` command. This creates a package.json file.

- Thereafter, we create a server.js file which is our main entry point for the whole system.

- Note that the backend has simply been put in the root directory of the project.

#### The packages currently used on the backend are:

- express: This goes hand in hand with nodejs to create a server.
- dotenv: This allows us to create environmental variables for our sensitive data such as database login credentials.
- nodemon: Allows the server to update the code instantly upon saving.

#### The backend currently has two scripts in the package.json file:

- `start: node server.js` : This allows us to run the command `npm start` on the terminal to start the server. However, everytime we make a change we need to restart the server.
- `dev: nodemon server`: This allows us to run `npm run server` to start the server using the nodemon package for instant updates. NB: Every command that isn't the start command is followed by the term _run_.

#### Structure of the Backend

- server.js file: The main entry point of our application.
- config folder: Will host configuration files mainly the connection to our database.
- model folder: Hosts our models e.g. User, Claim, etc.
- routes folder: Hosts the endpoints the frontend uses to interact with the backend.
- controllers folder: The actual functions that will run after hitting a route. For example, you can have a _getallusers_ controller function.
- data folder: Simple arrays for quickly adding dummy data to the database. For exmaple, we can use this to quickly load some users.
- utils folder: For any helper functions in the backend. For example, a function that changes a date to the format that we want will go in here.
- seeder.js file: This will host the functions for quickly importing and destroying the dummy data in the data folder to our backend. Note that this along side the data folder are not very crucial to our application

### The Frontend

This is created using vite, the modern recommended way of creating react apps. Vite can also be used for libaries like Vue. To create a react app, we run the command `npx create-vite frontend --template react ` in the root folder of our project. This will create the react app in a folder called _frontend_ as specified in the code.

To run the react app, type the command, `npm run dev` in the terminal.

#### The packages used in the Frontend

- bootstrap and react-bootstrap: These two packages go together to allow us to use prebuilt bootstrap components in our react app. Note that you must also add the line `import "bootstrap/dist/css/bootstrap.min.css";` in the main.jsx file for bootstrap to work.

#### Structure of the frontend

- main.jsx is the main entry file of our frontend. For now it simply hosts, the default react code for setting up react-dom.
- App.jsx: This is the second main file in our app. It is called upon by the main.jsx file. It comes with some default boiler-plate web page for React. This is where some of our changes start. At the moment,we are using it to call upon our pages.
- components folder: This is a folder that you normally create in the _src_ folder that comes with react. Here, we create our components such as Headers, Footers, Customized List Items and Forms.
- screens: Another folder we manually create for our pages. Here, you will have a HomePage, LogInPage, etc. These pages will normally make use of some of the components that we create in the components folder.

## Extensions

Some of the VScode extensions you will need to make your development life easier in react include:

- ES7+ React/Redux/React-Native snippets by dsznajder: This allows you to run quick commands such as `rafce` to quickly create a react component.
- Material Icon Theme by Philipp Kief: This display icons next to diiferent folders and file types such as .env, .js, .jsx, etc, making it easier to differentiate them.
- Prettier - Code formatter by Prettier: This is a must have that automatically formats your code for you upon saving.

## Git

In your terminal window, before making any changes to the code please:

- Run `git config --global user.name "John Doe"` and replace John Doe with your actual name.
- Also run `git config --global user.email "john@gmail.com"` and replace *john@gmail.com* with the actual email address for you github account, not the work email.
- If you simply want to check what they are set to at the moment just run `git config --global user.name` and `git config --global user.email`

The whole point of this exercise is to make sure we can easily track changes. We will also discuss using seperate branches to make changes instead of directly changing the main branch.

## Using ES Modules i.e. The import statement

In package.json add the statement: `"type": "module",

## Loading Sample Data

- First create the associated models in the _models_ folder.
- Create a data folder and add sample _.js_ files for the associated data.
- Create a _seeder.js_ file in the root of the backend. Here you write the relevant functions for importing and destroying data.
- Finally, in the _package.json_ file, we create the associated `data:import` and `data:destroy` scripts.

## Routing in Frontend (React-router-dom v6)

- Install _react-router-dom_
- Add the Browser Routes in _main.jsx_
- Add the Outlet in App.jsx
- Install _react-router-bootstrap_ and use the _LinkContainer_ for any links

## APIS with Postman

- Open Postman and Create a New workspace
- Go to _Environments_ tab and create a new one. Create a _baseURL_ variable and set the value e.g. _http://localhost:5002/api_. Now save it.
- On the _Environments_ dropdown near on the top right, choose the environment just created.
- Now go to the API tab, create a new API and name it something like _Claims System API_.
- Create collections corresponding to the models under the API. In the collections, we add the requests.

## State Management with Redux and Redux Toolkit

- In redux, to update state, you have to dispatch an action which is an object that defines what state change we want to make and then the redux store will then run a reducer function to figure out how to update that state based on the action making it harder to update state in the wrong place.
- npm install @reduxjs/toolkit react-redux (the bridge that connects them together)
- First thing is we create a store in the frontend folder i.e store.js
- Now go to the main.jsx file and import the Provider and the store and wrap it around the RouterProvider
- Now, we create a constants.js file for the URLS
- Make sure to have the redux dev-tools extension
- Hereafter, we create slices which is a way to organise our state i.e.. its a collection of reducers and actions that are related to each other. We can create multiple slices in our application and each slice can have its own state.
- When working with backend APIs, you have a route API Slice that the other API slices such as claims and users will extend
- Hence we create a new folder called slices in the src.
- In slices we create a parent slice called apiSlice.js
- Now we go in the store and add in the apiSlice plus some boilerplate related to it

#### Creating the users API Slice

- In the slices folder, create the a file, usersApiSlice.js
- Create queries, mutations, etc as needed.
- Now, we can utilise the queries and mutations from any file we want in the frontend

## Backend Authentication

- Create the relevant controllers in userController.js, link them to the appropriate routes in userRoutes.js and bring the userRoutes into server.js (Remember to update the routes in Postman)
- Install jsonwebtoken, create a generateToken.js file in utils
- We need a package called cookie-parser used in server.js to easily parse the cookie from the request object i.e. it allows us to access our cookies in this case in the authMiddleware by saying, `token = req.cookies.jwt`. (jwt is as we named is in the authUser controller specifically whem setting res.cookie)
- Thereafter, we create our authMiddleware.js
- Next, we create our aunthentication and user-related controllers.

## Frontend Authentication

- First, we create our authSlice which will save the user info to local storage and state as well as removing them in local storage and state. (No API calls here)
- Next, we add the authSlice to our store in store.js
- We now create the usersApiSlice
- Thereafter, we create the Login and Register, etc screens and relevant components where we dispatch our actions from.
- NB: Make sure to include the toast container and related imports in the
  App.jsx file to get toastify to work

#### Private and Admin Routes in Frontend

- First, create a component called PrivateRoute.jsx which basically returns Outlet if there is a user and navigates to the signin page otherwise
- Now, in main.jsx we simply create a route that uses the PrivateRoute and it wraps around all private routes
- The process for admin routes is the same just that we also check the value of the isAdmin property in userInfo
