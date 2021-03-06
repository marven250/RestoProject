const router = require('../routes/resto');
const User = require('../models/user');
const Food = require('../models/food');
const bcrypt = require('bcryptjs');
const axios = require('axios');

router.get('/favorites', (req, res, next) => {
	Food.find({ personal: req.session.currentUser.username }).then((foodss) => {
		res.render('Users/favorites', { food: foodss });
	});
});

router.get('/signup', (req, res, next) => {
	res.render('Users/signup');
});

router.get('/adder', (req, res, next) => {
	res.render('Users/adder');
});

router.get('/deleter', (req, res, next) => {
	Food.find().then((food) => {
		res.render('Users/deleter', { food: food });
	});
});

router.post('/deleter/:id', (req, res, next) => {
	const id = req.params.id;
	Food.findByIdAndDelete(id).then((fooder) => {
		Food.find().then((food) => {
			res.render('Users/deleter', { food: food });
		});
	});
});

router.get('/deleteMe/:id', (req, res, next) => {
	res.render('Users/affirm');
});

router.post('/deleteMe/:id', (req, res, next) => {
	const id = req.params.id;
	User.findByIdAndDelete(id).then((account) => {});
	req.session.destroy();
	res.redirect('/');
});

router.post('/adder', (req, res, next) => {
	const title = req.body.title;
	const type = req.body.type;
	const description = req.body.description;
	const image = req.body.image;

	Food.create({
		title       : title,
		type        : type,
		description : description,
		image       : image,
		personal    : null
	}).then((newFood) => {
		res.redirect('/adder');
	});
});

router.get('/edit', (req, res, next) => {
	Food.find({ personal: null }).then((food) => {
		res.render('Users/editor', { food: food });
	});
});

router.get('/details', (req, res, next) => {
	Food.find({ personal: null }).then((food) => {
		res.render('Resto/details', { food: food });
	});
});

router.get('/details/:id', (req, res, next) => {
	const id = req.params.id;
	Food.findById(id).then((food) => {
		let nameFood = food.title.split(' ')[1];
		axios
			.get(
				`https://api.edamam.com/api/food-database/parser?ingr=%20${nameFood}&app_id=9d96839a&app_key=3b781656b4cb29e14fa769d007cc9c93`
			)
			.then((result) => {
				res.render('Resto/detailed', { theFood: result.data.hints[0].food });
			});
	});
});

router.post('/edits/:id', (req, res, next) => {
	const id = req.params.id;

	Food.findByIdAndUpdate(id, {
		title       : req.body.title,
		type        : req.body.type,
		description : req.body.description,
		image       : req.body.image
	})
		.then((foodd) => {
			console.log('sdfkjnsdfknsdkfnsdkfljnsdkfljns', foodd);
			res.redirect('/menu');
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/edits/:id', (req, res, next) => {
	const id = req.params.id;
	Food.findById(id)
		.then((foodd) => {
			res.render('Users/foodEditor', { food: foodd });
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/userAdder', (req, res, next) => {
	res.render('Users/userAdder');
});

router.post('/userAdder', (req, res, next) => {
	const title = req.body.title;
	const type = req.body.type;
	const description = req.body.description;
	const image = req.body.image;

	Food.create({
		title       : title,
		type        : type,
		description : description,
		image       : image,
		personal    : req.session.currentUser.username
	}).then((newFoods) => {
		res.redirect('/profile');
	});
});

router.post('/signup', (req, res, next) => {
	const userName = req.body.theUsername;
	const password = req.body.thePassword;

	const salt = bcrypt.genSaltSync(10);
	const hasher = bcrypt.hashSync(password, salt);

	if (userName === '' || password === '') {
		res.render('Users/signup', {
			errorMessage : 'Please enter both, username and password to sign up.'
		});
		return;
	}
	if (userName[0] !== userName[0].toUpperCase()) {
		res.render('Users/signup', {
			errorMessage : 'Please make sure that first character of username is capitalized.'
		});
		return;
	}
	if (userName.length < 4 || password.length < 4) {
		res.render('Users/signup', {
			errorMessage : 'Please make sure both username and password lengths are greater than 3 characters.'
		});
		return;
	}

	User.create({
		username : userName,
		password : hasher,
		isAdmin  : false
	})
		.then((newUser) => {
			res.redirect('/orders');
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/profile', (req, res, next) => {
	if (req.session.currentUser) {
		res.render('Users/profile', { theUser: req.session.currentUser });
	}
	else {
		res.redirect('/orders');
	}
});

router.get('/login', (req, res, next) => {
	res.render('Users/login');
});

router.post('/login', (req, res, next) => {
	const userName = req.body.username;
	const password = req.body.password;

	if (userName === '' || password === '') {
		res.render('Users/login', {
			errorMessage : 'Please enter both, username and password to login.'
		});
		return;
	}

	User.findOne({ username: userName })
		.then((user) => {
			if (!user) {
				res.render('Users/login', {
					errorMessage : "The username doesn't exist."
				});
				return;
			}
			if (bcrypt.compareSync(password, user.password)) {
				req.session.currentUser = user;
				res.redirect('/profile');
			}
			else {
				res.render('Users/login', {
					errorMessage : 'Incorrect password'
				});
			}
		})
		.catch((error) => {
			next(error);
		});
});

router.post('/logout', (req, res, next) => {
	req.session.destroy();

	res.redirect('/');
});

module.exports = router;
