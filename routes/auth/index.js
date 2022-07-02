const express = require("express");
const router = express.Router();

/*
Full path: prod.singlepage.dk/auth/signin
Protected: No
Purpose: Signin in user, creating accessToken and refreshToken
*/
router.post("/signin", require("./signin"));


/*
Full path: prod.singlepage.dk/auth/refresh
Protected: No
Purpose: Validating refreshToken and generating new accessToken
*/
router.post("/refresh", require("./refresh"));

/*
Full path: prod.singlepage.dk/auth/signup
Protected: No
Purpose: Creating new user document in database
*/
router.post("/signup", require("./signup"));

/*
Full path: prod.singlepage.dk/auth/signout
Protected: No
Purpose: Deleting refreshToken from remote database
*/
router.post("/signout", require("./signout"));

/*
Full path: prod.singlepage.dk/auth/reset
Protected: No
Purpose: Resetting user password using e-mail address.
*/
/* router.post("/reset", require("./reset")); */


/* 
Full path: prod.tribemedia.dk/auth/confirm?token=YOUR_CONFIRMATION_TOKEN
Protected: No
Purpose: Confirming user actions
*/
router.get("/confirm", require("./confirm"));
module.exports = router;