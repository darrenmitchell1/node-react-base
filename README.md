# Monorepo — Node · NestJS · React · Next.js · TypeScript · PostgreSQL

npm workspaces monorepo, no Turborepo required.

## Structure

```
my-monorepo/
├── apps/
│   ├── api/          @repo/api   — NestJS backend (port 3001)
│   └── web/          @repo/web   — Next.js frontend (port 3000)
├── config/           Config files
├── packages/
│   ├── types/        @repo/types — shared TypeScript types
│   ├── utils/        @repo/utils — shared utilities
│   └── ui/           @repo/ui    — shared React components
├── scripts/
│   └── build-all.sh  — ordered build script
└── .github/workflows/ci.yml
```

## Key design decisions

| Concern | Choice |
|---|---|
| Build orchestration | npm workspaces + ordered shell script |
| Shared types | `@repo/types` — tsc only |
| Shared utilities | `@repo/utils` — tsc only |
| Shared UI | `@repo/ui` — Vite (lib mode) + tsc declarations |
| NestJS tsconfig | CommonJS + decorator metadata, locally overridden |
| Next.js packages | `transpilePackages` — no pre-build needed in dev |
| CI caching | `actions/setup-node` with `cache: 'npm'` |

## Build order

Packages must be built before the apps that consume them:

```
@repo/types → @repo/utils → @repo/ui → @repo/api + @repo/web (parallel)
```

The `scripts/build-all.sh` script handles this automatically.

## Getting started

```bash
# Install all dependencies (hoisted to root node_modules)
npm install

# Dev — all packages + apps in watch mode
npm run dev

# Build — packages first, then apps in parallel
./scripts/build-all.sh

# Typecheck everywhere
npm run typecheck

# Lint
npm run lint
```

## Testing

### Test DB Connection

```
docker compose down

docker compose up -d

docker compose ps

npx ts-node ./apps/backend/src/test-db.ts
```
