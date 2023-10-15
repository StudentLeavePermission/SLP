import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import './tabelPengajuan'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';
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

const TabelCRUD = () => {
  const tableRef = useRef(null);

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

    // Inisialisasi DataTables pada tabel menggunakan ref
    const dataTable = $(tableRef.current).DataTable({
      paging: true, // Aktifkan paginasi
      searching: true, // Aktifkan pencarian
      lengthChange: false, // Sembunyikan dropdown "Show [X] entries"
      pageLength: 5, // Set panjang halaman default menjadi 5 entri per halaman
      // Konfigurasi DataTables lainnya
    });

    return () => {
      // Hapus DataTables saat komponen unmount
      dataTable.destroy();
    };
  }, []);

  const [data, setData] = useState([
    {
      key: '1',
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
      key: '2',
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
  ]);

  const [form, setForm] = useState({}); // Form data
  // const [detailItem, setDetailItem] = useState(null); // To display details
  const [editIndex, setEditIndex] = useState(-1); // Index of the data being edited

  // Function to add new data
  const tambahData = () => {
    setData([...data, form]);
    setForm({});
  };

  // Function to delete data
  const hapusData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);

    // Setelah menghapus data, perlu memeriksa apakah data yang dihapus adalah data yang sedang diedit
    // Jika ya, kita perlu menghentikan mode pengeditan.
    if (editIndex === index) {
      setEditIndex(-1);
      setForm({});
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
        <CButton href="/#/tambahDosen/" onClick={tambahData} color="primary" className="btn-tambah table-font">
          + Tambah Data
        </CButton>
        <CButton color="info" className="btn-eksport table-font">Eksport</CButton>
        <CButton color="info" className="btn-impor table-font">Import</CButton>
        <CTable ref={tableRef} className="tabel">
          <CTableHead>
            <CTableRow>
              <CTableDataCell className="header-cell rata table-font">Nomor</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">NIM</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Nama Lengkap</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Kelas</CTableDataCell>
              <CTableDataCell className="header-cell rata table-font">Aksi</CTableDataCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((item) => (
              <CTableRow key={item.key}>
                <CTableDataCell className="cell rata table-font">{item.key}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.kode}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.id}</CTableDataCell>
                <CTableDataCell className="cell rata table-font">{item.nip}</CTableDataCell>
                <CTableDataCell className="cell aksi">
                  <CButton to={`/detailDosen/${item.key}`} color="info" className="margin-button">
                    <CIcon icon={cilInfo} />
                  </CButton>
                  <CButton to={`/editDosen/${item.key}`}>
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
      {headerSection}
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
              <TabelCRUD />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation;
