// import models
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;

// Render all tool models with their relating models in index
module.exports.Index = function(req, res) {

	if (req.method == 'GET') {

		Course.findAll()
		.then((courses) => {
			res.render('tools/index', {
				title: 'Tools',
				courses: courses
			})
		})

	} else if (req.method == 'POST') {

		Course.findAll()
		.then((courses) => {
			Tool.findAll({
				include: [{
					model: Group,
					where: {
						courseId: req.body.course
					},
					include: [ Course ]
				}]
			}).then((tools) => res.render('tools/index', { 
				title: 'Tools', 
				tools: tools,
				courses: courses,
				course_selected: req.body.course 
			}))
		})

	}

}

// render create page with group models to populate select field
module.exports.Create = function(req, res) {

	Group.findAll({
		include: [ Course ]
	}).then((groups) => res.render('tools/createOrEdit', { title: 'Create Tool', groups: groups }))

}

// Creat tool instances with data supplied and link them to group model
module.exports.Store = function(req, res) {

	Tool.create({
		...req.body,
		groupId: req.body.groupId
	}).then(() => { res.redirect('/tools') })

}

// Render create page with particular Tool model
module.exports.Edit = function(req, res) {

	Group.findAll({
		include: [ Course ]
	}).then((groups) => {

		Tool.findById(req.params.id, { include: [ Group ] }).then((tool) => {
			res.render('tools/createOrEdit', { groups: groups, title: 'Edit Tool', tool: tool })
		})
	})
	
}

// Update particular tool instance
module.exports.Update = function(req, res) {

	Tool.findById(req.params.id).then((tool) => {
		tool.update({
			...req.body,
			groupId: req.body.groupId
		}).then(() => { res.redirect('/tools') })
	})

	

}


// Delete particular tool instance
module.exports.Destroy = function(req, res) {

	Tool.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => { res.redirect('/tools') })

}