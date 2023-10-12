import React from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';

const data = [
  {
    key: 1,
    nip: '197312271999031003',
    nama: 'Ade Chandra Nugraha, S.Si., M.T.',
    id: 'AD',
    kode: 'KO001N',
    email: 'chandra@jtk.polban.ac.id',
    status: 'Bukan Dosen Wali',
    kelas: null,
    prodi: null,
    image: avatar2,
  },
  {
    key: 2,
    nip: '198903252019032023',
    nama: 'Sri Ratna Wulan, S.Pd., M.T.',
    id: 'SW',
    kode: 'KO076N',
    email: 'sri.ratna@jtk.polban.ac.id',
    status: 'Dosen Wali',
    kelas: '2A',
    prodi: 'D3 Teknik Informatika',
    image: avatar1,
  },
];

const DetailDosen = () => {
  const { key } = useParams();
  const keyAsNumber = Number(key);
  const dosen = data.find((item) => item.key === keyAsNumber);

  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <img className="img" src={dosen.image} alt={`Foto ${dosen.nama}`} />
          <div className="nama">{dosen.nama}</div>
        </CCol>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Identitas Dosen</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIP</div>
                <div className="value">: {dosen.nip}</div>
              </div>
              <div className="item">
                <div className="label">ID</div>
                <div className="value">: {dosen.id}</div>
              </div>
              <div className="item">
                <div className="label">Kode</div>
                <div className="value">: {dosen.kode}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {dosen.email}</div>
              </div>
              <div className="item">
                <div className="label">Status</div>
                <div className="value">: {dosen.status}</div>
              </div>
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {dosen.kelas ? dosen.kelas : '-'}</div>
              </div>
              <div className="item">
                <div className="label">Prodi</div>
                <div className="value">: {dosen.prodi ? dosen.prodi : '-'}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailDosen;
