import * as formidable from "formidable";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";

const PLUGIN_DIR = path.join(process.cwd(), "plugins");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = PLUGIN_DIR;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data", err);
        return res.status(500).json({ error: "Failed to process upload" });
      }

      const zipFile = files.zipFile[0];

      if (!zipFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!fs.existsSync(PLUGIN_DIR)) {
        fs.mkdirSync(PLUGIN_DIR, { recursive: true });
      }

      const zipFilePath = path.join(PLUGIN_DIR, zipFile.originalFilename);

      fs.renameSync(zipFile.filepath, zipFilePath);

      fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: PLUGIN_DIR }))
        .on("close", () => {
          fs.unlinkSync(zipFilePath);

          res.status(200).json({ success: true });
        })
        .on("error", (err) => {
          console.error("Error extracting zip file", err);
          res.status(500).json({ error: "Error extracting zip file" });
        });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
