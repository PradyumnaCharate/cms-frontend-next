import * as formidable from "formidable";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploaded-images");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = UPLOAD_DIR;
    form.keepExtensions = true;

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data", err);
        return res.status(500).json({ error: "Failed to process upload" });
      }

      const uploadedFiles = files.image;
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const filePaths = [];

      uploadedFiles.forEach((file) => {
        const fileName = Date.now() + "-" + file.originalFilename;
        const filePath = path.join(UPLOAD_DIR, fileName);

        fs.renameSync(file.filepath, filePath);

        filePaths.push(`/uploaded-images/${fileName}`);
      });

      return res.status(200).json({ success: true, filePaths });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
