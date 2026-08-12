import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(projectRoot, "public", "app-icon.svg");
const sizes = [180, 192, 512];

await Promise.all(
  sizes.map((size) =>
    sharp(source)
      .resize(size, size)
      .png()
      .toFile(path.join(projectRoot, "public", `app-icon-${size}.png`)),
  ),
);

console.log(`Generated app icons: ${sizes.join(", ")} px`);
