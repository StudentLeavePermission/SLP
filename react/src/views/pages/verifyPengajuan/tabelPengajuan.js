import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
// import './tabelPengajuan.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';

const TabelPengajuan = () => {
  const tableRef = useRef(null);

  // useEffect(() => {
  //   // Mengatur opsi bahasa DataTables
  //   $.extend($.fn.dataTable.defaults, {
  //     language: {
  //       paginate: {
  //         previous: '<', // Mengubah "Previous" menjadi tanda "<"
  //         next: '>', // Mengubah "Next" menjadi tanda ">"
  //       },
  //     },
  //   });

  //   // Inisialisasi DataTables pada tabel menggunakan ref
  //   const dataTable = $(tableRef.current).DataTable({
  //     paging: true, // Aktifkan paginasi
  //     searching: true, // Aktifkan pencarian
  //     lengthChange: false, // Sembunyikan dropdown "Show [X] entries"
  //     pageLength: 5, // Set panjang halaman default menjadi 5 entri per halaman
  //     // Konfigurasi DataTables lainnya
  //   });

  //   return () => {
  //     // Hapus DataTables saat komponen unmount
  //     dataTable.destroy();
  //   };
  // }, []);

  // const [data, setData] = useState([
  //   {
  //     key: '1',
  //     nip: '197312271999031003',
  //     nama: 'Ade Chandra Nugraha, S.Si., M.T.',
  //     id: 'AD',
  //     kode: 'KO001N',
  //     email: 'chandra@jtk.polban.ac.id',
  //     status: 'Bukan Dosen Wali',
  //     kelas: null,
  //     prodi: null,
  //     image: avatar2,
  //   },
  //   {
  //     key: '2',
  //     nip: '198903252019032023',
  //     nama: 'Sri Ratna Wulan, S.Pd., M.T.',
  //     id: 'SW',
  //     kode: 'KO076N',
  //     email: 'sri.ratna@jtk.polban.ac.id',
  //     status: 'Dosen Wali',
  //     kelas: '2A',
  //     prodi: 'D3 Teknik Informatika',
  //     image: avatar1,
  //   },
  // ]);

  // const [data, setData] = useState([]);

  const [data, setData] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/`);
      console.log(response.data);
      setData(response.data); // Ambil data dari response

      if (response.status === 200) {
        console.log('Data yang telah diambil dari server:');
        // Atur formData dengan data dari database
        // setData({
        //   ID_Mahasiswa: data.ID_Mahasiswa,
        //   Keterangan: data.Keterangan,
        //   Jenis_Izin: data.Jenis_Izin,
        //   Tanggal_Pengajuan: data.Tanggal_Pengajuan,
        //   Tanggal_Izin: data.Tanggal_Izin,
        //   ID_Jadwal_Kelas: data.ID_Jadwal_Kelas,
        //   File_Pengajuan: data.File_Pengajuan,
        //   Status_Pengajuan: data.Status_Pengajuan,
        //   Alasan_Penolakan: data.Alasan_Penolakan
        // });
        // setData(response.data.data);
        console.log(data);
        // setSelectedDate(data.Tanggal_Izin);
      } else {
        console.error('Gagal mengambil data pengajuan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const navigateToVerification = (key) => {
    console.log("ID: "+key);
    nav(`../verifyPengajuan/${key}`);
  };

  // JSX for the header section
  // const headerSection = (
  //   <div className="font-header table-font">
  //     <div>
  //       <h2>Data Pengajuan</h2>
  //     </div>
  //   </div>
  // );

  // JSX for the container and table-box
  const mainSection = (
    <div className="container">
      <div className="table-box">
        {/* <CButton href="/#/tambahDosen/" onClick={tambahData} color="primary" className="btn-tambah table-font"> */}
          {/* + Tambah Data */}
        {/* </CButton> */}
        {/* <CButton color="info" className="btn-eksport table-font">Eksport</CButton> */}
        {/* <CButton color="info" className="btn-impor table-font">Import</CButton> */}
        <CTable ref={tableRef} className="tabel">
          <CTableHead>
            <CTableRow>
              <CTableDataCell className="header-cell rata table-font">Nomor</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">NIM</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Nama Lengkap</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Keterangan</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Jenis Izin</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Tanggal Pengajuan</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Tanggal Izin</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Jam Izin</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">File Pengajuan</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Status Pengajuan</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Alasan Penolakan</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Aksi</CTableDataCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell className="cell rata table-font">{item.id}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.id}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.id}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Keterangan}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Jenis_Izin}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Tanggal_Pengajuan}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Tanggal_Izin}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Jam_Izin}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.File_Pengajuan}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Status_Pengajuan}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.Alasan_Penolakan}</CTableDataCell>
                <CTableDataCell className="cell aksi">
                  <CButton onClick={() => navigateToVerification(item.id)} color="info" className="margin-button">
                    <CIcon icon={cilInfo} />
                  </CButton>
                  <CButton to={`/editDosen/${item.id}`}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => hapusData(index)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
  return (
    <>
      {/* {headerSection} */}
      {mainSection}
    </>
  );
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <strong className="table-font-judul fs-5">Tabel Pengajuan</strong>
            <DocsExample href="forms/validation">
              <TabelPengajuan />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation;
