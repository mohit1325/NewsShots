fs = require('fs');
const axios = require('axios');
express = require('express');
cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', cors());
app.get('/news/:category', cors(corsOptions), (req, res, next) => {
    // console.log(req.params.category);
    axios.get(`https://content.guardianapis.com/search?section=${req.params.category}&api-key=//your-api-key&page-size=20&show-blocks=main`)
        .then(response => {
            // console.log(response);
            results = response.data;
            return res.send(results);
        })
        .catch(error => {
            return res.send(error);
        });
});

app.post('/details', cors(corsOptions), (req, res, next) => {
    console.log(req.body.id);
    const params = req.body;
    axios.get(`https://content.guardianapis.com/search?ids=${params.id}&api-key=//your-api-key&page-size=100&show-blocks=all`)
        .then(response => {
            results = response.data;
            return res.send(results);
        })
        .catch(error => {
            return res.send(error);
        })
});
app.listen(4000);