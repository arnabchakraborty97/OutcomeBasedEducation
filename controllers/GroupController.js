var Course = require('../models').Course;
var Group = require('../models').Group;

module.exports.Index = function(req, res) {

	Group.findAll({
		include: [Course]
	}).then((groups) => { res.render('groups/index', { title: 'Groups', groups: groups }) })
	

}

module.exports.Create = function(req, res) {

	Course.findAll().then((courses) => {
		res.render('groups/createOrEdit', { courses: courses, title: 'Create Group' })
	})

}

module.exports.Store = function(req, res) {

	Group.create({
		...req.body,
		courseId: req.body.courseId
	}).then(() => { res.redirect('/groups') })

}

module.exports.Edit = function(req, res) {

	Course.findAll().then((courses) => {

		Group.findById(req.params.id, { include: [Course] }).then((group) => {
			res.render('groups/createOrEdit', { courses: courses, title: 'Edit Group', group: group })
		})
	})
	
}

module.exports.Update = function(req, res) {

	Group.findById(req.params.id).then((group) => {
		group.update({
			...req.body,
			courseId: req.body.courseId
		}).then(() => { res.redirect('/groups') })
	})

	

}

module.exports.Destroy = function(req, res) {

	Group.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => { res.redirect('/groups') })

}