const FTP = require('../schema/FTP'); // Assuming your FTP model is in the 'models' directory

const getAllFTPs = async (req, res) => {
  try {
    const ftps = await FTP.find();
    res.json(ftps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleFTP = async (req, res) => {
  try {
    const ftp = await FTP.findById(req.params.id);
    res.json(ftp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postFTP = async (req, res) => {
  const ftp = new FTP(req.body);

  try {
    const savedFTP = await ftp.save();
    res.status(201).json(savedFTP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSingleFTP = async (req, res) => {
  try {
    const updatedFTP = await FTP.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFTP);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSingleFTP = async (req, res) => {
  try {
    await FTP.findByIdAndDelete(req.params.id);
    res.json({ message: 'FTP deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllFTPs = async (req, res) => {
  try {
    await FTP.deleteMany();
    res.json({ message: 'All FTPs deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleFtpBaseDomain = async(req,res)=>{
  try {
    const ftp = await FTP.find({domain : req.params.id});
    res.json({success:true, ftp:ftp});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllFTPs,
  getSingleFTP,
  postFTP,
  updateSingleFTP,
  deleteSingleFTP,
  deleteAllFTPs,
  getSingleFtpBaseDomain
};
