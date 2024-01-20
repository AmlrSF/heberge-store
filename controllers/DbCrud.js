const DB = require('../schema/DB'); // Assuming your DB model is in the 'models' directory

const getAllDBs = async (req, res) => {
  try {
    const dbs = await DB.find();

    res.json(dbs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleDB = async (req, res) => {
  try {
    const db = await DB.findById(req.params.id);
    res.json(db);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postDB = async (req, res) => {
  const db = new DB(req.body);

  try {
    const savedDB = await db.save();
    res.status(201).json(savedDB);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSingleDB = async (req, res) => {
  try {
    const updatedDB = await DB.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDB);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSingleDB = async (req, res) => {
  try {
    await DB.findByIdAndDelete(req.params.id);
    res.json({ message: 'DB deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllDBs = async (req, res) => {
  try {
    await DB.deleteMany();
    res.json({ message: 'All DBs deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingledbBaseDomain = async(req,res)=>{
  try {
    let result = await DB.find({ domain : req.params.id});
    res.json({ success:true, db : result } );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllDBs,
  getSingleDB,
  postDB,
  updateSingleDB,
  deleteSingleDB,
  deleteAllDBs,
  getSingledbBaseDomain
};
