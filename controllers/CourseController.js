var Course = require('../models').Course;

module.exports.Index = function(req, res) {

	Course.findAll().then(courses => {
		res.render('courses/index', { courses: courses, title: 'Courses' });
	});

}

module.exports.Create = function(req, res) {

	res.render('courses/createOrEdit', { title: 'Create Course' });

}

module.exports.Store = function(req, res) {

	Course.create(req.body).then(function () {
		res.redirect('/courses');
	});

}

module.exports.Edit = function(req, res) {

	Course.findOne({
		where: {
			id: req.params.id
		}
	}).then(function(course) {
		var context = {
			title: 'Edit Course',
			course: course
		}

		res.render('courses/createOrEdit', context);
	});
}

module.exports.Update = function(req, res) {

	Course.findOne({
		where: {
			id: req.params.id
		}
	}).then((course) => {
		course.update(req.body).then(() => res.redirect('/courses'))
	})

}

module.exports.Destroy = function(req, res) {

	Course.destroy({
		where: {
			id: req.params.id
		}
	}).then(function () {
		res.redirect('/courses');
	});

}