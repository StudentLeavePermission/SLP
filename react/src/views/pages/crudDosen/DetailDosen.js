import React from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';

const DetailDosen = () => {
  const { key } = useParams();
  const dosen = data.find((item) => item.key === Number(key));

  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <img className="img" src={dosen.image} />
          <div className='nama'>
            {dosen.nama}
          </div>
        </CCol>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className='details'>
            <div className='identitas'>
              <h3>Identitas Dosen</h3>
            </div>
            <div className="label-data">
              <div className='item'>
                <div className="label">NIP</div>
                <div className="value">: {dosen.nip}</div>
              </div>
              <div className='item'>
                <div className="label">ID</div>
                <div className="value">: {dosen.id}</div>
              </div>
              <div className='item'>
                <div className="label">Kode</div>
                <div className="value">: {dosen.kode}</div>
              </div>
              <div className='item'>
                <div className="label">Email</div>
                <div className="value">: {dosen.email}</div>
              </div>
              <div className='item'>
                <div className="label">Status</div>
                <div className="value">: {dosen.status}</div>
              </div>
              <div className='item'>
                <div className="label">Kelas</div>
                <div className="value">: {dosen.kelas || '-'}</div>
              </div>
              <div className='item'>
                <div className="label">Prodi</div>
                <div className="value">: {dosen.prodi || '-'}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailDosen;
