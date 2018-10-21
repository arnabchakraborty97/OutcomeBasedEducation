var Student = require('../models').Student;
var Department = require('../models').Department;

module.exports.Index = function(req, res) {

	Student.findAll({
		include: [ Department ]
	}).then((students) => res.render('students/index', { title: 'Students', students: students }))	

}

module.exports.Create = function(req, res) {

	Department.findAll().then((departments) => res.render('students/createOrEdit', { title: 'Create Student', departments: departments } ))

}

module.exports.Store = function(req, res) {

	Student.create({...req.body, departmentId: req.body.departmentId}).then(() => res.redirect('/students'))

}

module.exports.Edit = function(req, res) {

	Student.findById(req.params.id, {
		include: [ Department ]
	}).then((student) => 
			Department.findAll().then((departments) => 
					res.render('students/createOrEdit', {
						title: 'Edit Student',
						student: student,
						departments: departments
					})
				)
		)
	
}

module.exports.Update = function(req, res) {

	Student.findById(req.params.id).then((department) => 
			department.update({ 
				...req.body,
				departmentId: req.body.departmentId 
			}).then(() => res.redirect('/students'))
		)

}

module.exports.Destroy = function(req, res) {

	Student.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/students'))

}