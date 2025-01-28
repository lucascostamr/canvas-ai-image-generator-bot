import { createReadStream } from "fs";
import csv from 'csv-parser'

export function readCardsFromCsv(filePath) {
  const results = []

  createReadStream(filePath)
  .pipe(csv({ headers: ["name", "description", "atack", "defense", "type"] }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    return results
  })
}