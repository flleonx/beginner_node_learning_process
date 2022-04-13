
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { fieldsValidator, validateJWT } = require('../middlewares');

const router = Router();

router.post("/login",[
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldsValidator
], login );

router.post("/google",[
  check('id_token', "Google's Token is required").not().isEmpty(),
  fieldsValidator
], googleSignIn );

router.get("/", validateJWT, renewToken );

module.exports = router;