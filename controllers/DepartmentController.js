// import model
var Department = require('../models').Department;

// Render all Department in index
module.exports.Index = function(req, res) {

	Department.findAll().then((departments) => res.render('departments/index', { title: 'Departments', departments: departments }))	

}

// Render create page
module.exports.Create = function(req, res) {

	res.render('departments/createOrEdit', { title: 'Create Department' })

}

// Create instances of Department based on data supplied
module.exports.Store = function(req, res) {

	Department.create(req.body).then(() => res.redirect('/departments'))

}

// Render create page based on Department id supplied
module.exports.Edit = function(req, res) {

	Department.findById(req.params.id).then((department) => 
			res.render('departments/createOrEdit', { title: 'Edit Department', department: department })
		)
	
}

// Update the particular instance of Department
module.exports.Update = function(req, res) {

	Department.findById(req.params.id).then((department) => 
			department.update(req.body).then(() => res.redirect('/departments'))
		)

}


// Delete particular instance of Department
module.exports.Destroy = function(req, res) {

	Department.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/departments'))

}