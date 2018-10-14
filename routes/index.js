var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/HomeController');
var CourseController = require('../controllers/CourseController');
var GroupController = require('../controllers/GroupController');

router.get('/', HomeController.Index);

// Courses
router.get('/courses', CourseController.Index);
router.get('/courses/create', CourseController.Create);
router.post('/courses', CourseController.Store);
router.get('/courses/:id/edit', CourseController.Edit);
router.put('/courses/:id', CourseController.Update);
router.delete('/courses/:id', CourseController.Destroy);

// Groups
router.get('/groups', GroupController.Index);
router.get('/groups/create', GroupController.Create);
router.post('/groups', GroupController.Store);
router.get('/groups/:id/edit', GroupController.Edit);
router.put('/groups/:id', GroupController.Update);
router.delete('/groups/:id', GroupController.Destroy);

module.exports = router;