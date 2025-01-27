import csv from 'csv-parser'

export function readCardsFromCsv(filePath) {
  const results = []

  fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    return results
  })
}