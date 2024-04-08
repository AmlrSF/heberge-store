
// Import necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbSchema = new Schema({
    domain: {
        type: Schema.Types.ObjectId,
        ref: 'Domain',
        required: true,
    },
    host: String,
    dbName: String,
    dbPassword: String,
    type: String,
    dbUsername: String,
});


const DB = mongoose.model('DB', dbSchema);

module.exports = DB;