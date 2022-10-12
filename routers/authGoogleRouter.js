const router = require('express').Router();
const passport = require('passport');
require('../config/authGoogleConfig');

//localhost:3001/auth/google (When user click the button)
router.route('/')
    .get(passport.authenticate("google", { scope: ["profile", "email"] }))

//localhost:3001/auth/google/redirect (When google redirect)
router.route('/redirect')
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        res.send(req.user); //user is a by default attribute
    })

module.exports = router;

//Session Based Authentication
//Token Based Authentication