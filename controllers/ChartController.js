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

	Course.findById(8, {
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

	
}

module.exports.Update = function(req, res) {

	

}

module.exports.Destroy = function(req, res) {

	

}