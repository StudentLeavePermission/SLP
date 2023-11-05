import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow, CButton } from '@coreui/react';
import './crudKelas.css';
import axios from 'axios';

const DetailKelas = () => {
  const { key } = useParams();
  const [dataKelas, setDataKelas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getKelasData();
  }, [key]);

  const getKelasData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-kelas/getoneformat/${key}`);
      setDataKelas(response.data.dataKelas);
      setLoading(false);
    } catch (error) {
    }
  };

  let kelas = '';
  let prodi = '';

  if (dataKelas) {
    const nama_kelas = dataKelas.Nama_Kelas;
    const karakterArray = nama_kelas.split('');

    if (karakterArray.length >= 4) {
      kelas = karakterArray.slice(0, 2).join('');
      prodi = karakterArray.slice(2).join('') + ' Teknik Informatika';
    }
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : dataKelas ? (
        <div className="container-detail">
          <CRow>
            <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
              <div className="details">
                <div className="identitas">
                  <h3>Identitas Kelas</h3>
                </div>
                <div className="label-data">
                  <div className="item">
                    <div className="label">Kelas</div>
                    <div className="value">: {kelas}</div>
                  </div>
                  <div className="item">
                    <div className="label">Program Studi</div>
                    <div className="value">: {prodi}</div>
                  </div>
                  <div className="item">
                    <div className="label">Tahun Masuk</div>
                    <div className="value">: {dataKelas.Tahun_Ajaran}</div>
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
          <a href={`/#/admin/dataKelas`} className="btn btn-secondary float-start">
            Kembali
          </a>
        </div>
      ) : (
        <p>Data tidak ditemukan</p>
      )}
    </div>
  );
};

export default DetailKelas;
