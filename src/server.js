require('dotenv').config();

const express = require('express');
const serverless = require('serverless-http')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoString = process.env.DATABASE_URL;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.use('/.netlify/functions/server', require('./routes/routes'))    


mongoose.set('strictQuery', false);

mongoose
    .connect(mongoString)
    .then(() => console.log('Connected to db'))
    .catch(err => console.log(err))


app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`)
})


module.exports.handler = serverless(app)









