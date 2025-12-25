const certificates = require('../model/certificate.model');

const getCertificates = async (req, res) => {
  try {
    const allCertificates = await certificates.find();

    return res.status(200).json({
      success: true,
      data: allCertificates,
    });
  } catch (error) {
    console.log('error fetching certificates', error);
  }
};

const createNewCertificate = async (req, res) => {
  const { title, issuer, id, date, link } = req.body;

  try {
    const newCertificate = await certificates.create({
      title,
      issuer,
      id,
      date,
      link,
    });

    return res.status(201).json({
      success: true,
      data: newCertificate,
    });
  } catch (error) {}
};

module.exports = { getCertificates, createNewCertificate };
