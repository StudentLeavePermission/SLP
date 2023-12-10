import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery';
import 'datatables.net';
import '../../../scss/style.css';
import axios from 'axios'
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';

const TabelPengajuanMahasiswa = () => {
  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Tanggal');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pengajuanResponse, studentD3Response, studentD4Response] = await Promise.all([
          axios.get('http://localhost:3000/data-pengajuan'),
          axios.get('http://localhost:3000/data-mahasiswa/students/all/1'),
          axios.get('http://localhost:3000/data-mahasiswa/students/all/2')
        ]);

        const studentD3 = studentD3Response.data.data;
        const studentD4 = studentD4Response.data.data;
        const combinedStudentData = [...studentD3, ...studentD4];

        const groupedLeaveRequests = pengajuanResponse.data.reduce((groups, item) => {
          const key = `${item.Jenis}_${item.Keterangan}_${item.Tanggal_Pengajuan}`;

          if (!groups[key]) {
            groups[key] = {
              ID: item.id,
              Jenis: item.Jenis_Izin,
              Keterangan: item.Keterangan,
              Tanggal: item.Tanggal_Pengajuan,
              Status: item.Status_Pengajuan,
              Mahasiswa: combinedStudentData.find(student => student.id === item.ID_Mahasiswa),
              JamPelajaran: [],
            };
          }

          groups[key].JamPelajaran.push(getJumlahJamIzin(pengajuanResponse.data, item.Tanggal_Pengajuan, item.Jenis_Izin, item.Keterangan) + " jam");

          return groups;
        }, {});

        const dataPengajuan = Object.values(groupedLeaveRequests);
        setDaftarPengajuan(dataPengajuan);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getJamStart = (data, id_jadwal) => {
    const item = data.find(item => item.id === id_jadwal);
    return item ? item.ID_Jam_Pelajaran_Start : "NULL";
  };

  const getJamEnd = (data, id_jadwal) => {
    const item = data.find(item => item.id === id_jadwal);
    return item ? item.ID_Jam_Pelajaran_End : "NULL";
  };

  const getJumlahJamIzin = (data, tgl, jenis, keterangan) => {
    const response = data.filter(item => item.Jenis_Izin === jenis && item.Tanggal_Pengajuan === tgl && item.Keterangan.toLowerCase() === keterangan.toLowerCase());
    let jumlahJP = 0;
    response.forEach(item => {
      jumlahJP += getJamEnd(data, item.ID_Jadwal_Kelas) - getJamStart(data, item.ID_Jadwal_Kelas) + 1;
    });
    return jumlahJP;
  };

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const filteredData = daftarPengajuan.filter((item) =>
    item.Jenis.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Tanggal.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    item.JamPelajaran.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    item.Status.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Mahasiswa.NIM.toString().toLowerCase().includes(searchText.toLowerCase()) ||
    item.Mahasiswa.Nama.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'Jenis') {
      return order * a.Jenis.localeCompare(b.Jenis);
    } else if (sortBy === 'Tanggal') {
      return order * a.Tanggal.toString().localeCompare(b.Tanggal.toString());
    } else if (sortBy === 'JP') {
      return order * a.JamPelajaran.toString().localeCompare(b.JamPelajaran);
    } else if (sortBy === 'Status') {
      return order * a.Status.localeCompare(b.Status);
    } else if (sortBy === 'NIM') {
      return order * a.Mahasiswa.NIM.toString().localeCompare(b.Mahasiswa.NIM.toString());
    } else if (sortBy === 'Nama') {
      return order * a.Mahasiswa.Nama.localeCompare(b.Mahasiswa.Nama);
    }
  });

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

  const formatTanggal = (tanggal) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(tanggal).toLocaleString('en-US', options);
  };

  return (
    <div className='container'>
      <div className="containerTabel">
        <div className="containerTabel table-box">
          <div className="d-flex justify-content-between">
            <div className="table-font">
              <h2>Daftar Pengajuan Mahasiswa</h2>
            </div>
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
                    <th className="header-cell rata table-font">Nomor</th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('NIM')}>
                        NIM
                        <span className="sort-icon">
                          {sortBy === 'NIM' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('Nama')}>
                        Nama
                        <span className="sort-icon">
                          {sortBy === 'Nama' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('Jenis')}>
                        Jenis
                        <span className="sort-icon">
                          {sortBy === 'Jenis' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('Tanggal')}>
                        Tanggal Pengajuan
                        <span className="sort-icon">
                          {sortBy === 'Tanggal' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('JP')}>
                        Jumlah Jam Pelajaran
                        <span className="sort-icon">
                          {sortBy === 'JP' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div onClick={() => handleSort('Status')}>
                        Status Pengajuan
                        <span className="sort-icon">
                          {sortBy === 'Status' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                        </span>
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div>
                        Aksi
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={index}>
                      <td className="cell rata table-font">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td className="cell rata table-font">{item.Mahasiswa.NIM}</td>
                      <td className="cell rata table-font">{item.Mahasiswa.Nama}</td>
                      <td className="cell rata table-font">{item.Jenis}</td>
                      <td className="cell rata table-font">{formatTanggal(item.Tanggal)}</td>
                      <td className="cell rata table-font">{item.JamPelajaran}</td>
                      <td className="cell rata table-font">{item.Status}</td>
                      <td className="cell aksi">
                        <CButton href={`/#/dosen/verifyPengajuan/${item.ID}`} style={{ backgroundColor: 'transparent', color: 'black' }}>
                          <CIcon icon={cilInfo} />
                        </CButton>
                        <CButton href={``} style={{ backgroundColor: 'transparent', color: 'black' }} >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton onClick={''} style={{ backgroundColor: 'transparent', color: 'black' }}>
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
    </div>
  );
};

export default TabelPengajuanMahasiswa;
