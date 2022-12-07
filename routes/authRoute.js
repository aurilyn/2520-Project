const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const router = express.Router();

router.get("/", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
    "/1",
    passport.authenticate("local", {
        successRedirect: "../reminders",
        failureRedirect: "../login",
    })
);
module.exports = router;