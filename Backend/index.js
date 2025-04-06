const express = require('express');
const multer = require('multer');
const docxToPDF = require('docx-pdf');
const path = require('path');
const fs = require('fs');
const cors=require('cors');
require('dotenv').config();

 


const app = express();
const port = process.env.PORT || 3000;
 
app.use(cors());
// Ensure the "files" directory exists
const filesDir = path.join(__dirname, "files");
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

// Set up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Ensure 'uploads' folder exists
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/convertFile', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        let inputPath = req.file.path;
        let outputPath = path.join(filesDir, `${req.file.originalname}.pdf`);

        docxToPDF(inputPath, outputPath, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error converting docx to pdf" });
            }

            // Send the converted file for download
            res.download(outputPath, (downloadErr) => {
                if (downloadErr) {
                    console.error("Error downloading file:", downloadErr);
                } else {
                    console.log("File downloaded successfully.");
                }
            });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
