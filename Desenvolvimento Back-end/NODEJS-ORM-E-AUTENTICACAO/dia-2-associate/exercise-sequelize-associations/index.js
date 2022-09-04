const bodyParser = require('body-parser');

const express = require('express');
const patientsController = require('./controllers/patientsController');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/patients/plans',patientsController.getAllPlans);
app.get('/patients/surgeries',patientsController.getAllSurgeries);
app.get('/patients/surgeries/no-doctor',patientsController.getPatientsSurgeries);
app.get('/patients/plans/:id', patientsController.getByIdPlan);
app.post('/patients/plans',patientsController.create);
app.get('/surgeries/:name', patientsController.getDoctorSurgeries);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});