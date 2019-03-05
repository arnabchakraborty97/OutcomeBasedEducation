// Importing models
var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;


// Rendering chart model in index with all related models
module.exports.Index = function(req, res) {

	if (req.method == 'GET') {

		Course.findAll()
		.then((courses) => {

			res.render('charts/index', {
				title: 'Charts',
				'courses': courses
			})

		})

	} else if (req.method == 'POST') {

		Chart.findAll({
			where: {
				courseId: req.body.course
			},
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
					courses: courses,
					course_selected: req.body.course
				})
			})
		})

	}	

}


// Accept course_id and render group and tools model of that course in create
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
				res.render('charts/create', {
					title: 'Create Chart',
					tools: tools,
					course: course,
					programoutcomes: programoutcomes
				})
			})
		})
	})

}

// Accept fulfil array from user to create multiple instances of Chart in one go
module.exports.Store = function(req, res) {

	for (var i = 0; i < req.body.course.length; i++) {

		Chart.create({
			courseId: req.body.course[i],
			toolId: req.body.tool[i],
			programoutcomeId: req.body.programoutcome[i],
			fulfil: req.body.fulfil[i]
		})

	}

	// Don't need callback as it will redirect only after everything has been taken care of

	res.redirect('/charts')
}


// Incomplete
module.exports.Edit = function(req, res) {

	Chart.findById(req.params.id, {
		include: [ Course, Tool, ProgramOutcome ]
	}).then((chart) => {
		res.render('charts/edit', {
			title: 'Edit Chart',
			chart: chart
		})
	})
	
}

module.exports.Update = function(req, res) {

	Chart.findOne({
		where: {
			id: req.params.id
		}
	}).then((chart) => {
		chart.update({
			fulfil: req.body.fulfil
		}).then(() => res.redirect('/charts'))
	})

}

// Destroy a Chart instance
module.exports.Destroy = function(req, res) {

	Chart.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/charts'))

}