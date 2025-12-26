const cors = require('cors');
const express = require('express');
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://personal-portfolio-v1-delta.vercel.app/',
    ],
  })
);
app.use(express.json());

const connectDB = require('./utils/connectDB.utils');
const certificates = require('./routes/certificate.route');
const projects = require('./routes/projects.route');
const contacts = require('./routes/contactRequests.route');

connectDB();

app.use('/', certificates);
app.use('/', projects);
app.use('/', contacts);

app.listen(process.env.PORT, () => {
  console.log(`Server started at Port ${process.env.PORT}`);
});
