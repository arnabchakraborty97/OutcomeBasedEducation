var Department = require('../models').Department;

module.exports.Index = function(req, res) {

	Department.findAll().then((departments) => res.render('departments/index', { title: 'Departments', departments: departments }))	

}

module.exports.Create = function(req, res) {

	res.render('departments/createOrEdit', { title: 'Create Department' })

}

module.exports.Store = function(req, res) {

	Department.create(req.body).then(() => res.redirect('/departments'))

}

module.exports.Edit = function(req, res) {

	Department.findById(req.params.id).then((department) => 
			res.render('departments/createOrEdit', { title: 'Edit Department', department: department })
		)
	
}

module.exports.Update = function(req, res) {

	Department.findById(req.params.id).then((department) => 
			department.update(req.body).then(() => res.redirect('/departments'))
		)

}

module.exports.Destroy = function(req, res) {

	Department.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/departments'))

}