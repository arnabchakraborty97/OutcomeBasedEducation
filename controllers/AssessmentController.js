// Importing all models

var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;
var Student = require('../models').Student;
var Assessment = require('../models').Assessment;


// Render all assessments(including relation models) in index
module.exports.Index = function(req, res) {

	res.render('assessments/index', {
		title: 'Assessments',
	})

}


// Handle both get and post in same controller
// Accept course_id to find corressponding chart.
// Render chart and accept score in create
module.exports.Create = function(req, res) {

	if (req.method == 'GET') {
		Course.findAll().then((courses) => {
			res.render('assessments/createOrEdit', {
				title: 'Create Assessment',
				courses: courses
			})
		})
	} else if (req.method == 'POST') {

		Chart.findAll({
			where: {
				courseId: req.body.course_id
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
			Course.findAll().then((courses) => {
				Course.findById(req.body.course_id).then((course) => {
					Student.findAll({
						where: {
							batch_of: req.body.batch
						}
					}).then((students) => {
						res.render('assessments/createOrEdit', {
							title: 'Create Assessment',
							courses: courses,
							charts: charts,
							course_selected: course,
							students: students,
							batch_selected: req.body.batch
						})
					})
				})
			})
		})
	}

}


// Load the corressponding chart and make new assessment records based on score input
module.exports.Store = function(req, res) {

	console.log(req.body.score);
	
	Course.findById(req.body.course).then((course) => {
		Chart.findAll({
			where: {
				courseId: req.body.course
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
			var c = 0
			var ch = []

			charts.forEach((chart) => {
				if (chart.fulfil != "")
					ch.push(chart);
			})

			Assessment.findAll({
				where: {
					studentId: req.body.student,
					courseId: req.body.course,
				}
			}).then((assessments) => {
				if (Object.keys(assessments).length) {
					for (var i = 0; i < assessments.length; i++) {
						if (ch[i].fulfil == 'S') {
							assessments[i].update({
								score: req.body.score[c++]
							})
						} else if (ch[i].fulfil == 'M') {
							assessments[i].update({
								score: 0.6 * parseInt(req.body.score[c++])
							})
						} else if (ch[i].fulfil == 'W') {
							assessments[i].update({
								score: 0.2 * parseInt(req.body.score[c++])
							})
						}
					}
				} else {
					charts.forEach((chart) => {
						if (chart.fulfil == 'S') {
							Assessment.create({
								score: req.body.score[c++],
								studentId: req.body.student,
								courseId: req.body.course,
								programoutcomeId: chart.ProgramOutcome.id
							})
							// console.log('Score: ' + req.body.score[c++] + ', ProgramOutcome: ' + chart.ProgramOutcome.id)
						} else if (chart.fulfil == 'M') {
							Assessment.create({
								score: 0.6 * parseInt(req.body.score[c++]),
								studentId: req.body.student,
								courseId: req.body.course,
								programoutcomeId: chart.ProgramOutcome.id
							})
						} else if (chart.fulfil == 'W') {
							Assessment.create({
								score: 0.2 * parseInt(req.body.score[c++]),
								studentId: req.body.student,
								courseId: req.body.course,
								programoutcomeId: chart.ProgramOutcome.id
							})
						}
					})
				}
			})

			res.redirect('/assessments')

		})
	})

}

module.exports.Edit = function(req, res) {

	
}

module.exports.Update = function(req, res) {

	

}

// Delete assessment

module.exports.Destroy = function(req, res) {

	Assessment.destroy({
		where: {
			id: req.params.id
		},
	}).then(() => {
		res.redirect('/assessments')
	})

}