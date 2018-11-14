var User = require('../models').User;
var bcrypt = require('bcryptjs');

module.exports.Register = function(req, res) {

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

		if (errors) {
			res.render('users/register', {
				title: 'Register',
				errors: errors
			})
		} else {
			
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

			req.flash('success_msg', 'You are registered and can now login');

			res.redirect('/login');

		}

	}
}

module.exports.Login = function(req, res) {

	if (req.method == 'GET') {
		res.render('users/login', {
			title: 'Login'
		});
	} else if(req.method == 'POST') {
		res.send('yes');
	}
}

module.exports.Logout = function(req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/login');
}