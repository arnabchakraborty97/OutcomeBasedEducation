// import models
var Course = require('../models').Course;
var Group = require('../models').Group;

// Render all Group models in index with related models
module.exports.Index = function(req, res) {

	if (req.method == 'GET') {

		Course.findAll()
		.then((courses) => {
			res.render('groups/index', {
				title: 'Groups',
				courses: courses
			})
		})

	} else if (req.method == 'POST') {
		Course.findAll()
		.then((courses) => {
			Group.findAll({
				where: {
					courseId: req.body.course
				},
				include: [Course]
			}).then((groups) => { 
				res.render('groups/index', { 
					title: 'Groups', 
					groups: groups,
					courses: courses,
					course_selected: req.body.course
				}) 
			})
		})
	}

	
	

}


// Render create page
module.exports.Create = function(req, res) {

	Course.findAll().then((courses) => {
		res.render('groups/createOrEdit', { courses: courses, title: 'Create Group' })
	})

}

// Create instances of Group bsaed on supplied data and link to Course
module.exports.Store = function(req, res) {

	Group.create({
		...req.body,
		courseId: req.body.courseId
	}).then(() => { res.redirect('/groups') })

}


// Render create page based on Group Id supplied
module.exports.Edit = function(req, res) {

	Course.findAll().then((courses) => {

		Group.findById(req.params.id, { include: [Course] }).then((group) => {
			res.render('groups/createOrEdit', { courses: courses, title: 'Edit Group', group: group })
		})
	})
	
}

// Update the particular group model
module.exports.Update = function(req, res) {

	Group.findById(req.params.id).then((group) => {
		group.update({
			...req.body,
			courseId: req.body.courseId
		}).then(() => { res.redirect('/groups') })
	})

	

}


// Destroy the particular Group model
module.exports.Destroy = function(req, res) {

	Group.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => { res.redirect('/groups') })

}