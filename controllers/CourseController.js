// import model
var Course = require('../models').Course;

// Render all courses in index
module.exports.Index = function(req, res) {

	Course.findAll().then(courses => {
		res.render('courses/index', { courses: courses, title: 'Courses' });
	});

}


// Render create page
module.exports.Create = function(req, res) {

	res.render('courses/createOrEdit', { title: 'Create Course' });

}

// Store data from user and create instances of Course
module.exports.Store = function(req, res) {

	Course.create(req.body).then(function () {
		res.redirect('/courses');
	});

}

// Render create based on course_id supplied
module.exports.Edit = function(req, res) {

	Course.findById(req.params.id).then(function(course) {
		var context = {
			title: 'Edit Course',
			course: course
		}

		res.render('courses/createOrEdit', context);
	});
}

// Update the particular instnace with new data
module.exports.Update = function(req, res) {

	Course.findOne({
		where: {
			id: req.params.id
		}
	}).then((course) => {
		course.update(req.body).then(() => res.redirect('/courses'))
	})

}

// Delete particular instance of Course
module.exports.Destroy = function(req, res) {

	Course.destroy({
		where: {
			id: req.params.id
		}
	}).then(function () {
		res.redirect('/courses');
	});

}