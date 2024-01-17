const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./dbConnection/connect');
const cron = require('node-cron');
const domain = require('./routes/domainRoute');
const customer = require('./routes/customersRoute');
const client = require('./routes/clientsRoute')
const mail = require("./routes/mailRoute");
const cookieParser = require('cookie-parser');
const { checkDomainsAndSendEmails } =  require('./controllers/sendEmail')
// middleawre
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

//set route
app.use('/api/v1/domains',domain);

app.use('/api/v1/customers',customer);

app.use('/api/v1/clients',client);

// app.use('/api/v1/',mail);

cron.schedule('0 0 * * *', () => {
    checkDomainsAndSendEmails();
});



const runServerApplication = async()=>{
    try {
        await connectToMongoDb(process.env.MONGO_URL_KEY);
        app.listen(3000,()=>{
            console.log('the server is running on port 3000');
        })
    } catch (error) {
        console.error(error);
    }
}

runServerApplication();