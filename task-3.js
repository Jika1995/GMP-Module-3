const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const csvPath = 'csv/nodejs-hw1-ex1.csv';

// const readCSVFile = fs.createReadStream(csvPath);

// const writeCSVFile = request.put('csv/newFile.csv');

// readCSVFile.pipe(csv()).pipe(writeCSVFile);

async function csvParser(fileName) {
  let jsonFileName = fileName.slice(0, -3) + 'json';
  let filePath = path.join('csv', 'nodejs-hw1-ex1.csv');
  const rawData = fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err)
      return console.error(err)
  });

  const jsonArray = await csv().fromFile(filePath);

  let res = JSON.stringify(jsonArray, null, 2);
  console.log(res);

  fs.writeFile(jsonFileName, res, (err) => {
    if (err)
      return console.error(err)

    console.log('success');
  })
}

csvParser('nodejs-hw1-ex1.csv')