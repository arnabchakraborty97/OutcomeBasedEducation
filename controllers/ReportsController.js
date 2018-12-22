var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;
var Student = require('../models').Student;
var Assessment = require('../models').Assessment;
var Department = require('../models').Department;

module.exports.Index = function(req, res) {

	if (req.method == 'GET') {

		Student.findAll({
			include: [ Department ]
		}).then((students) => {
			res.render('reports/index', {
				title: 'Reports',
				students: students
			})
		})
	} else if (req.method == 'POST') {

		Assessment.findAll({
			include: [{
				model: Student,
				where: {
					id: req.body.student
				}
			},
			{
				model: Course,
				where: {
					semester: req.body.semester
				}
			}]
		}).then((assessments) => {

			Student.findAll({
				include: [ Department ]
			}).then((students) => {
				var PO1 = 0, PO2 = 0, PO3 = 0, PO4 = 0, PO5 = 0, PO6 = 0, PO7 = 0, PO8 = 0, PO9 = 0, PO10 = 0, PO11 = 0;
			
				assessments.forEach((assessment) => {

					if (assessment.programoutcomeId == '1')
						PO1 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '2')
						PO2 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '3')
						PO3 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '4')
						PO4 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '5')
						PO5 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '6')
						PO6 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '7')
						PO7 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '8')
						PO8 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '9')
						PO9 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '10')
						PO10 += parseInt(assessment.score);
					else if (assessment.programoutcomeId == '11')
						PO11 += parseInt(assessment.score);

				})

				res.render('reports/index', {
					title: 'Reports',
					students: students,
					assessments: assessments,
					PO1: PO1,
					PO2: PO2,
					PO3: PO3,
					PO4: PO4,
					PO5: PO5,
					PO6: PO6,
					PO7: PO7,
					PO8: PO8,
					PO9: PO9,
					PO10: PO10,
					PO11: PO11,
					student_selected: req.body.student,
					semester_selected: req.body.semester
				})

			})

		})

	}

}