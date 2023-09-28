const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
//const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require('path');
const rapp= express();
//connect to mongoose
mongoose
.connect(
    "mongodb+srv://anikineedeb10:Ani8486031929@mongodb-demo.mqjv9oe.mongodb.net/applicationfloweditor?retryWrites=true&w=majority"
)
.then(() => console.log("Db connected"))
.catch(err => console.log(err.message));

//schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
        enum: ["developer","viewer"],
    },
});

//model
const User = mongoose.model("User", userSchema);

//configure session
app.use(
    session({
        secret:'applicationfloweditorhhhh', //signing the cookie
        resave: true, // save the session if not modified
        saveUninitialized: true,
        cookie: {maxage: 60000},
            store: new MongoStore({
            mongoUrl:
                "mongodb+srv://anikineedeb10:Ani8486031929@mongodb-demo.mqjv9oe.mongodb.net/applicationfloweditor?retryWrites=true&w=majority",
            ttl: 24 * 60 * 60, //1 day
        }),
    })
);

rapp.use(
    session({secret: 'your-secret-key', // Change this to a secure random key
    resave: true,
    saveUninitialized: true,
    cookie: { maxage: 60000,secure: false }
})
);


//app.get('./')
//static files
app.use(express.static(__dirname, +"/public"));
//view engine setup ejs
app.set("view engine", "ejs");
//pass json data
app.use(express.json());
//pass form data
app.use(express.urlencoded({ extended: true }));

//auth middleware
const protected = (req, res, next) => {
    if (!req.session.loginUser) {
        return res.render("notAllowed");
    }
    next();
};

//routes (rendering the pages)

//home page
app.get("/", (req, res) => {
    res.render("home");
});

//logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

//login form
app.get("/login", (req, res) => {
    res.render("login");
});

//register form
app.get("/register", (req, res) => {
    res.render("register");
});

//developer mode
//app.get("/build",(req,res)=>{
// Serve static files (your built React app)
    app.use(express.static(path.join(__dirname, '/build')));
    app.get('/developer', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });

    //   app.use(express.static(path.join(__dirname, '/build2')));
    //   app.get('/viewer', (req, res) => {
    //       res.sendFile(path.join(__dirname, 'build2', 'index.html'));
    //     });
    app.use(express.static(path.join(__dirname,'/build2')));
    app.get('/viewer', (req, res) => {
        res.sendFile(path.join(__dirname, 'build2', 'index.html'));
      });

//});
//login logic
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
        // 1. Check if username exists
        const userFound = await User.findOne({ username });
        if (!userFound) {
            return res.json({
                msg: "Invalid login credentials",
            });
        }

        // 2. Check if password is valid
        const isPasswordValid = await bcrypt.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.json({
                msg: "Invalid login credentials",
            });
        }

        // Save the login user into session
        req.session.loginUser = userFound;
        if(userFound.mode == "viewer")
        {
            res.redirect(`/viewer/${userFound._id}`);
        }
        else if(userFound.mode == "developer"){
            res.redirect(`/developer/${userFound._id}`);
        }
});


//Register user
app.post("/register", async (req, res) => {
    const { username, email, password, mode } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const user = await User.create({
        username,
        email,
        password: hashedpass,
        mode,
    });

    //store username and password inside the cookies
    res.cookie("username", user.username);
    res.cookie("password", user.password);
    res.redirect("/login");
});

//viewer
app.get("/viewer/:id", protected, async (req, res) => {
    //find the user by ID
    const user = await User.findById(req.params.id);
    res.render("viewer", { user });
});

//developer
app.get("/developer/:id", protected, async(req, res) => {
    //find the user by ID
    const user = await User.findById(req.params.id);
    res.render("developer",{ user });
});

//listen
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});