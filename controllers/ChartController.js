var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;

module.exports.Index = function(req, res) {

	Chart.findAll({
		include: [
			Course,
			ProgramOutcome,
			{
				model: Tool,
				include: [ Group ]
			}
		]
	}).then((charts) => {
		Course.findAll().then((courses) => {
			res.render('charts/index', {
				title: 'Charts',
				charts: charts,
				courses: courses
			})
		})
	})

}

module.exports.Create = function(req, res) {

	Course.findById(req.body.course_id, {
		include: [ {
			model: Group,
			include: [ Tool ]
		} ]
	}).then((course) => {
		ProgramOutcome.findAll().then((programoutcomes) => {
			Tool.findAll({
				include: [{
					model: Group,
					where: {
						courseId: req.body.course_id
					}
				}]
			}).then((tools) => {
				res.render('charts/createOrEdit', {
					title: 'Create Chart',
					tools: tools,
					course: course,
					programoutcomes: programoutcomes
				})
			})
		})
	})

}

module.exports.Store = function(req, res) {

	for (var i = 0; i < req.body.course.length; i++) {

		Chart.create({
			courseId: req.body.course[i],
			toolId: req.body.tool[i],
			programoutcomeId: req.body.programoutcome[i],
			fulfil: req.body.fulfil[i]
		})

	}

	res.redirect('/charts')
}

module.exports.Edit = function(req, res) {

	Chart.findById(req.params.id, {
		include: [ Course, Tool, ProgramOutcome ]
	}).then((chart) => {
		Course.findById(chart.Course.id, {
			include: [ {
				model: Group,
				include: [ Tool ]
			} ]
		}).then((course) => {
			ProgramOutcome.findAll().then((programoutcomes) => {
				res.send({
					title: 'Create Chart',
					chart: chart,
					course: course,
					programoutcomes: programoutcomes
				})
			})
		})
	})
	
}

module.exports.Update = function(req, res) {

	

}

module.exports.Destroy = function(req, res) {

	Chart.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/charts'))

}