import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs-extra";
import { join } from "path";
import sharp from "sharp";

export async function removeImageBackground(inputFolder, outputFolder) {
    fs.ensureDirSync(outputFolder);

    const files = fs.readdirSync(inputFolder).filter(file => file.endsWith(".jpeg") || file.endsWith(".jpg"));

    for (const file of files) {
        const inputPath = join(inputFolder, file);
        const outputPath = join(outputFolder, file.replace(/\.(jpeg|jpg)$/, ".webp"));

        const config = {
          model: 'small',
          output: {
            quality: 0.8,
            format: 'image/webp'
          }
        };

        try {
            const blob = await removeBackground(inputPath, config);
            const buffer = await blob.arrayBuffer();

            await sharp(buffer)
                .webp()
                .toFile(outputPath);

            console.log(`Processed: ${file}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
            break
        }
    }
}
