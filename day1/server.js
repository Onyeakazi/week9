const os = require('os');
const path = require('path');
const fs = require('fs');

// 1. Write to a file synchronously (Blocks the Event Loop - Use carefully)
// fs.writeFileSync('notes.txt', 'Hello, Backend World!');

// 2. Read from a file asynchronously (Non-Blocking - Industry Standard)
fs.readFile('notes.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log('File contents:', data);
});

// Discover info about the server's hardware
// console.log(`Server Memory: ${os.totalmem() / 1e9} GB`);
// console.log(`Server CPUs: ${os.cpus().length} Cores`);

// Resolve cross-platform file paths safely
// Never use 'folder/file.txt' because Windows uses backslashes 'folder\file.txt'
const safePath = path.join(__dirname, 'logs', 'error.log');
// console.log(safePath);