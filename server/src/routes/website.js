const Router = require('@koa/router');
const websiteController = require('../controllers/website');

const router = new Router({
  prefix: '/api/websites'
});

// Routes
router.get('/', websiteController.getWebsites);
router.get('/:id', websiteController.getWebsiteById);
router.post('/', websiteController.createWebsite);
router.put('/:id', websiteController.updateWebsite);
router.delete('/:id', websiteController.deleteWebsite);

exports.websiteRouter = router;
