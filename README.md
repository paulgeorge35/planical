# DailyPlanner

An open source application built using the new router, server components and everything new in Next.js 13.

> **Warning**
> This app is a work in progress. I'm building this in public.
> See the roadmap below.

## About this project

Right now, I'm using this project as an experiment to see how a modern app (with features like authentication, subscriptions, API routes, ...etc) would work in Next.js 13 and server components.

## Note on Performance

> **Warning**
> This app is using the canary releases for Next.js 13 and React 18. The new router and app dir is still in beta and not production-ready.
> **Expect some performance hits when testing the dashboard**.

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Loading UI
- Server and Client Components
- API Routes
- ORM using **Prisma**
- Database and authentication on **Supabase**
- UI Components built using **Radix UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Roadmap

- [x] ~Build the general UI of the app~
- [x] ~Dark mode~
- [x] ~Authentication~
- [ ] Responsive styles
- [ ] Add tests
- [ ] Subscriptions using Stripe
- [ ] Drag and Drop functionality
- [ ] Recurrent tasks

## Known Issues

A list of things not working right now:

1. To update

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Create a supabase project and update the API key, Project key and database URL:

4. Start the development server:

```sh
pnpm dev
```
