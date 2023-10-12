import React, { useState, useEffect } from 'react';
import './tabelDosen.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';
import { CButton } from '@coreui/react';
import axios from "axios";

function TabelCRUD() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllDataDosen();
  }, []);

  const getAllDataDosen = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-dosen');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to delete data
  const hapusData = async (id) => {
    const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');
  
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/data-dosen/delete/${id}`);
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };
  

  // JSX for the header section
  const headerSection = (
    <div className="font-header table-font">
      <div>
        <h2>Data Dosen</h2>
      </div>
    </div>
  );

  // JSX for the container and table-box
  const mainSection = (
    <div className="container">
      <div className="table-box">
        <CButton href={`/#/tambahDosen/`} className="btn-tambah table-font">
          + Tambah Data
        </CButton>
        <button className="btn-eksport table-font">Eksport</button>
        <button className="btn-impor table-font">Import</button>
        <table className="tabel">
          <thead>
            <tr>
              <th className="header-cell rata table-font">Nomor</th>
              <th className="header-cell rata table-font">Kode Dosen</th>
              <th className="header-cell rata table-font">ID Dosen</th>
              <th className="header-cell rata table-font">NIP</th>
              <th className="header-cell rata table-font">Nama</th>
              <th className="header-cell rata table-font">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="cell rata table-font">{index + 1}</td>
                <td className="cell rata table-font">{item.Kode_Dosen}</td>
                <td className="cell rata table-font">{item.InitialID}</td>
                <td className="cell rata table-font">{item.NIP}</td>
                <td className="cell rata table-font">{item.Nama_Dosen}</td>
                <td className="cell aksi">
                  <CButton href={`/#/detailDosen/${item.id}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
                    <CIcon icon={cilInfo} />
                  </CButton>
                  <CButton href={`/#/editDosen/${item.id}`} style={{ color: 'black', backgroundColor: 'transparent' }}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <button style={{ backgroundColor: 'transparent' }} onClick={() => hapusData(item.id)}>
                    <CIcon icon={cilTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {headerSection}
      {mainSection}
    </>
  );
}

export default TabelCRUD;
