import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. data/properties.ts
replaceInFile('src/data/properties.ts', [
  ["'/images/", "import.meta.env.BASE_URL + 'images/"]
]);

// 2. components/PropertyCard.tsx
replaceInFile('src/components/PropertyCard.tsx', [
  ["'/images/image-fallback.svg'", "import.meta.env.BASE_URL + 'images/image-fallback.svg'"]
]);

// 3. components/PropertyGallery.tsx
replaceInFile('src/components/PropertyGallery.tsx', [
  ["'/images/image-fallback.svg'", "import.meta.env.BASE_URL + 'images/image-fallback.svg'"]
]);

// 4. pages/AboutPage.tsx
replaceInFile('src/pages/AboutPage.tsx', [
  ["'/images/", "import.meta.env.BASE_URL + 'images/"],
  ['src="/images/', 'src={`${import.meta.env.BASE_URL}images/']
]);

// 5. pages/HomePage.tsx
replaceInFile('src/pages/HomePage.tsx', [
  ['src="/images/', 'src={`${import.meta.env.BASE_URL}images/']
]);

console.log("Replaced image paths successfully!");
