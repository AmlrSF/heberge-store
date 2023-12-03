require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const Billboard = require('../schema/billboards');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const createBillboard = async (req, res) => {
  let {
    image,
    header,
    description
  } = req.body;

  const photoUrl = await cloudinary.uploader.upload(image);

  try {
    const newBillboard = await Billboard.create({
      image : photoUrl.url,
      header,
      description
    });
    res.status(201).json(newBillboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllBillboards = async (req, res) => {
  try {
    const allBillboards = await Billboard.find({});
    res.json(allBillboards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBillboardById = async (req, res) => {
  const billboardId = req.params.id;
  try {
    const foundBillboard = await Billboard.findById(billboardId);
    if (foundBillboard) {
      res.json(foundBillboard);
    } else {
      res.status(404).json({ error: 'Billboard not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateBillboardById = async (req, res) => {
  const billboardId = req.params.id;
  try {

    if(req.body.image){
      const photoUrl = await cloudinary.uploader.upload(req.body.image);
      req.body.image = photoUrl.url;
    }

    const updatedBillboard = await Billboard.findByIdAndUpdate(billboardId, req.body, { new: true });
    if (updatedBillboard) {
      res.json(updatedBillboard);
    } else {
      res.status(404).json({ error: 'Billboard not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteBillboardById = async (req, res) => {
  const billboardId = req.params.id;
  try {
    const deletedBillboard = await Billboard.findByIdAndDelete(billboardId);
    if (deletedBillboard) {
      res.json({ message: 'Billboard deleted successfully' });
    } else {
      res.status(404).json({ error: 'Billboard not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAllBillboards = async (req, res) => {
  try {
    await Billboard.deleteMany({});
    res.json({ message: 'All billboards deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
    deleteBillboardById,
    createBillboard,
    updateBillboardById,
    getBillboardById,
    getAllBillboards,
    deleteAllBillboards
}