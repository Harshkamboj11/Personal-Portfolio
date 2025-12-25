const express = require('express');
const router = express.Router();

const {
  getCertificates,
  createNewCertificate,
} = require('../controller/certificate.controller');

router.get('/get-all-certificates', getCertificates);
router.post('/create-new-certificate', createNewCertificate);

module.exports = router;
