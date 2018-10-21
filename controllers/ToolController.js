var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;

module.exports.Index = function(req, res) {

	Tool.findAll({
		include: [{
			model: Group,
			include: [ Course ]
		}]
	}).then((tools) => res.render('tools/index', { title: 'Tools', tools: tools }))

}

module.exports.Create = function(req, res) {

	Group.findAll({
		include: [ Course ]
	}).then((groups) => res.render('tools/createOrEdit', { title: 'Create Tool', groups: groups }))

}

module.exports.Store = function(req, res) {

	Tool.create({
		...req.body,
		groupId: req.body.groupId
	}).then(() => { res.redirect('/tools') })

}

module.exports.Edit = function(req, res) {

	Group.findAll({
		include: [ Course ]
	}).then((groups) => {

		Tool.findById(req.params.id, { include: [ Group ] }).then((tool) => {
			res.render('tools/createOrEdit', { groups: groups, title: 'Edit Tool', tool: tool })
		})
	})
	
}

module.exports.Update = function(req, res) {

	Tool.findById(req.params.id).then((tool) => {
		tool.update({
			...req.body,
			groupId: req.body.groupId
		}).then(() => { res.redirect('/tools') })
	})

	

}

module.exports.Destroy = function(req, res) {

	Tool.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => { res.redirect('/tools') })

}