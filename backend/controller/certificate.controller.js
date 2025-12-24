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

module.exports = getCertificates;
