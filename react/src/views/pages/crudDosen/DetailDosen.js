import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';

const DetailDosen = () => {
  const { key } = useParams();
  const [data, setDosen] = useState();

  // Ganti URL sesuai dengan endpoint API atau server Anda
  const apiUrl = `http://localhost:3000/data-dosen/get/${key}`;

  useEffect(() => {
    // Fetch data detail dosen dari API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setDosen(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiUrl]);

  if (!data) {
    return <div>Loading...</div>; // Tampilkan pesan loading selama data diambil
  }

  return (
    <div className="container">
      <CRow>
        {/* <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <img className="img" src={data.image} alt={`Foto ${data.nama}`} />
          <div className="nama">{data.nama}</div>
        </CCol> */}
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Identitas Dosen</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIP</div>
                <div className="value">: {data.NIP}</div>
              </div>
              <div className="item">
                <div className="label">ID</div>
                <div className="value">: {data.InitialID}</div>
              </div>
              <div className="item">
                <div className="label">Nama</div>
                <div className="value">: {data.Nama_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Kode</div>
                <div className="value">: {data.Kode_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {data.Email_Dosen}</div>
              </div>
              {/* <div className="item">
                <div className="label">Status</div>
                <div className="value">: {dosen.Status}</div>
              </div>
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {dosen.Kelas ? dosen.Kelas : '-'}</div>
              </div>
              <div className="item">
                <div className="label">Prodi</div>
                <div className="value">: {dosen.Prodi ? dosen.Prodi : '-'}</div>
              </div> */}
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailDosen;
