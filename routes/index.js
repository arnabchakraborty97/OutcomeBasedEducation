var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

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

var User = require('../models').User;

router.get('/', HomeController.Index);

// User
router.get('/register', UserController.Register);
router.post('/register', UserController.Register);

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

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

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

// Courses
router.get('/courses', CourseController.Index);
router.get('/courses/create', CourseController.Create);
router.post('/courses', CourseController.Store);
router.get('/courses/:id/edit', CourseController.Edit);
router.put('/courses/:id', CourseController.Update);
router.delete('/courses/:id', CourseController.Destroy);

// Groups
router.get('/groups', GroupController.Index);
router.get('/groups/create', GroupController.Create);
router.post('/groups', GroupController.Store);
router.get('/groups/:id/edit', GroupController.Edit);
router.put('/groups/:id', GroupController.Update);
router.delete('/groups/:id', GroupController.Destroy);

// Tools
router.get('/tools', ToolController.Index);
router.get('/tools/create', ToolController.Create);
router.post('/tools', ToolController.Store);
router.get('/tools/:id/edit', ToolController.Edit);
router.put('/tools/:id', ToolController.Update);
router.delete('/tools/:id', ToolController.Destroy);

// Program Outcomes
router.get('/programoutcomes', ProgramOutcomeController.Index);
router.get('/programoutcomes/create', ProgramOutcomeController.Create);
router.post('/programoutcomes', ProgramOutcomeController.Store);
router.get('/programoutcomes/:id/edit', ProgramOutcomeController.Edit);
router.put('/programoutcomes/:id', ProgramOutcomeController.Update);
router.delete('/programoutcomes/:id', ProgramOutcomeController.Destroy);

// Department
router.get('/departments', DepartmentController.Index);
router.get('/departments/create', DepartmentController.Create);
router.post('/departments', DepartmentController.Store);
router.get('/departments/:id/edit', DepartmentController.Edit);
router.put('/departments/:id', DepartmentController.Update);
router.delete('/departments/:id', DepartmentController.Destroy);

// Students
router.get('/students', StudentController.Index);
router.get('/students/create', StudentController.Create);
router.post('/students', StudentController.Store);
router.get('/students/:id/edit', StudentController.Edit);
router.put('/students/:id', StudentController.Update);
router.delete('/students/:id', StudentController.Destroy);

// Charts
router.get('/charts', ChartController.Index);
router.post('/charts/create', ChartController.Create);
router.post('/charts', ChartController.Store);
router.get('/charts/:id/edit', ChartController.Edit);
router.put('/charts/:id', ChartController.Update);
router.delete('/charts/:id', ChartController.Destroy);

// Assessment
router.get('/assessments', AssessmentController.Index);
router.get('/assessments/create', AssessmentController.Create);
router.post('/assessments/create', AssessmentController.Create);
router.post('/assessments', AssessmentController.Store);
router.get('/assessments/:id/edit', AssessmentController.Edit);
router.put('/assessments/:id', AssessmentController.Update);
router.delete('/assessments/:id', AssessmentController.Destroy);

router.get('/reports', ReportsController.Index);
router.post('/reports', ReportsController.Index);

module.exports = router;