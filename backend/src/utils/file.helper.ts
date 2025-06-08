import fs from "fs";
import path from "path";

export const deleteUploadedFiles = (filenames: string[]) => {
  filenames.forEach((filename) => {
    const filePath = path.join("src/uploads", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};
