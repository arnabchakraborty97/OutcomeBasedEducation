var ProgramOutcome = require('../models').ProgramOutcome;

module.exports.Index = function(req, res) {

	ProgramOutcome.findAll().then((programoutcomes) => 
			res.render('programoutcomes/index', { title: 'Program Outcomes', programoutcomes: programoutcomes })
		)
	
}

module.exports.Create = function(req, res) {

	res.render('programoutcomes/createOrEdit', { title: 'Create Program Outcome' });

}

module.exports.Store = function(req, res) {

	ProgramOutcome.create(req.body).then(() => 
		res.redirect('/programoutcomes')
	)

}

module.exports.Edit = function(req, res) {

	ProgramOutcome.findById(req.params.id).then((programoutcome) => 
		res.render('programoutcomes/createOrEdit', { title: 'Create Program Outcome', programoutcome: programoutcome })
	)
	
}

module.exports.Update = function(req, res) {

	ProgramOutcome.findById(req.params.id).then((programoutcome) => {
		programoutcome.update(req.body).then(() => res.redirect('/programoutcomes'))
	})

}

module.exports.Destroy = function(req, res) {

	ProgramOutcome.destroy({
		where: {
			id: req.params.id
		}
	}).then(function () {
		res.redirect('/programoutcomes');
	});

}