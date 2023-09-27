const express = require('express');
const bodyParser = require('body-parser');
const jadwalKelasRoutes = require('./routes/jadwalKelasRoutes');
const dataPengajuanRoutes = require('./routes/dataPengajuanRoutes');

const app = express();
app.use(bodyParser.json());

// Use your routes here
app.use('/class-schedules', classScheduleRoutes);
app.use('/leave-requests', dataPengajuanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
