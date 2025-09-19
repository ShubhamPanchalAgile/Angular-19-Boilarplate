# Angular 19 Standalone App with Signals

![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

A modern Angular 19 project template using **standalone components**, **signal-driven state management**, and **zoneless change detection**. Designed for **SSR readiness**, **incremental hydration**, and **lazy-loaded features** with reusable services and Angular Material.

---

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Recommended Practices](#recommended-practices)
- [Author](#author)
- [License](#license)

---

## Features

- **Standalone Components Only**  
  No NgModules required. Fully leverages Angular 19 standalone architecture.

- **Signals-based State Management**  
  Use Angular signals (`signal()`, `computed()`, `effect()`) for reactive state instead of RxJS where possible.  
  Example: store user session, theme, sidebar toggle state with signals.

- **Zoneless Change Detection**  
  Configure the app to run without `Zone.js`.

- **Incremental Hydration & SSR Ready**  
  Supports server-side rendering and incremental hydration for faster page loads.

- **Angular Material & CDK**  
  Fully integrated Material UI components and CDK for layout and accessibility.

- **Lazy Loading & Route Deferring**  
  Optimized for performance with deferred route loading.

- **Global Error Handling + Interceptors**  
  - API error interceptor with toast notifications  
  - JWT interceptor for authenticated API requests

- **Reusable Services**  
  - API service (with `HttpClient` + signals)  
  - Auth, Storage, and Theme services

---

## Folder Structure

```text
src/
 ├── app/
 │    ├── auth/                        # Authentication feature
 │    │    ├── login/
 │    │    └── register/
 │    │
 │    ├── core/                        # Singletons, services, guards, interceptors
 │    │    ├── config/                 # App constants, environment settings
 │    │    ├── guards/                 # AuthGuard, RoleGuard
 │    │    ├── interceptors/           # JWT, Error handling
 │    │    ├── models/
 │    │    ├── modules/
 │    │    ├── services/               # API, Auth, Storage, Theme
 │    │
 │    ├── shared/                      # Reusable standalone components/pipes/directives
 │    │    ├── components/             # Buttons, Modals, Table, Chart wrapper
 │    │    ├── directives/             # Example: Autofocus, Debounce
 │    │    └── pipes/                  # DateFormat, Currency, etc.
 │    │
 │    ├── layout/                      # Admin Layout
 │    │    ├── sidebar/                # Navigation
 │    │    ├── header/                 # Topbar
 │    │    └── footer/                 # Footer
 │    │
 │    ├── features/                    # Core business features
 │    │    ├── dashboard/              # Dashboard with charts/cards
 │    │    ├── users/                  # Example CRUD module
 │    │    ├── products/               # Example CRUD module
 │    │    └── settings/               # Profile, Preferences
 │    │
 │    ├── signals/                     # Global signals stores (mini state management)
 │    │    ├── auth.signal.ts
 │    │    ├── theme.signal.ts
 │    │    └── ui.signal.ts
 │    │
 │    ├── app.routes.ts                # Route-level rendering config
 │    └── app.config.ts                # App bootstrap config (with provideZone: 'noop')
 │
 ├── assets/                           # Static files (images, i18n json, icons)
 ├── environments/                     # env.dev.ts, env.prod.ts
 └── main.ts                           # Bootstraps App with standalone components
