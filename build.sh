#!/bin/bash

# Exit on error
set -e

# Install dependencies
echo "Installing dependencies..."
npm install

# Create dist directory if it doesn't exist
mkdir -p dist

# Run Vite build
echo "Building project..."
./node_modules/.bin/vite build

echo "Build completed!"
