import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; 
import 'datatables.net'; 
import './TabelCRUD.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilCloudUpload, cilCloudDownload } from '@coreui/icons';
import { CButton, CCol, CRow } from '@coreui/react';
import axios from 'axios';

function TabelCRUD({}) {
  const tableRef = useRef(null);  
  const [dataJadwal, setDataJadwal] = useState([]);

  useEffect(() => {
    getAllClassSchedules();
  }, []);

  const getAllClassSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jadwal-kelas/formatted');
      const dataJamPelajaran = response.data.jam_pelajaran; 
      console.log(dataJamPelajaran);
      const dataDosen = response.data.dosen;        
      const dataMatkul = response.data.mata_kuliah;
      const dataKelas = response.data.kelas;
      console.log(dataKelas);
      const formattedData = response.data.data.map((item, index) => {
        const JamPelajaran = getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_Start)+" - "+ tambahIntervalWaktu(getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_End), 50); 
        const namaDosen = getNamaDosen(dataDosen, item.ID_Dosen);
        const namaMatkul = getNamaMatkul(dataMatkul, item.ID_Matkul);
        const namaKelas = getNamaKelas(dataKelas, item.ID_Kelas);
        return {
          ...item,
          DT_RowId: `${index + 1}`,
          Jam: JamPelajaran,
          Nama_Dosen: namaDosen,
          Mata_Kuliah: namaMatkul,
          Nama_Kelas: namaKelas
        };
      });
      setDataJadwal(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function tambahIntervalWaktu(time, intervalMenit) {
    const [jam, menit, detik] = time.split(':').map(Number);
  
    const totalMenit = (jam * 60) + menit;
  
    const totalMenitBaru = totalMenit + intervalMenit;
  
    const jamBaru = Math.floor(totalMenitBaru / 60);
    const sisaMenit = totalMenitBaru % 60;
  
    // Format hasil baru sebagai tipe data time (HH:MM:SS)
    const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }

  function getJamPelajaran (data, id_jam){
    let i = 0;
    while (i < data.length){
      if (data[i].id == id_jam){
        return data[i].Waktu_Mulai;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaDosen (data, id_dosen){
    let i = 0;
    while (i < data.length){
      if (data[i].Data_Dosen.id == id_dosen){
        return data[i].Data_Dosen.Nama_Dosen;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaMatkul (data, id_matkul){
    let i = 0;
    while (i < data.length){
      if (data[i].Data_Mata_Kuliah.id == id_matkul){
        return data[i].Data_Mata_Kuliah.Nama_Mata_Kuliah;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaKelas (data, id_kelas){
    let i = 0;
    while (i < data.length){
      if (data[i].id == id_kelas){
        return data[i].Nama_Kelas;
      }
      i++;
    }
    return "NULL";
  }
  
  useEffect(() => {
    // Mengatur opsi bahasa DataTables
    $.extend($.fn.dataTable.defaults, {
      language: {
        paginate: {
          previous: '<', // Mengubah "Previous" menjadi tanda "<"
          next: '>', // Mengubah "Next" menjadi tanda ">"
        },
      },
    });
  }, [dataJadwal]);

  const [form, setForm] = useState({}); // Form data
  const [detailItem, setDetailItem] = useState(null); // To display details
  const [editIndex, setEditIndex] = useState(-1); // Index of the data being edited
  const [sortBy, setSortBy] = useState('Nomor');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Function to filter data based on search text
  const filteredData = dataJadwal.filter((item) =>
    item.Hari_Jadwal.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Nama_Dosen.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Mata_Kuliah.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Nama_Kelas.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Jam.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'Mata Kuliah') {
      return order * a.Mata_Kuliah.localeCompare(b.Mata_Kuliah);
    } else if (sortBy === 'Hari Jadwal') {
      return order * a.Hari_Jadwal.localeCompare(b.Hari_Jadwal);
    } else if (sortBy === 'Jam') {
      return order * a.Jam.localeCompare(b.Jam);
    } if (sortBy === 'Kelas') {
      return order * a.Nama_Kelas.localeCompare(b.Nama_Kelas);
    }    
  });

  // Calculate the number of pages
  const pageNumbers = Math.ceil(sortedData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to delete data
  const hapusData = async (id) => {
    const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/jadwal-kelas/delete/${id}`);
        const newData = dataJadwal.filter((item) => item.id !== id);
        setDataJadwal(newData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  // JSX for the header section
  const headerSection = (
    <div className="font-header table-font">
      <div>
        <h2>Data Jadwal Mata Kuliah</h2>
      </div>
    </div>
  );


  // JSX untuk bagian isian tabel
  return (
    <>
      <div className="container-jadwal">
        <div className="table-box">
          <div className="top-table">
            <CButton href={`/#/admin/tambahJadwal`} className="btn-tambah table-font">
              + Tambah Data
            </CButton>
            <CButton href={`/#/`} className="upload" style={{ backgroundColor: '#EDEA96'}}>
              <CCol>
                <CIcon icon={cilCloudUpload} />
              </CCol>
              <CCol>
                Upload file
              </CCol>
            </CButton>
            <CButton href={`/#/`} className="upload" style={{ backgroundColor: '#EDEA96'}}>
              <CCol>
                <CIcon icon={cilCloudDownload} />
              </CCol>
              <CCol>
                Download
              </CCol>
            </CButton>
            <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="search-input"
                />
                <CIcon icon={cilSearch} className="search-icon" />
            </div>
          </div>
          <table className="tabel">
            <thead>
              <tr>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Hari Jadwal')}>
                    Hari
                    <span className="sort-icon">
                      {sortBy === 'Hari Jadwal' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jam')}>
                    Jam
                    <span className="sort-icon">
                      {sortBy === 'Jam' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Mata Kuliah')}>
                    Mata Kuliah
                    <span className="sort-icon">
                      {sortBy === 'Mata Kuliah' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Kelas')}>
                    Kelas
                    <span className="sort-icon">
                      {sortBy === 'Kelas' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {currentData.map((item, index) => (
            <tr key={index}>
              <td className="cell rata table-font">{item.Hari_Jadwal}</td>
              <td className="cell rata table-font">{item.Jam}</td>
              <td className="cell rata table-font">{item.Mata_Kuliah}</td>
              <td className="cell rata table-font">{item.Nama_Kelas}</td>
              <td className="cell aksi">
                <CButton href={`/#/admin/detailJadwal/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilInfo} />
                </CButton>                
                <CButton href={`/#/admin/editJadwal/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }} >
                    <CIcon icon={cilPencil} />
                </CButton>
                <CButton onClick={() => hapusData(item.id)} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </td>
            </tr>
          ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="btn-pagination"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            {Array.from({ length: pageNumbers }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={i}
                  className={`btn-pagination ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className="btn-pagination"
              onClick={handleNextPage}
              disabled={currentPage === pageNumbers}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabelCRUD;
