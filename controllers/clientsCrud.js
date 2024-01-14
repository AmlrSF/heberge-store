
require('dotenv').config()

const Client = require('../schema/Clients');





const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const postClient = async (req, res) => {
    try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.json(savedClient);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteSingleClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.clientId);
        res.json(deletedClient);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getSingleClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId);
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
        const updatedClient = await Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true });
        res.json(updatedClient);
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