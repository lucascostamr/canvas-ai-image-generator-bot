import { createReadStream } from "fs";
import csv from 'csv-parser'

export async function readCardsFromCsv(filePath) {
  return new Promise( (resolve, _) => {
    const results = []

    createReadStream(filePath)
    .pipe(csv({ headers: ["name", "description", "atack", "defense", "type"] }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results)
    })
  })
}