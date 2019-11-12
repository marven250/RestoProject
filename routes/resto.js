const express = require('express');
const router = express.Router();
const Food = require('../models/food');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/menu', (req, res, next) => {
	Food.find({ personal: null }).then((food) => {
		console.log(food);
		res.render('Resto/menu', { food: food });
	});
});

router.get('/about', (req, res, next) => {
	res.render('Resto/about');
});

router.get('/orders', (req, res, next) => {
	res.render('Resto/orders', { theUser: req.session.currentUser });
});

module.exports = router;
