const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/convert', (req, res) => {
  const { url, format } = req.body;
  const outputFile = `output.${format}`;

  ffmpeg(url)
    .output(outputFile)
    .on('end', () => {
      res.download(outputFile);
    })
    .on('error', (err) => {
      res.status(500).send(err);
    })
    .run();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
