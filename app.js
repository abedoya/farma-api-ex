const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./queries');
const port = 3000;

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
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/patients', db.getPatients);
app.get('/patients/:id', db.getPatientById);
app.put('/patients/:id', db.updatePatient);
app.post('/patients', db.createPatient);

app.get('/medicine/all', db.getAll);
app.get('/medicine/:pc', db.getMedicineByPc);
app.post('/medicine', db.createMedicine);
app.put('/medicine/:pc', db.updateMedicine);

app.post('/record', db.createRecord);
app.get('/record/:id', db.getRecordsByPatient);
app.get('/record/batch/:batch', db.getRecordByBatch);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
