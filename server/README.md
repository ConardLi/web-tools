# Web Tools Server

后端服务，提供网站数据的存储和查询功能。

## 技术栈

- Node.js
- Koa
- MongoDB
- Mongoose

## 开发环境要求

- Node.js 16+
- MongoDB

## 安装和运行

1. 安装依赖：
```bash
pnpm install
```

2. 启动 MongoDB（确保 MongoDB 服务已运行）

3. 启动开发服务器：
```bash
pnpm dev
```

服务器将在 http://localhost:3001 运行

## API 接口

### 获取网站列表
```
GET /api/websites
```

查询参数：
- page: 页码（默认：1）
- limit: 每页数量（默认：10）
- category: 分类筛选
- tags: 标签筛选
- search: 搜索关键词

### 获取单个网站
```
GET /api/websites/:id
```

### 创建网站
```
POST /api/websites
```

### 更新网站
```
PUT /api/websites/:id
```

### 删除网站
```
DELETE /api/websites/:id
```

## 数据模型

网站（Website）：
- name: 网站名称
- url: 网站地址
- icon: 图标
- description: 描述
- category: 分类
- tags: 标签
- createdAt: 创建时间
- updatedAt: 更新时间
