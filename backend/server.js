const express = require('express');
const bodyParser = require('body-parser');
const API_PORT = 5001;
const app = express();
// const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Backend Working");
});

app.listen(API_PORT, () => console.log('LISTENING ON PORT' + API_PORT));