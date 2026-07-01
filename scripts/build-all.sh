#!/bin/bash
# Build all packages in dependency order, then apps in parallel
set -e

# 1. shared packages first (types -> utils -> ui)
echo "Building @repo/types..."
npm run build -w @repo/types

echo "Building @repo/utils..."
npm run build -w @repo/utils

echo "Building @repo/ui..."
npm run build -w @repo/ui

# 2. apps can build in parallel once packages are ready
echo "Building apps in parallel..."
npm run build -w @repo/backend &
npm run build -w @repo/frontend &
wait

echo "All builds complete"
