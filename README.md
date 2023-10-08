# swords-of-

## Steps to start

1. Clone the repo
2. `pnpm i` // if you don't have pnpm, install it with `npm i -g pnpm`
3. start a postgresql database using docker `docker compose up postgres`
4. `pnpm run db:migrate-dev` // this will create the database and run the migrations
5. `pnpm run db:generate` // this will generate the prisma client
5. `pnpm run dev --filter=nexjs` // this will start the nextjs app


## Project Structure

### apps

This folder contains all the apps in the monorepo. Each app is a separate folder with its own `package.json` and `tsconfig.json` files. This is where you would add your Next.js, Expo, ui-docs, etc.



### packages

This folder contains all the packages in the monorepo. Each package is a separate folder with its own `package.json` and `tsconfig.json` files. This is where you would add your api, db, auth, ui, etc.

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ expo
  |   ├─ Expo SDK 48
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   ├─ Tailwind using Nativewind
  |   └─ Typesafe API calls using tRPC
  ├─ next.js
  |   ├─ Next.js 13
  |   ├─ React 18
  |   ├─ Tailwind CSS
  |   └─ E2E Typesafe API Server & Client
  ├─  ui-docs-expo
  |   └─ UI Docs for Expo
  ├─  scraper
  |   └─ Scraper service
  └─  ui-docs-next
      └─ UI Docs for Next.js
packages
 ├─ api
 |   └─ tRPC v10 router definition
 ├─ auth
 |   └─ authentication using next-auth. **NOTE: Only for Next.js app, not Expo**
 ├─ db
 |   └─ typesafe db-calls using Prisma
 ├─ email-templates   
 |   └─ email templates using react-email
 ├─ modules
 |   └─ localStorage
 |      └─ localStorage wrapper
 ├─ message-broker * Rabbitmq at the moment
 |   └─ message-broker wrapper
 └─ ui
     └─ UI components
```
