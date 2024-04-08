const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./dbConnection/connect');
const cron = require('node-cron');

<<<<<<< HEAD
const customer = require('./routes/customerRoute');

// const mail = require("./routes/mailRoute");
=======
const customer = require('./routes/customersRoute');

const mail = require("./routes/mailRoute");
>>>>>>> 5badb87c31d9f3a45c24b787dcc296d41d9e3180
const cookieParser = require('cookie-parser');

const { checkDomainsAndSendEmails } = require('./controllers/sendEmail')


// middleawre
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());



app.use('/api/v1/customers', customer);


<<<<<<< HEAD
=======
app.use('/api/v1/clients', client);


app.use('/api/v1', Db);


app.use('/api/v1', Ftp);


app.use('/api/v1', Cms);


>>>>>>> parent of b2ba328 (get notif evrey 15 days)

// app.use('/api/v1/',mail);
cron.schedule('0 0 * * *', () => {
    checkDomainsAndSendEmails();
});



const runServerApplication = async () => {
    try {
        await connectToMongoDb(process.env.MONGO_URL_KEY);
        app.listen(3000, () => {
            console.log('the server is running on port 3000');
        })
    } catch (error) {
        console.error(error);
    }
}

runServerApplication();