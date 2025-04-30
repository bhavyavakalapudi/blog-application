const express = require("express");
const router = require("./routes/index");
const app = express()
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(express.json())

app.use('/api/v1', router)

// const PORT = process.env.PORT || 3000

app.listen(process.env.PORT)