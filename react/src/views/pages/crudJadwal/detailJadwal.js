import React from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';

const data = [
  {
    key: 1,
    kelas: 'D3 - 2A',
    hari: 'Selasa',
    jamke: '3',
    waktu: '08.40 - 09.30',
    matakuliah: 'Aljabar Linear (T)',
    namadosen: 'Aprianti Nanda S',
    ruangan: 'D108 - Kelas',
  },
];


const DetailJadwal = () => {
  const { key } = useParams();
  const keyAsNumber = Number(key);
  const jadwal = data.find((item) => item.key === keyAsNumber);

  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Keterangan Mata Kuliah</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {jadwal.kelas}</div>
              </div>
              <div className="item">
                <div className="label">Hari</div>
                <div className="value">: {jadwal.hari}</div>
              </div>
              <div className="item">
                <div className="label">Jam Ke</div>
                <div className="value">: {jadwal.jamke}</div>
              </div>
              <div className="item">
                <div className="label">Waktu</div>
                <div className="value">: {jadwal.waktu}</div>
              </div>
              <div className="item">
                <div className="label">Mata Kuliah</div>
                <div className="value">: {jadwal.matakuliah}</div>
              </div>
              <div className="item">
                <div className="label">Nama Dosen</div>
                <div className="value">: {jadwal.namadosen}</div>
              </div>
              <div className="item">
                <div className="label">Ruangan</div>
                <div className="value">: {jadwal.ruangan}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailJadwal;