const fs = require('fs');
const path = require('path');

function cleanupExports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      cleanupExports(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove "use strict" statements
      content = content.replace(/["']use strict["'];?\s*/g, '');
      
      // Remove export statements
      content = content.replace(/export\s*{\s*};?/g, '');
      
      // Remove @ts-ignore comments
      content = content.replace(/\/\/\s*@ts-ignore.*\n?/g, '');
      
      // Clean up extra whitespace
      content = content.trim();
      
      fs.writeFileSync(filePath, content);
    }
  });
}

cleanupExports('./dist');
console.log('✓ Cleaned up dist/ files');