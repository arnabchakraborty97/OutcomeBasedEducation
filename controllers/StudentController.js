var fs = require('fs');
var csv = require('fast-csv');

// import models
var Student = require('../models').Student;
var Department = require('../models').Department;

// Render all student models in index
module.exports.Index = function(req, res) {

	Student.findAll({
		include: [ Department ]
	}).then((students) => res.render('students/index', { title: 'Students', students: students }))	

}

// Render create page
module.exports.Create = function(req, res) {

	Department.findAll().then((departments) => res.render('students/createOrEdit', { title: 'Create Student', departments: departments } ))

}

// create instance of student model
module.exports.Store = function(req, res) {

	Student.create({...req.body, departmentId: req.body.departmentId}).then(() => res.redirect('/students'))

}

// Render create page with a particular student instance
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

// Update the particular Student model
module.exports.Update = function(req, res) {

	Student.findById(req.params.id).then((department) => 
			department.update({ 
				...req.body,
				departmentId: req.body.departmentId 
			}).then(() => res.redirect('/students'))
		)

}


// Delete particular student model
module.exports.Destroy = function(req, res) {

	Student.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => res.redirect('/students'))

}

module.exports.importCSV = function(req, res) {

	if (req.method == "GET") {
		Department.findAll()
		.then((departments) => {
			res.render('students/importCSV', {
				title: "Upload through CSV",
				departments: departments
			})
		})
	} else if (req.method == "POST") {
		
		console.log(req.files.csv)

		// Upload file
		var file = req.files.csv;
		var filename = file.name;

		file.mv('./public/storage/students.csv', function(err) {
	    	if (err)
	      		return res.status(500).send(err);

		    res.send('File uploaded!');
		});

		fs.createReadStream('./public/storage/students.csv')
		.pipe(csv())
		.on('data', function(data) {
			try {
				
				createStudent(data[1], data[0], req.body.batch, req.body.department, function() {
					console.log('yes');
				})

			} catch(err) {
				console.log(err)
			}
		})
		.on('end', function () {
			console.log('done')
		})

	}

}

var createStudent = function(name, roll, batch, department, callback) {
	Student.create({
		name: name,
		roll: roll,
		batch_of: batch,
		departmentId: department
	}).then(() => {
		callback(1)
	})
}