const express = require('express');
const bodyParser = require('body-parser');
const dataDosenRoutes = require('./routes/dataDosenRoutes');
const dataDosenWalidRoutes = require('./routes/dataDosenWaliRoutes');
const dataJamPelajaranRoutes = require('./routes/dataJamPelajaranRoutes');
const dataKelasRoutes = require('./routes/dataKelasRoutes');
const dataMahasiswaRoutes = require('./routes/dataMahasiswaRoutes');
const dataMataKuliahRoutes = require('./routes/dataMataKuliahRoutes');
const dataPengajuanRoutes = require('./routes/dataPengajuanRoutes');
const jadwalKelasRoutes = require('./routes/jadwalKelasRoutes');

const app = express();
app.use(bodyParser.json());

// Use your routes here
app.use('/class-schedules', jadwalKelasRoutes);
app.use('/leave-requests', dataPengajuanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
