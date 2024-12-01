const Website = require('../models/sites');

const MAX_LIMIT = 30; // 设置最大限制为30

// Get all websites with pagination and filtering
exports.getWebsites = async (ctx) => {
  try {
    let { page = 1, limit = 10, type, search } = ctx.query;
    
    // 确保 limit 不超过最大值
    limit = Math.min(parseInt(limit), MAX_LIMIT);
    page = parseInt(page);
    
    const query = {};

    // Apply filters
    if (type) {
      query.type = type;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('查询条件:', query);
    console.log('分页参数:', { page, limit });

    // Execute query with pagination
    const [websites, total] = await Promise.all([
      Website.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Website.countDocuments(query)
    ]);

    console.log('查询结果数量:', websites.length);
    console.log('总记录数:', total);

    ctx.body = {
      websites,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('查询出错:', error);
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

// Get website by ID
exports.getWebsiteById = async (ctx) => {
  try {
    const website = await Website.findById(ctx.params.id);
    if (!website) {
      ctx.status = 404;
      ctx.body = { error: 'Website not found' };
      return;
    }
    ctx.body = website;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};

// Create new website
exports.createWebsite = async (ctx) => {
  try {
    const website = new Website(ctx.request.body);
    await website.save();
    ctx.status = 201;
    ctx.body = website;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

// Update website
exports.updateWebsite = async (ctx) => {
  try {
    const website = await Website.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      { new: true, runValidators: true }
    );
    if (!website) {
      ctx.status = 404;
      ctx.body = { error: 'Website not found' };
      return;
    }
    ctx.body = website;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
};

// Delete website
exports.deleteWebsite = async (ctx) => {
  try {
    const website = await Website.findByIdAndDelete(ctx.params.id);
    if (!website) {
      ctx.status = 404;
      ctx.body = { error: 'Website not found' };
      return;
    }
    ctx.body = { message: 'Website deleted successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
};
