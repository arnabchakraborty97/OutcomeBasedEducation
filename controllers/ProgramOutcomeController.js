// import models
var ProgramOutcome = require('../models').ProgramOutcome;

// Render all POs in index
module.exports.Index = function(req, res) {

	ProgramOutcome.findAll().then((programoutcomes) => 
			res.render('programoutcomes/index', { title: 'Program Outcomes', programoutcomes: programoutcomes })
		)
	
}

// Render create page
module.exports.Create = function(req, res) {

	res.render('programoutcomes/createOrEdit', { title: 'Create Program Outcome' });

}

// Create instances of PO model
module.exports.Store = function(req, res) {

	ProgramOutcome.create(req.body).then(() => 
		res.redirect('/programoutcomes')
	)

}

// render create page with particular PO_id
module.exports.Edit = function(req, res) {

	ProgramOutcome.findById(req.params.id).then((programoutcome) => 
		res.render('programoutcomes/createOrEdit', { title: 'Create Program Outcome', programoutcome: programoutcome })
	)
	
}

// Update the PO in question
module.exports.Update = function(req, res) {

	ProgramOutcome.findById(req.params.id).then((programoutcome) => {
		programoutcome.update(req.body).then(() => res.redirect('/programoutcomes'))
	})

}


// Destroy particular instance of PO
module.exports.Destroy = function(req, res) {

	ProgramOutcome.destroy({
		where: {
			id: req.params.id
		}
	}).then(function () {
		res.redirect('/programoutcomes');
	});

}