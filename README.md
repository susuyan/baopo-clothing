# 爆破服饰 — 服饰供应链应用

Next.js 全栈应用，展示外贸女装与中老年女装产品，支持搜索、分类筛选、价格排序。

## 数据源

- **265 款产品** 来自仟欣服饰（江苏常熟）
- **2 个分类**：外贸女装 (216 款)、中老年女装 (49 款)
- **价格区间**：¥8 ~ ¥47

## 技术栈

| 层 | 选型 |
|------|------|
| 框架 | Next.js 16 + App Router |
| 语言 | TypeScript |
| 样式 | Tailwind CSS v4 |
| 图标 | Lucide React |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | Vercel |

## 页面

- `/` — 首页：品牌展示、分类入口、热门产品、供应商信息
- `/products` — 产品列表：搜索、分类筛选、价格排序
- `/products/[id]` — 产品详情：大图、信息、复制货号、联系供应商
- `/about` — 关于我们：数据统计、供应商详情、分类导航

## 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## Supabase 配置（可选）

应用内置了产品数据作为 fallback，不配置 Supabase 也能跑。

### 1. 创建 Supabase 项目

前往 https://app.supabase.com 创建项目。

### 2. 执行数据库迁移

在 Supabase SQL Editor 中执行 `scripts/supabase/migration.sql`。

### 3. 导入数据

```bash
# 复制环境变量
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY
# 运行数据导入
npx tsx scripts/seed-supabase.ts
```

### 4. 配置环境变量

在 Vercel 项目的 Environment Variables 中添加：

| 变量名 | 来源 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings → API → Project API keys → `anon public` |

## Vercel 部署

### 方式一：Vercel CLI

```bash
npm i -g vercel
vercel
```

### 方式二：GitHub 集成

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（见上）
4. 部署

### Build 配置

已在 `next.config.ts` 中配置好远程图片域名（`img.k3cdn.com`）。

```
Framework Preset: Next.js
Build Command: next build
Output Directory: .next
```

## 项目结构

```
baopo-app/
├── app/                  # Next.js App Router 页面
│   ├── page.tsx          # 首页
│   ├── products/
│   │   ├── page.tsx      # 产品列表
│   │   └── [id]/page.tsx # 产品详情
│   └── about/page.tsx    # 关于页
├── components/           # 可复用组件
├── lib/
│   ├── data.ts           # 数据层（本地 JSON + Supabase fallback）
│   ├── supabase.ts       # Supabase 客户端
│   └── data/
│       └── products.json # 内置数据
├── scripts/
│   └── supabase/
│       ├── migration.sql # 数据库迁移
│       └── seed-supabase.ts # 数据导入脚本
└── public/               # 静态资源
```
