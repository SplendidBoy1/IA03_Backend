const router = require('express').Router();
const user_controller = require('../controllers/user_controller.js');
const account_models = require('../models/account_models.js');

router.get('/', user_controller.getAll);
router.post('/', user_controller.postAdd);
router.get('/login', user_controller.getLogin);
router.post('/auth', user_controller.postAuth);
router.use(user_controller.isAutenticated);

router.get('/:id', user_controller.getOne);

module.exports = router