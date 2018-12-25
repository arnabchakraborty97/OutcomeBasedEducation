var express = require('express');
var router = express.Router();

// Passport imports
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

// controller imports
var HomeController = require('../controllers/HomeController');
var CourseController = require('../controllers/CourseController');
var GroupController = require('../controllers/GroupController');
var ToolController = require('../controllers/ToolController');
var ProgramOutcomeController = require('../controllers/ProgramOutcomeController');
var DepartmentController = require('../controllers/DepartmentController');
var StudentController = require('../controllers/StudentController');
var ChartController = require('../controllers/ChartController');
var AssessmentController = require('../controllers/AssessmentController');
var ReportsController = require('../controllers/ReportsController');
var UserController = require('../controllers/UserController');

// User model import
var User = require('../models').User;

// Index page of whole project
router.get('/', checkAuth, HomeController.Index);

// User
router.get('/register', UserController.Register);
router.post('/register', UserController.Register);

// local strategy to be used in POST login form
passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({
          where: {
            username: username
          }
        }).then((user) => {
			if (!user) {
				return done(null, false, { message: 'Invalid username' });
			}

			bcrypt.compare(password, user.password).then((isMatch) => {
	          if (isMatch) {
				return done(null, user);
			  } else {
			  	console.log(isMatch);
				return done(null, false, { message: 'Invalid password' });
			  }
	        });
        });
	}
));

// user.id is set in session to retrieve later on every request
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// user.id used to check if user is logged in
// The fetched object is attached to the request object as req.user
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser(function(id, done) {
	User.findById(id).then((user) => {
		done(null, user);
	}).catch((err) => {
		done(err, user);
	})
});

router.get('/login', UserController.Login);
router.post('/login', 
	passport.authenticate('local', {
		successRedirect: '/', 
		failureRedirect: '/login', 
		failureFlash: true, 
		successFlash: true
	}),
	UserController.Login);
router.get('/logout', UserController.Logout);

// CheckAuth middleware
function checkAuth(req, res, next) {
  if (!req.session.user && !res.locals.user) {
    return res.redirect('/login');
  } else {
    next();
  }
}


// Courses
router.get('/courses', checkAuth, CourseController.Index);
router.get('/courses/create', checkAuth, CourseController.Create);
router.post('/courses', checkAuth, CourseController.Store);
router.get('/courses/:id/edit', checkAuth, CourseController.Edit);
router.put('/courses/:id', checkAuth, CourseController.Update);
router.delete('/courses/:id', checkAuth, CourseController.Destroy);

// Groups
router.get('/groups', checkAuth, GroupController.Index);
router.get('/groups/create', checkAuth, GroupController.Create);
router.post('/groups', checkAuth, GroupController.Store);
router.get('/groups/:id/edit', checkAuth, GroupController.Edit);
router.put('/groups/:id', checkAuth, GroupController.Update);
router.delete('/groups/:id', checkAuth, GroupController.Destroy);

// Tools
router.get('/tools', checkAuth, ToolController.Index);
router.get('/tools/create', checkAuth, ToolController.Create);
router.post('/tools', checkAuth, ToolController.Store);
router.get('/tools/:id/edit', checkAuth, ToolController.Edit);
router.put('/tools/:id', checkAuth, ToolController.Update);
router.delete('/tools/:id', checkAuth, ToolController.Destroy);

// Program Outcomes
router.get('/programoutcomes', checkAuth, ProgramOutcomeController.Index);
router.get('/programoutcomes/create', checkAuth, ProgramOutcomeController.Create);
router.post('/programoutcomes', checkAuth, ProgramOutcomeController.Store);
router.get('/programoutcomes/:id/edit', checkAuth, ProgramOutcomeController.Edit);
router.put('/programoutcomes/:id', checkAuth, ProgramOutcomeController.Update);
router.delete('/programoutcomes/:id', checkAuth, ProgramOutcomeController.Destroy);

// Department
router.get('/departments', checkAuth, DepartmentController.Index);
router.get('/departments/create', checkAuth, DepartmentController.Create);
router.post('/departments', checkAuth, DepartmentController.Store);
router.get('/departments/:id/edit', checkAuth, DepartmentController.Edit);
router.put('/departments/:id', checkAuth, DepartmentController.Update);
router.delete('/departments/:id', checkAuth, DepartmentController.Destroy);

// Students
router.get('/students', checkAuth, StudentController.Index);
router.get('/students/create', checkAuth, StudentController.Create);
router.post('/students', checkAuth, StudentController.Store);
router.get('/students/:id/edit', checkAuth, StudentController.Edit);
router.put('/students/:id', checkAuth, StudentController.Update);
router.delete('/students/:id', checkAuth, StudentController.Destroy);

// Charts
router.get('/charts', checkAuth, ChartController.Index);
router.post('/charts/create', checkAuth, ChartController.Create);
router.post('/charts', checkAuth, ChartController.Store);
router.get('/charts/:id/edit', checkAuth, ChartController.Edit);
router.put('/charts/:id', checkAuth, ChartController.Update);
router.delete('/charts/:id', checkAuth, ChartController.Destroy);

// Assessment
router.get('/assessments', checkAuth, AssessmentController.Index);
router.get('/assessments/create', checkAuth, AssessmentController.Create);
router.post('/assessments/create', checkAuth, AssessmentController.Create);
router.post('/assessments', checkAuth, AssessmentController.Store);
router.get('/assessments/:id/edit', checkAuth, AssessmentController.Edit);
router.put('/assessments/:id', checkAuth, AssessmentController.Update);
router.delete('/assessments/:id', checkAuth, AssessmentController.Destroy);

// Reports
router.get('/reports/all', checkAuth, ReportsController.All);
router.post('/reports/all', checkAuth, ReportsController.All);
router.get('/reports/studentwise', checkAuth, ReportsController.StudentWise);
router.post('/reports/studentwise', checkAuth, ReportsController.StudentWise);

module.exports = router;