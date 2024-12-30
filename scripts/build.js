const { execSync } = require('child_process');
const path = require('path');

// Ensure we're in the project root
process.chdir(path.join(__dirname, '..'));

console.log('🚀 Starting build process...');

try {
  // Clean install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Run TypeScript compilation
  console.log('🔍 Type checking...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // Build the project
  console.log('🏗️ Building project...');
  execSync('npx vite build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
