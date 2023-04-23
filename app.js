// Importing necessary packages, including Express, Path, and models and routes.
require("dotenv").config();
const express = require ("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

const URL = require('./models/url');
const staticRouters = require('./routes/staticRouters');
const UserRoute = require('./routes/user');

const {restrictToLoginUserOnly} = require('./middleware/auth');

// Connecting to the MongoDB database with the ConnectMongoose function, which
// returns a promise that resolves when the connection is successful, or rejects with an error if the connection fails.
const {ConnectMongoose} = require('./connect');
ConnectMongoose(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


const URlRoutes = require('./routes/url'); // Importing the URL routes module and setting the port number for the server.
const port = process.env.PORT || 8000; // setting up the port

app.set("view engine","ejs"); // setting ejs as view engine
app.set("views",path.resolve("./views")); // setting up view directory

// Using Express middleware to parse incoming JSON and urlencoded data from HTTP requests.
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Mounting the URL routes and static routes on the app
app.use("/url",restrictToLoginUserOnly,URlRoutes);  
app.use("/user",UserRoute);
app.use("/",staticRouters);

//Setting up a GET route to handle requests to shortened URLs by finding the entry in the 
//database with the corresponding shortId and redirecting to the redirectURL associated with that entry.
app.get('/url/:shortId',async (req,res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({
    shortId
  });
  res.redirect(entry.redirectURL);
});

// Starting the server and logging a message to the console when it starts listening.
app.listen(port,()=> console.log(`server is listining on port ${port}`));
