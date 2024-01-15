
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Domain = require('../schema/domains');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const getAllDomains = async (req, res) => {
  try {
    
    const domains = await Domain.find().populate({
      path: 'client',
      select: 'name email', // Specify the fields you want to populate
    });
    res.status(200).json({ success: true, data: domains });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to fetch Domains, please try again' });
  }
  
};


const postDomain = async (req, res) => {
    try {
  
      
      const newDomain = new Domain(req.body);
  
      
      await newDomain.save();
  
      console.log('Domain created:', newDomain);
  
      res.status(201).json({ success: true, message: 'Domain created successfully' });
    } catch (error) {
      console.error(error, "error ");
      res.status(500).json({ success: false, message: 'Unable to create a Domain, please try again' });
    }
  };



  
  const deleteSingleDomain = async (req, res) => {
    try {
      const DomainId = req.params.id; 
  
      
      const deletedDomain = await Domain.findByIdAndDelete(DomainId);
  

      await Comment.deleteMany({DomainId:DomainId});


      if (!deletedDomain) {
        return res.status(404).json({ success: false, message: 'Domain not found' });
      }
  
      res.status(200).json({ success: true, message: 'Domain deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to delete the Domain, please try again' });
    }
  }
  
  
  const getSingleDomain = async (req, res) => {
    try {
      const DomainId = req.params.id; 
  
      
      const Domain = await Domain.findById(DomainId);
  
      if (!Domain) {
        return res.status(404).json({ success: false, message: 'Domain not found' });
      }
  
      res.status(200).json({ success: true, data: Domain });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to retrieve the Domain, please try again' });
    }
  }
  
  
  const updateSingleDomain = async (req, res) => {
    try {
      const DomainId = req.params.id; 
      const updateData = req.body; 

  
      
      const updatedDomain = await Domain.findByIdAndUpdate(DomainId, updateData, { new: true });
      
      console.log(updatedDomain);

      if (!updatedDomain) {
        return res.status(404).json({ success: false, message: 'Domain not found' });
      }
  
      res.status(200).json({ success: true, data: updatedDomain });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to update the Domain, please try again' });
    }
  }
  

const deleteAllDomains = async (req, res) => {
  try {
    
    const deleteResult = await Domain.deleteMany({});

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No Domains found to delete' });
    }

    res.status(200).json({ success: true, message: 'All Domains deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to delete all Domains, please try again' });
  }
}

module.exports = {
    getAllDomains,
    postDomain,
    getSingleDomain,
    deleteSingleDomain,
    updateSingleDomain,
    deleteAllDomains
}