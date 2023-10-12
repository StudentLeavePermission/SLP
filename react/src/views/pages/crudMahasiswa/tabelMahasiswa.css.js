import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import './tabelMahasiswa.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';
import { CButton } from '@coreui/react';
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';

function TabelCRUD() {
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
        <CButton href={`/#/tambahDosen/`} onClick={tambahData} className="btn-tambah table-font">
            + Tambah Data
        </CButton>
        <button className="btn-eksport table-font">Eksport</button>
        <button className="btn-impor table-font">Import</button>
        <table ref={tableRef} className="tabel">
          <thead>
            <tr>
              <th className="header-cell rata table-font">Nomor</th>
              <th className="header-cell rata table-font">NIM</th>
              <th className="header-cell rata table-font">Nama Lengkap</th>
              <th className="header-cell rata table-font">Kelas</th>
              <th className="header-cell rata table-font">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="cell rata table-font">{index + 1}</td>
                <td className="cell rata table-font">{item.kode}</td>
                <td className="cell rata table-font">{item.id}</td>
                <td className="cell rata table-font">{item.nip}</td>
                <td className="cell aksi">
                  <CButton href={`/#/detailDosen/${item.key}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
                    <CIcon icon={cilInfo} />
                  </CButton>
                  <CButton href={`/editDosen/${item.key}`} style={{ color: 'black', backgroundColor: 'transparent' }} >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <button style={{ backgroundColor: 'transparent' }} onClick={() => hapusData(index)}>
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
