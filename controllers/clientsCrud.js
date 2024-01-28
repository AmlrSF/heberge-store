
require('dotenv').config()

const Client = require('../schema/Clients');
const Domain = require('../schema/domains');




const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json({success:true, clients});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const postClient = async (req, res) => {
    console.log(req.body);
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.json({success:true, savedClient});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteSingleClient = async (req, res) => {
    console.log(req.params.id);
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        await Domain.deleteMany({client:req.body.id})
        res.json(deletedClient);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getSingleClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteAllClients = async (req, res) => {
    try {
        await Client.deleteMany();
        res.json({ message: 'All clients deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSingleClient = async (req, res) => {
    try {
        console.log(req.body);
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({success:true, updatedClient});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllClients,
    postClient,
    getSingleClient,
    deleteSingleClient,
    updateSingleClient,
    deleteAllClients
}