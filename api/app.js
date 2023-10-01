const express = require('express');
const bodyParser = require('body-parser');
const routesIndex = require('./routes');
const path_main = require('path');
const winston = require('winston');
const app = express();

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
      res.header(
          'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
      );
      return res.status(200).json({});
  }
  next();
});

// app.get('/', (req, res) => {
//   res.send('Welcome to the main page!');
// });

app.use('/', routesIndex);

// Use your routes here
// app.use('/class-schedules', jadwalKelasRoutes);
// app.use('/leave-requests', dataPengajuanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Handling incorrect url & db con error
app.use((req, res, next) => {
  var error = new Error('Not Found');
  console.log("(false URL)"); //this is me trying to log the error(s) related to incorrect URL
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log("Error");
  console.log("(db error)"); //this is me trying to log the error(s) related to DB error
  logger.error(error)
  res.status(error.status || 500);
  res.json({
      message: error.message
  });
});

//module export
module.exports = app;