var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var CourseController = require('../controllers/CourseController');

router.get('/', HomeController.Index);

// Courses
router.get('/courses', CourseController.Index);
router.get('/courses/create', CourseController.Create);
router.post('/courses', CourseController.Store);
router.get('/courses/:id/edit', CourseController.Edit);
router.put('/courses/:id', CourseController.Update);
router.delete('/courses/:id', CourseController.Destroy);

module.exports = router;