// Import models
var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;
var Student = require('../models').Student;
var Assessment = require('../models').Assessment;
var Department = require('../models').Department;
//FileSystem and json2csv for CSV export
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;



// Function to handle 'Report for all' requests
// Render the form page on get request
// Calling createP on multiple student instances 
// and calculating their who PO scores along 
// with average by using the semester supplied
// Pxa are verical averages for each PO (can surely be done in a better way)
// createP uses a callback function 
// in order to go through all assessment 
// instances before next statements are executed
module.exports.All = function(req, res) {

	if (req.method == 'GET') {

		return res.render('reports/all', { title: 'All Reports' })

	} else if (req.method == 'POST') {

		

		Student.findAll({
			where: {
				batch_of: req.body.batch
			}
		}).then((students) => {

			// Sending all students of the batch and supplied semester value to createP
			// to create PO arrays with total PO scores of each student along with
			// their horizontal averages(avg)
			createP(students, req.body.semester, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11) => {

				createTotalWeight(req.body.semester, (P) => {

					var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;
					var avg = [];


					for(var i = 0; i < P1.length; i++) {
						P1[i] = Math.round(((P1[i] * 100)/P[0]) * 100)/100;
						P1a += P1[i];
					}
					P1a = Math.round((P1a/P1.length) * 100)/100;

					for(var i = 0; i < P2.length; i++) {
						P2[i] = Math.round(((P2[i] * 100)/P[1]) * 100)/100;
						P2a += P2[i];
					}
					P2a = Math.round((P2a/P2.length) * 100)/100;

					for(var i = 0; i < P3.length; i++) {
						P3[i] = Math.round(((P3[i] * 100)/P[2]) * 100)/100;
						P3a += P3[i];
					}
					P3a = Math.round((P3a/P3.length) * 100)/100;

					for(var i = 0; i < P4.length; i++) {
						P4[i] = Math.round(((P4[i] * 100)/P[3]) * 100)/100;
						P4a += P4[i];
					}
					P4a = Math.round((P4a/P4.length) * 100)/100;

					for(var i = 0; i < P5.length; i++) {
						P5[i] = Math.round(((P5[i] * 100)/P[4]) * 100)/100;
						P5a += P5[i];
					}
					P5a = Math.round((P5a/P5.length) * 100)/100;


					for(var i = 0; i < P6.length; i++) {
						P6[i] = Math.round(((P6[i] * 100)/P[5]) * 100)/100;
						P6a += P6[i];
					}
					P6a = Math.round((P6a/P6.length) * 100)/100;

					for(var i = 0; i < P7.length; i++) {
						P7[i] = Math.round(((P7[i] * 100)/P[6]) * 100)/100;
						P7a += P7[i];
					}
					P7a = Math.round((P7a/P7.length) * 100)/100;

					for(var i = 0; i < P8.length; i++) {
						P8[i] = Math.round(((P8[i] * 100)/P[7]) * 100)/100;
						P8a += P8[i];
					}
					P8a = Math.round((P8a/P8.length) * 100)/100;
					
					for(var i = 0; i < P9.length; i++) {
						P9[i] = Math.round(((P9[i] * 100)/P[8]) * 100)/100;
						P9a += P9[i];
					}
					P9a = Math.round((P9a/P9.length) * 100)/100;

					for(var i = 0; i < P10.length; i++) {
						P10[i] = Math.round(((P10[i] * 100)/P[9]) * 100)/100;
						P10a += P10[i];
					}
					P10a = Math.round((P10a/P10.length) * 100)/100;

					for(var i = 0; i < P11.length; i++) {
						P11[i] = Math.round(((P11[i] * 100)/P[10]) * 100)/100;
						P11a += P11[i];
					}
					P11a = Math.round((P11a/P11.length) * 100)/100;

					// Horizontal Average in percentage
					for (var i = 0; i < students.length; i++) {
						var a = (P1[i] + P2[i] + P3[i] + P4[i] + P5[i] + P6[i] + P7[i] + P8[i] + P9[i] + P10[i] + P11[i])/11;
						avg.push(Math.round((a) * 100)/100);
					}



					// Render the reports/all page with all of the data in context
					res.render('reports/all', {
						title: 'All Reports',
						students: students,
						P1: P1,
						P2: P2,
						P3: P3,
						P4: P4,
						P5: P5,
						P6: P6,
						P7: P7,
						P8: P8,
						P9: P9,
						P10: P10,
						P11: P11,
						avg: avg,
						P1a: P1a,
						P2a: P2a,
						P3a: P3a,
						P4a: P4a,
						P5a: P5a,
						P6a: P6a,
						P7a: P7a,
						P8a: P8a,
						P9a: P9a,
						P10a: P10a,
						P11a: P11a,
						P: P,
						batch_selected: req.body.batch,
						semester_selected: req.body.semester
					})

				})

			})

		})

	}

}

// To calculate total weightage in the header
var createTotalWeight = function(semester, callback) {

	Course.findAll({
		where: {
			semester: semester
		}
	}).then((courses) => {

		ProgramOutcome.findAll()
		.then((programoutcomes) => {

			var P = [];

			programoutcomes.forEach((programoutcome) => {

				createPOWeight(courses, programoutcome.id, (weight) => {
					P.push(weight);

					if (P.length == programoutcomes.length)
						callback(P);
				})

			})

		})

	})

}

var createPOWeight = function(courses, PO, callback) {

	var weight = 0;
	var coursecount = 1;

	courses.forEach((course) => {

		Chart.findAll({
			where: {
				courseId: course.id,
				programoutcomeId: PO
			}
		}).then((charts) => {

			courseWeight(charts, (w) => {
				weight += w;
				coursecount++;

				if (courses.length == coursecount) {
					callback(weight);
				}

			})

		})

	})

}

var courseWeight = function(charts, callback) {

	var weight = 0;
	var chartcount = 0;
	charts.forEach((chart) => {
		if (chart.fulfil == "S")
			weight += 4;
		else if (chart.fulfil == "M")
			weight += (0.6 * 4);
		else if (chart.fulfil == "W")
			weight += (0.2 * 4);
		chartcount++;

		if (chartcount == charts.length)
			callback(weight);

	})

	// charts.forEach((chart) => {
	// 	chartcount++;
	// 	weight += 4;
	// 	console.log(chart.toolId);
	// 	if (chartcount == charts.length) {
	// 		console.log(weight);
	// 		console.log('callback');
	// 		callback(weight);
	// 	}
	// })

}

// Takes in student instances and semester to calculate the PO scores of each student along with their averages
var createP = function(students, semester, callback) {

	// Declaring empty arrays
	const P1 = [], P2 = [], P3 = [], P4 = [], P5 = [], P6 = [], P7 = [], P8 = [], P9 = [], P10 = [], P11 = [], avg = [];

	for (var i = 0; i < students.length; i++) {

		Assessment.findAll({
			include: [{
				model: Student,
				where: {
					id: students[i].id
				}
			},
			{
				model: Course,
				where: {
					semester: semester
				}
			}]
		}).then((assessments) => {

			
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


			// Pushing the data of a student into the PO arrays using the assessment model
			// to sum up their POs throughout the concerned semester
			P1.push(PO1)
			P2.push(PO2)
			P3.push(PO3)
			P4.push(PO4)
			P5.push(PO5)
			P6.push(PO6)
			P7.push(PO7)
			P8.push(PO8)
			P9.push(PO9)
			P10.push(PO10)
			P11.push(PO11)

			// calculating horizontal average of particular student and pushing it in avg array
			// var a = Math.round(((PO1 + PO2 + PO3 + PO4 + PO5 + PO6 + PO7 + PO8 + PO9 + PO10 + PO11)/11) * 100) / 100 
			// avg.push(a)


			// Once the array has been filled with all the data of supplied students
			// we call the callback function
			// callback helps us to wait till the control is done with the whole thing
			if (P1.length == students.length)
				callback(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11);

			// Note: Callback parameters should be matched in the function on invoking it



		})

	}
}


module.exports.getStudents = function (req, res) {
	Student.findAll({
		where: { batch_of: req.body.batch }
	}).then((students) => {
		//res.setHeader('Content-Type', 'application/json');
		res.json({students: students});
	});
}


// Function to handle requests for individual reports
// On get requet, render the studentwise page with all the student models to populate the select field
// On post request, take the student and semester data
// and go through all assessment records of the concerned student in the given semester
// Add all POs to get total of them
// Render the studentwise page with the data in context
module.exports.StudentWise = function(req, res) {
	/*if (req.method == 'GET') {
		res.render('students/index', {title: 'Students'});
	}
	else if (req.method == 'POST') {
		Student.findAll({
			where: { batch_of: req.body.batch },
			include: [ Department ]
		}).then((students) => res.render('students/index', { title: 'Students', students: students, batch_selected: req.body.batch }))	
	}*/
	
	if (req.method == 'GET') {

		Student.findAll({
			include: [ Department ]
		}).then((students) => {
			res.render('reports/studentwise', {
				title: 'Student Wise Reports',
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

				res.render('reports/studentwise', {
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

// Coursewise array creation
var createCourseWise = function(students, course, callback) {

	// Declaring empty arrays
	const P1 = [], P2 = [], P3 = [], P4 = [], P5 = [], P6 = [], P7 = [], P8 = [], P9 = [], P10 = [], P11 = [];

	for (var i = 0; i < students.length; i++) {

		Assessment.findAll({
			include: [{
				model: Student,
				where: {
					id: students[i].id
				}
			},
			{
				model: Course,
				where: {
					id: course
				}
			}]
		}).then((assessments) => {

			
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


			// Pushing the data of a student into the PO arrays using the assessment model
			// to sum up their POs throughout the concerned semester
			P1.push(PO1)
			P2.push(PO2)
			P3.push(PO3)
			P4.push(PO4)
			P5.push(PO5)
			P6.push(PO6)
			P7.push(PO7)
			P8.push(PO8)
			P9.push(PO9)
			P10.push(PO10)
			P11.push(PO11)

			// calculating horizontal average of particular student and pushing it in avg array
			// var a = Math.round(((PO1 + PO2 + PO3 + PO4 + PO5 + PO6 + PO7 + PO8 + PO9 + PO10 + PO11)/11) * 100) / 100 
			// avg.push(a)


			// Once the array has been filled with all the data of supplied students
			// we call the callback function
			// callback helps us to wait till the control is done with the whole thing
			if (P1.length == students.length)
				callback(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11);

			// Note: Callback parameters should be matched in the function on invoking it



		})

	}
}

module.exports.CourseWise = function(req, res) {

	if (req.method == 'GET') {

		Course.findAll().then((courses) => {
			res.render('reports/coursewise', {
				title: 'Course Wise Report',
				courses: courses
			})
		})

	} else if (req.method == 'POST') {

		Student.findAll({
			where: {
				batch_of: req.body.batch
			}
		}).then((students) => {
			
			createCourseWise(students, req.body.course, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11) => {

				createCoursePOWeight(req.body.course, (P) => {

					var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;
					var avg = [];


					for(var i = 0; i < P1.length; i++) {
						if (P1[i] != 0)
							P1[i] = Math.round(((P1[i] * 100)/P[0]) * 100)/100;
						P1a += P1[i];
					}
					P1a = Math.round((P1a/P1.length) * 100)/100;

					for(var i = 0; i < P2.length; i++) {
						if (P2[i] != 0)
							P2[i] = Math.round(((P2[i] * 100)/P[1]) * 100)/100;
						P2a += P2[i];
					}
					P2a = Math.round((P2a/P2.length) * 100)/100;

					for(var i = 0; i < P3.length; i++) {
						if (P3[i] != 0)
							P3[i] = Math.round(((P3[i] * 100)/P[2]) * 100)/100;
						P3a += P3[i];
					}
					P3a = Math.round((P3a/P3.length) * 100)/100;

					for(var i = 0; i < P4.length; i++) {
						if (P4[i] != 0)
							P4[i] = Math.round(((P4[i] * 100)/P[3]) * 100)/100;
						P4a += P4[i];
					}
					P4a = Math.round((P4a/P4.length) * 100)/100;

					for(var i = 0; i < P5.length; i++) {
						if (P5[i] != 0)
							P5[i] = Math.round(((P5[i] * 100)/P[4]) * 100)/100;
						P5a += P5[i];
					}
					P5a = Math.round((P5a/P5.length) * 100)/100;


					for(var i = 0; i < P6.length; i++) {
						if (P6[i] != 0)
							P6[i] = Math.round(((P6[i] * 100)/P[5]) * 100)/100;
						P6a += P6[i];
					}
					P6a = Math.round((P6a/P6.length) * 100)/100;

					for(var i = 0; i < P7.length; i++) {
						if (P7[i] != 0)
							P7[i] = Math.round(((P7[i] * 100)/P[6]) * 100)/100;
						P7a += P7[i];
					}
					P7a = Math.round((P7a/P7.length) * 100)/100;

					for(var i = 0; i < P8.length; i++) {
						if (P8[i] != 0)
							P8[i] = Math.round(((P8[i] * 100)/P[7]) * 100)/100;
						P8a += P8[i];
					}
					P8a = Math.round((P8a/P8.length) * 100)/100;
					
					for(var i = 0; i < P9.length; i++) {
						if (P9[i] != 0)
							P9[i] = Math.round(((P9[i] * 100)/P[8]) * 100)/100;
						P9a += P9[i];
					}
					P9a = Math.round((P9a/P9.length) * 100)/100;

					for(var i = 0; i < P10.length; i++) {
						if (P10[i] != 0)
							P10[i] = Math.round(((P10[i] * 100)/P[9]) * 100)/100;
						P10a += P10[i];
					}
					P10a = Math.round((P10a/P10.length) * 100)/100;

					for(var i = 0; i < P11.length; i++) {
						if (P11[i] != 0)
							P11[i] = Math.round(((P11[i] * 100)/P[10]) * 100)/100;
						P11a += P11[i];
					}
					P11a = Math.round((P11a/P11.length) * 100)/100;

					// Calculate total number of POs in the course
					var po_count = 0;
					for (var i = 0; i < P.length; i++) {
						if (P[i] != 0)
							po_count++;
					}

					// Horizontal Average in percentage
					for (var i = 0; i < students.length; i++) {
						var a = (P1[i] + P2[i] + P3[i] + P4[i] + P5[i] + P6[i] + P7[i] + P8[i] + P9[i] + P10[i] + P11[i])/po_count;
						avg.push(Math.round((a) * 100)/100);
					}

					// Render the reports/all page with all of the data in context
					Course.findAll().then((courses) => {
						res.render('reports/coursewise', {
							title: 'Course Wise Reports',
							students: students,
							P1: P1,
							P2: P2,
							P3: P3,
							P4: P4,
							P5: P5,
							P6: P6,
							P7: P7,
							P8: P8,
							P9: P9,
							P10: P10,
							P11: P11,
							avg: avg,
							P1a: P1a,
							P2a: P2a,
							P3a: P3a,
							P4a: P4a,
							P5a: P5a,
							P6a: P6a,
							P7a: P7a,
							P8a: P8a,
							P9a: P9a,
							P10a: P10a,
							P11a: P11a,
							P: P,
							courses: courses,
							batch_selected: req.body.batch,
							course_selected: req.body.course
						})
					})
				})

			})
		})

	}

}

var createCoursePOWeight = function(course, callback) {

	var P = [];

	ProgramOutcome.findAll()
	.then((programoutcomes) => {

		programoutcomes.forEach((programoutcome) => {

			Chart.findAll({
				where: {
					courseId: course,
					programoutcomeId: programoutcome.id
				}
			}).then((charts) => {

				courseWeight(charts, (w) => {
					P.push(w);

					if (P.length == programoutcomes.length)
						callback(P);
				})

			})

		})

	})

}


// PO Wise
module.exports.POWise = function(req, res) {

	if (req.method == 'GET') {

		ProgramOutcome.findAll()
		.then((programoutcomes) => {
			res.render('reports/powise', {
				title: 'Program Outcome Wise',
				programoutcomes: programoutcomes
			})
		})

	} else if (req.method == 'POST') {

		Student.findAll({
			where: {
				batch_of: req.body.batch
			}
		}).then((students) => {

			Course.findAll({
				where: {
					semester: req.body.semester
				}
			}).then((courses) => {

				var course_length = Object.keys(courses).length;

				createPOWise(students, courses, req.body.PO, (p, total) => {

					createPOCourseWeight(courses, req.body.PO, (c) => {

						// Total Course Weight with a particular PO
						var totalCoursesWeight = 0;
						for (var i = 0; i < c.length; i++) {
							totalCoursesWeight += c[i];
						}

						var avg = [];
						for (var i = 0; i < total.length; i++) 
							avg[i] = Math.round((total[i]/totalCoursesWeight) * 100 * 100)/100;

						ProgramOutcome.findAll()
						.then((programoutcomes) => {
							res.render('reports/powise', {
								title: 'Program Outcome Wise',
								programoutcomes: programoutcomes,
								p: p,
								c: c,
								total: total,
								avg: avg,
								courses: courses,
								students: students,
								PO_selected: req.body.PO,
								semester_selected: req.body.semester,
								batch_selected: req.body.batch,
								totalCoursesWeight: totalCoursesWeight
							})
						})

					})

				})

			})

		})

	}

}

var createPOCourseWeight = function(courses, PO, callback) {

	var c = [];

	courses.forEach((course) => {

		Chart.findAll({
			where: {
				courseId: course.id,
				programoutcomeId: PO
			}
		}).then((charts) => {

			courseWeight(charts, (weight) => {

				c.push(weight);
				console.log(c.length + ', ' + courses.length);

				if ((c.length + 1) == courses.length) {
					console.log('callback')
					callback(c);
				}

			})

		})

	})

}

var createPOWise = function(students, courses, PO, callback) {

	// Declaring empty arrays
	const p = [], t = [];

	for (var i = 0; i < students.length; i++) {

		createPOWiseSub(students[i], courses, PO, (c, total) => {

			t.push(total);
			p.push(c);

			if (p.length == students.length)
				callback(p, t);

		})

	}

}

var createPOWiseSub = function(student, courses, PO, callback) {

	const c = [];
	var total = 0;

	for (var j = 0; j < courses.length; j++) {

		Assessment.findAll({
			include: [{
				model: Student,
				where: {
					id: student.id
				}
			},
			{
				model: Course,
				where: {
					id: courses[j].id
				}
			}],
			where: {
				programoutcomeId: PO
			}
		}).then((assessments) => {

			var score = 0;

			assessments.forEach((assessment) => {
				score += assessment.score;
			})

			total += score;
			c.push(score);

			if (c.length == courses.length)
				callback(c, total);

		})

	}
}


module.exports.allCSV = function (req, res) {

	
	const fields = ['Roll No', 'Name', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'Average'];
	
	Student.findAll({
		where: {
			batch_of: req.body.batch
		}
	}).then((students) => {

		// Sending all students of the batch and supplied semester value to createP
		// to create PO arrays with total PO scores of each student along with
		// their horizontal averages(avg)
		createP(students, req.body.semester, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11) => {
			
			createTotalWeight(req.body.semester, (P) => {

				var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;
				var avg = [];


				for(var i = 0; i < P1.length; i++) {
					P1[i] = Math.round(((P1[i] * 100)/P[0]) * 100)/100;
					P1a += P1[i];
				}
				P1a = Math.round((P1a/P1.length) * 100)/100;

				for(var i = 0; i < P2.length; i++) {
					P2[i] = Math.round(((P2[i] * 100)/P[1]) * 100)/100;
					P2a += P2[i];
				}
				P2a = Math.round((P2a/P2.length) * 100)/100;

				for(var i = 0; i < P3.length; i++) {
					P3[i] = Math.round(((P3[i] * 100)/P[2]) * 100)/100;
					P3a += P3[i];
				}
				P3a = Math.round((P3a/P3.length) * 100)/100;

				for(var i = 0; i < P4.length; i++) {
					P4[i] = Math.round(((P4[i] * 100)/P[3]) * 100)/100;
					P4a += P4[i];
				}
				P4a = Math.round((P4a/P4.length) * 100)/100;

				for(var i = 0; i < P5.length; i++) {
					P5[i] = Math.round(((P5[i] * 100)/P[4]) * 100)/100;
					P5a += P5[i];
				}
				P5a = Math.round((P5a/P5.length) * 100)/100;


				for(var i = 0; i < P6.length; i++) {
					P6[i] = Math.round(((P6[i] * 100)/P[5]) * 100)/100;
					P6a += P6[i];
				}
				P6a = Math.round((P6a/P6.length) * 100)/100;

				for(var i = 0; i < P7.length; i++) {
					P7[i] = Math.round(((P7[i] * 100)/P[6]) * 100)/100;
					P7a += P7[i];
				}
				P7a = Math.round((P7a/P7.length) * 100)/100;

				for(var i = 0; i < P8.length; i++) {
					P8[i] = Math.round(((P8[i] * 100)/P[7]) * 100)/100;
					P8a += P8[i];
				}
				P8a = Math.round((P8a/P8.length) * 100)/100;
				
				for(var i = 0; i < P9.length; i++) {
					P9[i] = Math.round(((P9[i] * 100)/P[8]) * 100)/100;
					P9a += P9[i];
				}
				P9a = Math.round((P9a/P9.length) * 100)/100;

				for(var i = 0; i < P10.length; i++) {
					P10[i] = Math.round(((P10[i] * 100)/P[9]) * 100)/100;
					P10a += P10[i];
				}
				P10a = Math.round((P10a/P10.length) * 100)/100;

				for(var i = 0; i < P11.length; i++) {
					P11[i] = Math.round(((P11[i] * 100)/P[10]) * 100)/100;
					P11a += P11[i];
				}
				P11a = Math.round((P11a/P11.length) * 100)/100;

				// Horizontal Average in percentage
				for (var i = 0; i < students.length; i++) {
					var a = (P1[i] + P2[i] + P3[i] + P4[i] + P5[i] + P6[i] + P7[i] + P8[i] + P9[i] + P10[i] + P11[i])/11;
					avg.push(Math.round((a) * 100)/100);
				}

				//console.log(students.length);
				
				// Create CSV
				
				var data = [];
				i = 0;
				students.forEach(function(s){
					var p = {};
					//console.log(s.roll + " " + s.name);
					p["Roll No"] = s.roll;
					p["Name"] = s.name;
					p["PO1"] = P1[i];
					p["PO2"] = P2[i];
					p["PO3"] = P3[i];
					p["PO4"] = P4[i];
					p["PO5"] = P5[i];
					p["PO6"] = P6[i];
					p["PO7"] = P7[i];
					p["PO8"] = P8[i];
					p["PO9"] = P9[i];
					p["PO10"] = P10[i];
					p["PO11"] = P11[i];
					p["Average"] = avg[i];
					data.push(p);
					i++;
				});
				
				var p = {};
				p["Roll No"] = "";
				p["Name"] = "Average";
				p["PO1"] = P1a;
				p["PO2"] = P2a;
				p["PO3"] = P3a;
				p["PO4"] = P4a;
				p["PO5"] = P5a;
				p["PO6"] = P6a;
				p["PO7"] = P7a;
				p["PO8"] = P8a;
				p["PO9"] = P9a;
				p["PO10"] = P10a;
				p["PO11"] = P11a;
				data.push(p);
				
				const json2csvParser = new Json2csvParser({ fields });
				const csv = json2csvParser.parse(data);
				
				//console.log(csv);

				var path='./public/storage/'+req.body.batch+'_'+req.body.semester+'sem_'+Date.now()+'.csv'; 
				fs.writeFile(path, csv, function(err,data) {
				if (err) {throw err;}
					else{
						res.download(path); //Send download headers.
					}
				});

			})

		})

	})

}

module.exports.courseCSV = function (req, res) {
	
	const fields = ['Roll No', 'Name', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'Average'];

		Student.findAll({
			where: {
				batch_of: req.body.batch
			}
		}).then((students) => {
			
			createCourseWise(students, req.body.course, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11) => {
				
				createCoursePOWeight(req.body.course, (P) => {

					var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;
					var avg = [];


					for(var i = 0; i < P1.length; i++) {
						if (P1[i] != 0)
							P1[i] = Math.round(((P1[i] * 100)/P[0]) * 100)/100;
						P1a += P1[i];
					}
					P1a = Math.round((P1a/P1.length) * 100)/100;

					for(var i = 0; i < P2.length; i++) {
						if (P2[i] != 0)
							P2[i] = Math.round(((P2[i] * 100)/P[1]) * 100)/100;
						P2a += P2[i];
					}
					P2a = Math.round((P2a/P2.length) * 100)/100;

					for(var i = 0; i < P3.length; i++) {
						if (P3[i] != 0)
							P3[i] = Math.round(((P3[i] * 100)/P[2]) * 100)/100;
						P3a += P3[i];
					}
					P3a = Math.round((P3a/P3.length) * 100)/100;

					for(var i = 0; i < P4.length; i++) {
						if (P4[i] != 0)
							P4[i] = Math.round(((P4[i] * 100)/P[3]) * 100)/100;
						P4a += P4[i];
					}
					P4a = Math.round((P4a/P4.length) * 100)/100;

					for(var i = 0; i < P5.length; i++) {
						if (P5[i] != 0)
							P5[i] = Math.round(((P5[i] * 100)/P[4]) * 100)/100;
						P5a += P5[i];
					}
					P5a = Math.round((P5a/P5.length) * 100)/100;


					for(var i = 0; i < P6.length; i++) {
						if (P6[i] != 0)
							P6[i] = Math.round(((P6[i] * 100)/P[5]) * 100)/100;
						P6a += P6[i];
					}
					P6a = Math.round((P6a/P6.length) * 100)/100;

					for(var i = 0; i < P7.length; i++) {
						if (P7[i] != 0)
							P7[i] = Math.round(((P7[i] * 100)/P[6]) * 100)/100;
						P7a += P7[i];
					}
					P7a = Math.round((P7a/P7.length) * 100)/100;

					for(var i = 0; i < P8.length; i++) {
						if (P8[i] != 0)
							P8[i] = Math.round(((P8[i] * 100)/P[7]) * 100)/100;
						P8a += P8[i];
					}
					P8a = Math.round((P8a/P8.length) * 100)/100;
					
					for(var i = 0; i < P9.length; i++) {
						if (P9[i] != 0)
							P9[i] = Math.round(((P9[i] * 100)/P[8]) * 100)/100;
						P9a += P9[i];
					}
					P9a = Math.round((P9a/P9.length) * 100)/100;

					for(var i = 0; i < P10.length; i++) {
						if (P10[i] != 0)
							P10[i] = Math.round(((P10[i] * 100)/P[9]) * 100)/100;
						P10a += P10[i];
					}
					P10a = Math.round((P10a/P10.length) * 100)/100;

					for(var i = 0; i < P11.length; i++) {
						if (P11[i] != 0)
							P11[i] = Math.round(((P11[i] * 100)/P[10]) * 100)/100;
						P11a += P11[i];
					}
					P11a = Math.round((P11a/P11.length) * 100)/100;

					// Horizontal Average in percentage
					for (var i = 0; i < students.length; i++) {
						var a = (P1[i] + P2[i] + P3[i] + P4[i] + P5[i] + P6[i] + P7[i] + P8[i] + P9[i] + P10[i] + P11[i])/11;
						avg.push(Math.round((a) * 100)/100);
					}

					//Create CSV
							
					var data = [];
					i = 0;
					students.forEach(function(s){
						var p = {};
						//console.log(s.roll + " " + s.name);
						p["Roll No"] = s.roll;
						p["Name"] = s.name;
						if(P[0] != 0) { p["PO1"] = P1[i] };
						if(P[1] != 0) { p["PO2"] = P2[i] };
						if(P[2] != 0) { p["PO3"] = P3[i] };
						if(P[3] != 0) { p["PO4"] = P4[i] };
						if(P[4] != 0) { p["PO5"] = P5[i] };
						if(P[5] != 0) { p["PO6"] = P6[i] };
						if(P[6] != 0) { p["PO7"] = P7[i] };
						if(P[7] != 0) { p["PO8"] = P8[i] };
						if(P[8] != 0) { p["PO9"] = P9[i] };
						if(P[9] != 0) { p["PO10"] = P10[i] };
						if(P[10] != 0) { p["PO11"] = P11[i] };
						p["Average"] = avg[i];
						data.push(p);
						i++;
					});
					
					var p = {};
					p["Roll No"] = "";
					p["Name"] = "Average";
					if(P[0] != 0) { p["PO1"] = P1a };
					if(P[1] != 0) { p["PO2"] = P2a };
					if(P[2] != 0) { p["PO3"] = P3a };
					if(P[3] != 0) { p["PO4"] = P4a };
					if(P[4] != 0) { p["PO5"] = P5a };
					if(P[5] != 0) { p["PO6"] = P6a };
					if(P[6] != 0) { p["PO7"] = P7a };
					if(P[7] != 0) { p["PO8"] = P8a };
					if(P[8] != 0) { p["PO9"] = P9a };
					if(P[9] != 0) { p["PO10"] = P10a };
					if(P[10] != 0) { p["PO11"] = P11a };
					data.push(p);
					
					const json2csvParser = new Json2csvParser({ fields });
					const csv = json2csvParser.parse(data);
					
					//console.log(csv);

					var path='./public/storage/'+req.body.batch+'_'+req.body.course+'course_'+Date.now()+'.csv'; 
					fs.writeFile(path, csv, function(err,data) {
					if (err) {throw err;}
						else{
							res.download(path); //Send download headers.
						}
					});
				})

			})
		
		})

}