const CMS = require('../schema/CMS'); // Assuming your CMS model is in the 'models' directory

const getAllCMSs = async (req, res) => {
  try {
    const cmsList = await CMS.find();
    res.json({ success: true, data: cmsList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleCMS = async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);
    res.json({ success: true, data: cms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleCMSbaseOndomains = async (req, res) => {
  try {
    const cms = await CMS.findById({domain:req.params.id});
    res.json({ success: true, data: cms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const postCMS = async (req, res) => {
  const cmsData = req.body;

  try {
    const newCMS = new CMS(cmsData);
    const savedCMS = await newCMS.save();
    res.status(201).json({ success: true, data: savedCMS });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateSingleCMS = async (req, res) => {
  try {
    const updatedCMS = await CMS.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updatedCMS });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteSingleCMS = async (req, res) => {
  try {
    await CMS.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'CMS deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllCMSs = async (req, res) => {
  try {
    await CMS.deleteMany();
    res.json({ success: true, message: 'All CMSs deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllCMSs,
  getSingleCMS,
  postCMS,
  updateSingleCMS,
  deleteSingleCMS,
  deleteAllCMSs,
  getSingleCMSbaseOndomains
};
