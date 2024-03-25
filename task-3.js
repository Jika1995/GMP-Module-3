const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const fileName = 'nodejs-hw1-ex1.csv';
const csvPath = path.join('csv', fileName);
const txtFileName = fileName.slice(0, -3) + 'txt';

const writeCSVFile = fs.createWriteStream(txtFileName);
csv({ delimiter: ';' })
  .fromFile(csvPath)
  .subscribe((book) => {
    const newBook = JSON.stringify(book)
    writeCSVFile.write(`${newBook}\n`)
  });