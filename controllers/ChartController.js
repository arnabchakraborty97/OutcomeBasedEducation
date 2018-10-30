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
		res.render('charts/index', { title: 'Charts', charts: charts })
	})

}

module.exports.Create = function(req, res) {

	Course.findById(9, {
		include: [ {
			model: Group,
			include: [ Tool ]
		} ]
	}).then((course) => {
		ProgramOutcome.findAll().then((programoutcomes) => {
			res.render('charts/createOrEdit', {
				title: 'Create Chart',
				course: course,
				programoutcomes: programoutcomes
			})
		})
	})

}

module.exports.Store = function(req, res) {

	res.send(req.body)

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