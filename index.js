const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./dbConnection/connect');
const product = require('./routes/productRoute');



// middleawre
app.use(cors());
app.use(express.json({limit:'50mb'}));

//set route
app.use('/api/v1/products',product);


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