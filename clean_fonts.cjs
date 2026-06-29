const fs = require('fs');

function cleanFile(path) {
  let content = fs.readFileSync(path, 'utf-8');
  
  // Remove fontFamily key-value from style objects (handles comma before and after)
  content = content.replace(/,\s*fontFamily:\s*['"][^'"]*['"]/g, '');
  content = content.replace(/fontFamily:\s*['"][^'"]*['"],\s*/g, '');
  content = content.replace(/fontFamily:\s*['"][^'"]*['"]/g, '');
  
  // Remove fontStyle: 'italic' 
  content = content.replace(/,\s*fontStyle:\s*['"]italic['"]/g, '');
  content = content.replace(/fontStyle:\s*['"]italic['"],\s*/g, '');
  content = content.replace(/fontStyle:\s*['"]italic['"]/g, '');
  
  // Remove italic from className strings - word boundary aware
  content = content.replace(/ italic(?=[ "'\`])/g, '');
  content = content.replace(/ italic$/gm, '');
  
  // Remove not-italic from className strings
  content = content.replace(/ not-italic/g, '');
  content = content.replace(/not-italic /g, '');
  
  // Remove font-serif from className strings  
  content = content.replace(/ font-serif/g, '');
  content = content.replace(/font-serif /g, '');
  
  // Clean up double spaces in className strings
  content = content.replace(/  +/g, ' ');
  
  fs.writeFileSync(path, content, 'utf-8');
  console.log('Done: ' + path);
}

const files = process.argv.slice(2);
files.forEach(cleanFile);
