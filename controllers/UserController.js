// import model
var User = require('../models').User;

// import bcrypt to hash password
var bcrypt = require('bcryptjs');

// Register function
module.exports.Register = function(req, res) {

	// render register form on get
	if (req.method == 'GET') {
		res.render('users/register', {
			title: 'Register'
		});
	} else if (req.method == 'POST') {	

		// Validation
		req.checkBody('name', 'Name is required.').notEmpty();
		req.checkBody('email', 'Email is required.').notEmpty();
		req.checkBody('email', 'Email is not valid.').isEmail();
		req.checkBody('username', 'Username is required.').notEmpty();
		req.checkBody('password', 'Password is required.').notEmpty();
		req.checkBody('password2', 'Passwords do not match.').equals(req.body.password);

		var errors = req.validationErrors();

		// throw error if there is any else create user instance
		if (errors) {
			res.render('users/register', {
				title: 'Register',
				errors: errors
			})
		} else {
			
			// Please refer to bcryptjs documentation
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, hash) => {
					User.create({
						name: req.body.name,
						email: req.body.email,
						username: req.body.username,
						password: hash
					})
				})
			})

			// Flash message
			req.flash('success_msg', 'You are registered and can now login');

			res.redirect('/login');

		}

	}
}


// Login function
module.exports.Login = function(req, res) {

	if (req.method == 'GET') {		// Render form
		res.render('users/login', {
			title: 'Login'
		});
	} else if(req.method == 'POST') {		// This isn't in work
		res.send('yes');
	}
}

// log the user out and flash message
module.exports.Logout = function(req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
}