import fs from 'fs';

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/src=\{\`\$\{import\.meta\.env\.BASE_URL\}images\/([^"]+)"/g, 'src={`${import.meta.env.BASE_URL}images/$1`}');
  fs.writeFileSync(file, content, 'utf8');
}

fix('src/pages/AboutPage.tsx');
fix('src/pages/HomePage.tsx');

console.log('Fixed syntax errors');
