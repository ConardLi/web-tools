const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const { websiteRouter } = require('./routes/website');
const { PORT, MONGODB_URI } = require('./config');

const app = new Koa();
const router = new Router({
  prefix: '/api'
});

// Middleware
app.use(cors());
app.use(bodyParser());

// Routes
router.get('/health', (ctx) => {
  ctx.body = { status: 'ok' };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(websiteRouter.routes());
app.use(websiteRouter.allowedMethods());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
