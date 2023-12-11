import React, { useState, useEffect, useRef } from 'react';
import '../../../scss/style.css'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
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
        const [pengajuanResponse, studentD3Response, studentD4Response, jadwalResponse] = await Promise.all([
          axios.get('http://localhost:3000/data-pengajuan'),
          axios.get('http://localhost:3000/data-mahasiswa/students/all/1'),
          axios.get('http://localhost:3000/data-mahasiswa/students/all/2'),
          axios.get('http://localhost:3000/jadwal-kelas')
        ]);

        const studentD3 = studentD3Response.data.data;
        const studentD4 = studentD4Response.data.data;
        const combinedStudentData = [...studentD3, ...studentD4];

        const jadwalData = jadwalResponse.data.data;

        let id_pengajuan_combined = 1;

        let id_pengajuan_combined_list = [];

        console.log("Pengajuan Response: " + JSON.stringify(pengajuanResponse.data))

        console.log("Jadwal Data: " + JSON.stringify(jadwalData));

        console.log("ITEM.ID LOOP LIKELY STARTS HERE");

        const groupedLeaveRequests = pengajuanResponse.data.reduce((groups, item) => {
          const key = `${item.Jenis}_${item.Keterangan}_${item.Tanggal_Pengajuan}_${item.Status_Pengajuan}`;

          console.log('item.id = ' + item.id)
          if (item.id < id_pengajuan_combined) {
            id_pengajuan_combined = item.id
          }

          if (!groups[key]) {
            groups[key] = {
              ID: id_pengajuan_combined,
              Jenis: item.Jenis_Izin,
              Keterangan: item.Keterangan,
              Tanggal: item.Tanggal_Pengajuan,
              Status: item.Status_Pengajuan,
              Mahasiswa: combinedStudentData.find(student => student.id === item.ID_Mahasiswa),
              JamPelajaran: [],
            };
          }

          id_pengajuan_combined_list[id_pengajuan_combined++] = item.id

          groups[key].JamPelajaran.push(getJumlahJamIzin(pengajuanResponse.data, jadwalData, item.ID_Jadwal_Kelas, item.Tanggal_Pengajuan, item.Jenis_Izin, item.Keterangan));
          console.log("GROUPS JP: " + JSON.stringify(groups[key].JamPelajaran))
          return groups;
        }, {});

        console.log("ITEM.ID LOOP LIKELY ENDS HERE");
        console.log("LIST OF PENGAJUAN ID (ITEM.ID): " + JSON.stringify(id_pengajuan_combined_list))
        sessionStorage.setItem('stored_item_id_list', JSON.stringify(id_pengajuan_combined_list));

        Object.values(groupedLeaveRequests).forEach((group) => {
          const uniqueJamPelajaran = Array.from(new Set(group.JamPelajaran.flat()));
          group.JamPelajaran = uniqueJamPelajaran.length === 1 ? [uniqueJamPelajaran[0]] : uniqueJamPelajaran;
        });

        const dataPengajuan = Object.values(groupedLeaveRequests);
        setDaftarPengajuan(dataPengajuan);
        console.log('Data pengajuan final: ' + JSON.stringify(dataPengajuan))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    function getJamStart(data, id_jadwal) {
      let i = 0;
      console.log("Data length: " + data.length + ", id_jadwal = " + id_jadwal)
      while (i < data.length) {
        console.log("Data["+i+"].id = "+data[i].id)
        if (data[i].id === id_jadwal) {
          console.log("data[i].ID_Jam_Pelajaran_Start: " + data[i].ID_Jam_Pelajaran_Start)
          return data[i].ID_Jam_Pelajaran_Start;
        }
        i++;
      }
      console.log("getJamStart returns null. sry")
      return "NULL";
    }

    function getJamEnd(data, id_jadwal) {
      let i = 0;
      console.log("Data length: " + data.length + ", id_jadwal = " + id_jadwal)
      while (i < data.length) {
        console.log("Data["+i+"].id = "+data[i].id)
        if (data[i].id === id_jadwal) {
          console.log("data[i].ID_Jam_Pelajaran_End: " + data[i].ID_Jam_Pelajaran_End)
          return data[i].ID_Jam_Pelajaran_End;
        }
        i++;
      }
      console.log("getJamEnd returns null. sry")
      sessionStorage.setItem('')
      return "NULL";
    }

    function getJumlahJamIzin(mahasiswa, jadwal, id_jadwal, tgl, jenis, keterangan) {
      console.log("mahasiswa: " + JSON.stringify(mahasiswa) + ", jadwal: " + JSON.stringify(jadwal) + ", id_jadwal: " + id_jadwal + ", tgl: " + tgl + ", jenis: " + jenis + ", keterangan: " + keterangan)
      const response = mahasiswa.filter(item => item.Jenis_Izin === jenis && item.Tanggal_Pengajuan === tgl && item.Keterangan.toLowerCase() === keterangan.toLowerCase());
      let jumlahJP = 0;
      console.log("Response: " + JSON.stringify(response))
      response.forEach(item => {
        console.log("Filtered Jadwal: "+JSON.stringify(jadwal.filter(item => item.id === id_jadwal))+", ID_Jadwal_Kelas: "+id_jadwal);
        const jamStart = getJamStart(jadwal.filter(item => item.id === id_jadwal), id_jadwal);
        const jamEnd = getJamEnd(jadwal.filter(item => item.id === id_jadwal), id_jadwal);
        jumlahJP += jamEnd - jamStart + 1;
      });
      console.log("Jumlah Jam Pelajaran getJumlahJamIzin: " + jumlahJP)
      return jumlahJP;
    }


    fetchData();
  }, []);

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
