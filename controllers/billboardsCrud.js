const Billboard = require('../schema/billboards');

// Create a new billboard
const createBillboard = async (req, res) => {
  try {
    const newBillboard = await Billboard.create(req.body);
    res.status(201).json(newBillboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all billboards
const getAllBillboards = async (req, res) => {
  try {
    const allBillboards = await Billboard.find();
    res.json(allBillboards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific billboard by ID
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

// Update a billboard by ID
const updateBillboardById = async (req, res) => {
  const billboardId = req.params.id;
  try {
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

// Delete a billboard by ID
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

// CRUD routes
module.exports = {
    deleteBillboardById,
    createBillboard,
    updateBillboardById,
    getBillboardById,
    getAllBillboards,
    deleteAllBillboards
}