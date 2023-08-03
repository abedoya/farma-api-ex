const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./queries');
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/patients', db.getPatients);
app.post('/users', db.createPatient);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
