import { createReadStream, existsSync, mkdirSync, readdir, rename } from "fs";
import { join } from "path";
import csv from "csv-parser";

export async function readCardsFromCsv(filePath) {
  return new Promise((resolve, _) => {
    const results = [];

    createReadStream(filePath)
      .pipe(
        csv({ headers: ["name", "description", "atack", "defense", "type"] })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
}

export function renameAndMoveFile(sourceFolder, destinationFolder, newFilename, fileExtention) {
  const fileName = String(newFilename).toLowerCase().replaceAll(" ", "-")

  if (!existsSync(destinationFolder)) {
    mkdirSync(destinationFolder, { recursive: true });
  }

  readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error("Error reading source folder:", err);
      return;
    }

    if (files.length === 0) {
      console.log("No files found in the source folder.");
      return;
    }

    const originalFilename = files[0];
    const oldPath = join(sourceFolder, originalFilename);
    const newPath = join(destinationFolder, fileName + fileExtention);

    rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error renaming and moving file:", err);
      } else {
        console.log(
          `File renamed and moved: ${originalFilename} -> ${newFilename}`
        );
      }
    });
  });
}
