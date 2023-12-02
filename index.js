const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./dbConnection/connect');

const product = require('./routes/productRoute');
const customer = require('./routes/customersRoute');
const orders = require("./routes/orderRoute");
const billboards = require("./routes/billboardRoute");
const catgegories = require("./routes/categoryRoute");
const tags = require('./routes/tagRoute');

const cookieParser = require('cookie-parser');

// middleawre
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());

//set route
app.use('/api/v1/products',product);

app.use('/api/v1/customers',customer);

app.use('/api/v1/orders',orders);

app.use("/api/v1/billboards",billboards);

app.use('/api/v1/categories', catgegories);

app.use('/api/v1/tags', tags);
//get orders

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