var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;
var Student = require('../models').Student;
var Assessment = require('../models').Assessment;


module.exports.Index = function(req, res) {

	Assessment.findAll({
		include: [Student, Course, ProgramOutcome]
	}).then((assessments) => {
		res.render('assessments/index', {
			title: 'Assessments',
			assessments: assessments
		})
	})

}

module.exports.Create = function(req, res) {

	Chart.findAll({
		where: {
			courseId: 9
		},
		include: [
			Course,
			ProgramOutcome,
			{
				model: Tool,
				include: [Group]
			}
		]
	}).then((charts) => {
		Course.findById(9).then((course) => {
			Student.findAll().then((students) => {
				res.render('assessments/createOrEdit', {
					title: 'Create Assessment',
					charts: charts,
					course: course,
					students: students
				})
			})
		})
	})

}

module.exports.Store = function(req, res) {

	res.send(req.body)

}

module.exports.Edit = function(req, res) {

	
}

module.exports.Update = function(req, res) {

	

}

module.exports.Destroy = function(req, res) {

	Assessment.destroy({
		where: {
			id: req.params.id
		},
	}).then(() => {
		res.redirect('/assessments')
	})

}