const router = require("express").Router();
const userRoutes = require("./users");
const messageRoutes = require("./messages");
const movieRoutes = require("./movies");
const db = require("../../models");
const passport = require("../../config/passport-setup");

// User/Message/Movie/ routes
router.use("/users", userRoutes);
router.use("/messages", messageRoutes);
router.use("/movies", movieRoutes);

// Route to log a user in
router.post("/login", passport.authenticate("local"), function (req, res) {
    console.log("Back in the redirect!");
    console.log("Req.user is ", req.user);
    console.log(req.session);
    res.status(200).send("user authenticated!");
});

// route to sign up a user
router.post("/signup", function (req, res) {
    console.log('req.body= ' + req.body);
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        avatar: {
            avatarStyle: req.body.avatarStyle,
            topType: req.body.topType,
            accessoriesType: req.body.accessoriesType,
            hairColor: req.body.hairColor,
            facialHairType: req.body.facialHairType,
            facialHairColor: req.body.facialHairColor,
            clotheType: req.body.clotheType,
            clotheColor: req.body.clotheColor,
            graphicType: req.body.graphicType,
            eyeType: req.body.eyeType,
            eyebrowType: req.body.eyebrowType,
            mouthType: req.body.mouthType,
            skinColor: req.body.skinColor
        }
    }).then(function () {
        res.redirect(307, "/api/login");
    }).catch(function (err) {
        console.log(err);
        res.json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
        console.log("user logged out");
});

module.exports = router;