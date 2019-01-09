// Import models
var Chart = require('../models').Chart;
var Course = require('../models').Course;
var Group = require('../models').Group;
var Tool = require('../models').Tool;
var ProgramOutcome = require('../models').ProgramOutcome;
var Student = require('../models').Student;
var Assessment = require('../models').Assessment;
var Department = require('../models').Department;




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
			createP(students, req.body.semester, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, avg) => {
				
				var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;

				for(var i = 0; i < P1.length; i++) {
					P1a += P1[i];
				}
				P1a /= P1.length

				for(var i = 0; i < P2.length; i++) {
					P2a += P2[i];
				}
				P2a /= P2.length

				for(var i = 0; i < P3.length; i++) {
					P3a += P3[i];
				}
				P3a /= P3.length

				for(var i = 0; i < P4.length; i++) {
					P4a += P4[i];
				}
				P4a /= P4.length

				for(var i = 0; i < P5.length; i++) {
					P5a += P5[i];
				}
				P5a /= P5.length

				for(var i = 0; i < P6.length; i++) {
					P6a += P6[i];
				}
				P6a /= P6.length

				for(var i = 0; i < P7.length; i++) {
					P7a += P7[i];
				}
				P7a /= P7.length

				for(var i = 0; i < P8.length; i++) {
					P8a += P8[i];
				}
				P8a /= P8.length
				
				for(var i = 0; i < P9.length; i++) {
					P9a += P9[i];
				}
				P9a /= P9.length

				for(var i = 0; i < P10.length; i++) {
					P10a += P10[i];
				}
				P10a /= P10.length

				for(var i = 0; i < P11.length; i++) {
					P11a += P11[i];
				}
				P11a /= P11.length

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
					batch_selected: req.body.batch,
					semester_selected: req.body.semester
				})

			})

		})

	}

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
			var a = Math.round(((PO1 + PO2 + PO3 + PO4 + PO5 + PO6 + PO7 + PO8 + PO9 + PO10 + PO11)/11) * 100) / 100 
			avg.push(a)


			// Once the array has been filled with all the data of supplied students
			// we call the callback function
			// callback helps us to wait till the control is done with the whole thing
			if (P1.length == students.length)
				callback(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, avg);

			// Note: Callback parameters should be matched in the function on invoking it



		})

	}
}

// Function to handle requests for individual reports
// On get requet, render the studentwise page with all the student models to populate the select field
// On post request, take the student and semester data
// and go through all assessment records of the concerned student in the given semester
// Add all POs to get total of them
// Render the studentwise page with the data in context
module.exports.StudentWise = function(req, res) {

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
			var a = Math.round(((PO1 + PO2 + PO3 + PO4 + PO5 + PO6 + PO7 + PO8 + PO9 + PO10 + PO11)/11) * 100) / 100 
			avg.push(a)


			// Once the array has been filled with all the data of supplied students
			// we call the callback function
			// callback helps us to wait till the control is done with the whole thing
			if (P1.length == students.length)
				callback(P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, avg);

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
			
			createCourseWise(students, req.body.course, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, avg) => {
				
				var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;

				for(var i = 0; i < P1.length; i++) {
					P1a += P1[i];
				}
				P1a /= P1.length

				for(var i = 0; i < P2.length; i++) {
					P2a += P2[i];
				}
				P2a /= P2.length

				for(var i = 0; i < P3.length; i++) {
					P3a += P3[i];
				}
				P3a /= P3.length

				for(var i = 0; i < P4.length; i++) {
					P4a += P4[i];
				}
				P4a /= P4.length

				for(var i = 0; i < P5.length; i++) {
					P5a += P5[i];
				}
				P5a /= P5.length

				for(var i = 0; i < P6.length; i++) {
					P6a += P6[i];
				}
				P6a /= P6.length

				for(var i = 0; i < P7.length; i++) {
					P7a += P7[i];
				}
				P7a /= P7.length

				for(var i = 0; i < P8.length; i++) {
					P8a += P8[i];
				}
				P8a /= P8.length
				
				for(var i = 0; i < P9.length; i++) {
					P9a += P9[i];
				}
				P9a /= P9.length

				for(var i = 0; i < P10.length; i++) {
					P10a += P10[i];
				}
				P10a /= P10.length

				for(var i = 0; i < P11.length; i++) {
					P11a += P11[i];
				}
				P11a /= P11.length

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
						courses: courses,
						batch_selected: req.body.batch,
						course_selected: req.body.course
					})
				})
				

			})
		})

	}

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

				createPOWise(students, courses, req.body.PO, (p, avg) => {

					
					ProgramOutcome.findAll()
					.then((programoutcomes) => {
						res.render('reports/powise', {
							title: 'Program Outcome Wise',
							programoutcomes: programoutcomes,
							p: p,
							avg: avg,
							courses: courses,
							students: students,
							PO_selected: req.body.PO,
							semester_selected: req.body.semester,
							batch_selected: req.body.batch
						})
					})

				})

			})

		})

	}

}

var createPOWise = function(students, courses, PO, callback) {

	// Declaring empty arrays
	const p = [], avg = [];

	for (var i = 0; i < students.length; i++) {

		createPOWiseSub(students[i], courses, PO, (c, average) => {

			avg.push(average/(courses.length));
			p.push(c);

			if (p.length == students.length)
				callback(p, avg);

		})

		

	}
	

	// const msg = []

	// for (var i = 0; i < students.length; i++) {
	// 	const m = [];
	// 	for (var j = 0; j < courses.length; j++) {
	// 		m.push('YES')
	// 	}
	// 	msg.push(m);
	// }

	// if (i == students.length)
	// 	callback(msg);

}

var createPOWiseSub = function(student, courses, PO, callback) {

	const c = [];
	var average = 0;

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

			average += score;
			c.push(score);

			if (c.length == courses.length)
				callback(c, average);

		})

	}
}


module.exports.allCSV = function (req, res) {

	const fs = require('fs');
	const Json2csvParser = require('json2csv').Parser;
	const fields = ['Roll No', 'Name', 'PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'Average'];
	
	Student.findAll({
		where: {
			batch_of: req.body.batch
		}
	}).then((students) => {

		// Sending all students of the batch and supplied semester value to createP
		// to create PO arrays with total PO scores of each student along with
		// their horizontal averages(avg)
		createP(students, req.body.semester, (P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, avg) => {
			
			var P1a = 0, P2a = 0, P3a = 0, P4a = 0, P5a = 0, P6a = 0, P7a = 0, P8a = 0, P9a = 0, P10a = 0, P11a = 0;

			for(var i = 0; i < P1.length; i++) {
				P1a += P1[i];
			}
			P1a /= P1.length

			for(var i = 0; i < P2.length; i++) {
				P2a += P2[i];
			}
			P2a /= P2.length

			for(var i = 0; i < P3.length; i++) {
				P3a += P3[i];
			}
			P3a /= P3.length

			for(var i = 0; i < P4.length; i++) {
				P4a += P4[i];
			}
			P4a /= P4.length

			for(var i = 0; i < P5.length; i++) {
				P5a += P5[i];
			}
			P5a /= P5.length

			for(var i = 0; i < P6.length; i++) {
				P6a += P6[i];
			}
			P6a /= P6.length

			for(var i = 0; i < P7.length; i++) {
				P7a += P7[i];
			}
			P7a /= P7.length

			for(var i = 0; i < P8.length; i++) {
				P8a += P8[i];
			}
			P8a /= P8.length
			
			for(var i = 0; i < P9.length; i++) {
				P9a += P9[i];
			}
			P9a /= P9.length
			
			for(var i = 0; i < P10.length; i++) {
				P10a += P10[i];
			}
			P10a /= P10.length
			
			for(var i = 0; i < P11.length; i++) {
				P11a += P11[i];
			}
			P11a /= P11.length

			console.log(students.length);
			
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
			
			console.log(csv);

			var path='./public/'+req.body.batch+'_'+req.body.semester+'sem_'+Date.now()+'.csv'; 
			fs.writeFile(path, csv, function(err,data) {
			if (err) {throw err;}
				else{
					res.download(path); //Send download headers.
				}
			});
			

		})

	})

}