const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const server = require('http').createServer(app)
const path = require('path');

const port = 9001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('/', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.join(__dirname + '/../client/dist'));
});

app.listen(port, function() {
    console.log('We are listening on port', port);
});


