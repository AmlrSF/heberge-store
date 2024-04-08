const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  purchasePrice: Number,
  buyingPrice: Number,
  status: Boolean,
  startDate: Date,
  endDate: Date,
  domainName: String,
  domain:Boolean,
  hostOvhOffer: String,
  hosting: Boolean,
  mail: Boolean,
});

const Domain = mongoose.model('Domain', domainSchema);

module.exports = Domain;
