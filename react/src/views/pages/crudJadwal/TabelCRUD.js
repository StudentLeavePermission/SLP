import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import './TabelCRUD.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';

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
      hari: 'Senin',
      jam: '08:00',
      namaDosen: 'Dr. John Doe',
      mataKuliah: 'Matematika Dasar',
    },
    {
      hari: 'Selasa',
      jam: '10:00',
      namaDosen: 'Prof. Jane Smith',
      mataKuliah: 'Fisika Lanjut',
    },
    {
      hari: 'Rabu',
      jam: '14:00',
      namaDosen: 'Dr. Alice Johnson',
      mataKuliah: 'Kimia Organik',
    },
    {
      hari: 'Kamis',
      jam: '09:00',
      namaDosen: 'Prof. Robert Brown',
      mataKuliah: 'Sejarah Dunia',
    },
    {
      hari: 'Jumat',
      jam: '11:30',
      namaDosen: 'Dr. Emily White',
      mataKuliah: 'Biologi Molekuler',
    },
    {
      hari: 'Senin',
      jam: '13:00',
      namaDosen: 'Prof. David Clark',
      mataKuliah: 'Ekonomi Makro',
    },
    {
      hari: 'Selasa',
      jam: '16:00',
      namaDosen: 'Dr. Sarah Lee',
      mataKuliah: 'Bahasa Inggris',
    },
    {
      hari: 'Rabu',
      jam: '08:30',
      namaDosen: 'Prof. Michael Harris',
      mataKuliah: 'Fisika Dasar',
    },
    {
      hari: 'Kamis',
      jam: '10:45',
      namaDosen: 'Dr. Susan Taylor',
      mataKuliah: 'Pemrograman Web',
    },
    {
      hari: 'Jumat',
      jam: '12:15',
      namaDosen: 'Prof. Laura Brown',
      mataKuliah: 'Hukum Bisnis',
    },
    {
      hari: 'Senin',
      jam: '09:30',
      namaDosen: 'Dr. James Wilson',
      mataKuliah: 'Sosiologi',
    },
    {
      hari: 'Selasa',
      jam: '15:00',
      namaDosen: 'Prof. Maria Garcia',
      mataKuliah: 'Seni Rupa',
    },
    {
      hari: 'Rabu',
      jam: '11:00',
      namaDosen: 'Dr. Daniel Miller',
      mataKuliah: 'Manajemen Proyek',
    },
    {
      hari: 'Kamis',
      jam: '14:30',
      namaDosen: 'Prof. Karen Brown',
      mataKuliah: 'Psikologi',
    },
    {
      hari: 'Jumat',
      jam: '10:00',
      namaDosen: 'Dr. Richard Davis',
      mataKuliah: 'Pemrograman Java',
    },
    {
      hari: 'Senin',
      jam: '08:45',
      namaDosen: 'Prof. Linda Thomas',
      mataKuliah: 'Kalkulus',
    },
    {
      hari: 'Selasa',
      jam: '12:00',
      namaDosen: 'Dr. Mark Anderson',
      mataKuliah: 'Biologi Sel',
    },
    {
      hari: 'Rabu',
      jam: '15:15',
      namaDosen: 'Prof. Sandra Martinez',
      mataKuliah: 'Keuangan Perusahaan',
    },
    {
      hari: 'Kamis',
      jam: '13:30',
      namaDosen: 'Dr. Paul White',
      mataKuliah: 'Geografi',
    },
    {
      hari: 'Jumat',
      jam: '14:45',
      namaDosen: 'Prof. Elizabeth Adams',
      mataKuliah: 'Antropologi',
    },
    // Tambahkan data dummy lainnya di sini
  ]);

  const [form, setForm] = useState({}); // Form data
  const [detailItem, setDetailItem] = useState(null); // To display details
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

  // Function to display details
  const tampilkanDetail = (item) => {
    setDetailItem(item);
  };

  // Function to enable edit mode
  const aktifkanEdit = (index) => {
    setEditIndex(index);
    setForm(data[index]);
  };

  // Function to save changes when editing data
  const simpanPerubahan = () => {
    const newData = [...data];
    newData[editIndex] = form;
    setData(newData);
    setEditIndex(-1);
    setForm({});
  };

  // JSX for the header section
  const headerSection = (
    <div className="font-header table-font">
      <div>
        <h2>Data Jadwal Mata Kuliah</h2>
      </div>
    </div>
  );

  // JSX for the container and table-box
  const mainSection = (
    <div className="container">
      <div className="table-box">
        <button onClick={tambahData} className="btn-tambah table-font">
            + Tambah Data
        </button>
        <button className="btn-eksport table-font">Eksport</button>
        <button className="btn-impor table-font">Import</button>
        <table ref={tableRef} className="tabel">
          <thead>
            <tr>
              <th className="header-cell rata table-font">Nomor</th>
              <th className="header-cell rata table-font">Hari</th>
              <th className="header-cell rata table-font">Jam Ke</th>
              <th className="header-cell rata table-font">Nama Dosen</th>
              <th className="header-cell rata table-font">Mata Kuliah</th>
              <th className="header-cell rata table-font">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="cell rata table-font">{index + 1}</td>
                <td className="cell rata table-font">{item.hari}</td>
                <td className="cell rata table-font">{item.jam}</td>
                <td className="cell rata table-font">{item.namaDosen}</td>
                <td className="cell rata table-font">{item.mataKuliah}</td>
                <td className="cell aksi">
                  <button className="margin-button" style={{ backgroundColor: 'transparent' }} onClick={() => tampilkanDetail(item)}>
                    <CIcon icon={cilInfo} />
                  </button>
                  <span className="vert-line"></span>
                  {editIndex === index ? (
                    <>
                      <button className="btn-simpan rata table-font" onClick={() => simpanPerubahan()}>
                        Simpan
                      </button>
                      <button className="btn-batal rata table-font" onClick={() => setEditIndex(-1)}>
                        Batal
                      </button>
                    </>
                  ) : (
                    <button style={{ backgroundColor: 'transparent' }} onClick={() => aktifkanEdit(index)}>
                      <CIcon icon={cilPencil} />
                    </button>
                  )}
                  <button style={{ backgroundColor: 'transparent' }} onClick={() => hapusData(index)}>
                    <CIcon icon={cilTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {detailItem && (
          <div className="detail">
            <h2>Detail Item</h2>
            <p>
              <strong>Hari:</strong> {detailItem.hari}
            </p>
            <p>
              <strong>Jam Ke:</strong> {detailItem.jam}
            </p>
            <p>
              <strong>Nama Dosen:</strong> {detailItem.namaDosen}
            </p>
            <p>
              <strong>Mata Kuliah:</strong> {detailItem.mataKuliah}
            </p>
            <button onClick={() => setDetailItem(null)}>Tutup</button>
          </div>
        )}
      </div>
    </div>
  );

  // Complete JSX for the component
  return (
    <>
      {headerSection}
      {mainSection}
    </>
  );
}

export default TabelCRUD;
