# 🚀 Nx Monorepo: Admin + Shop + API

This is an Nx Monorepo project that contains:

- 🟢 **API**: Backend using [NestJS](https://nestjs.com/)
- 🟦 **Admin Panel**: Dashboard using [React.js](https://react.dev/)
- 🟨 **Shop**: Frontend for customers using React.js
- 🧩 Structured with `apps/` and `libs/` using Nx Workspaces

---

## 🛠️ Getting Started (Development)

```bash
# Install dependencies
npm install

# Run all apps together:
npm run start:all

# Or run each app individually:
npm run start:api
npm run start:admin
npm run start:shop
