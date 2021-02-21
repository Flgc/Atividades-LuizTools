const express = require('express');
const router =  express.Router();


/* GET login page */
router.get('/', (req, res, next) => {
   res.render('Login', { title: 'Login', message: null});
});

modeule.exports = router;