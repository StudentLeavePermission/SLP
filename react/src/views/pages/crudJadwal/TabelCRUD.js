import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; 
import 'datatables.net'; 
import './TabelCRUD.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';
import { CButton } from '@coreui/react';
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
      console.log(dataDosen);
      const formattedData = response.data.data.map((item, index) => {
        const JamPelajaran = getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_Start)+" - "+ tambahIntervalWaktu(getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_End), 50); 
        const namaDosen = getNamaDosen(dataDosen, item.ID_Dosen);
        const namaMatkul = getNamaMatkul(dataMatkul, item.ID_Matkul);
        return {
          ...item,
          DT_RowId: `${index + 1}`,
          Jam: JamPelajaran,
          Nama_Dosen: namaDosen,
          Mata_Kuliah: namaMatkul
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
      paging: true,
      searching: true,
      lengthChange: false,
      pageLength: 5,
      data: dataJadwal,
      columns: [
        { data: "DT_RowId" },
        { data: "Hari_Jadwal" },
        { data: "Jam" },
        { data: "Nama_Dosen" },
        { data: "Mata_Kuliah" },
        { data: "ID_Kelas" },
        { 
          data: null,
          "render": function () {
            return '<div class="aksi">' +
            '<span class="action-button"><i class="cil cil-info"></i></span> ' +
            '<span class="action-button"><i class="cil cil-pencil"></i></span> ' +
            '<span class="action-button"><i class="cil cil-trash"></i></span>' +
            '</div>'
          }
        }
      ],
      createdRow: (row, data, dataIndex) => {
        // Tambahkan class atau atribut lainnya ke elemen tr (baris) sesuai kebutuhan
        $(row).find(".custom-button").on("click", () => {
          const id = $(row).find(".custom-button").data("id");
          hapusData(id);
        });
      },
      // Menggunakan columnDefs untuk menerapkan kelas CSS pada kolom tertentu
      columnDefs: [
        { targets: [0, 1, 2, 3, 4, 5], className: "rata table-font" }, // Kolom 0 hingga 5
        { targets: [5], className: "aksi" }, // Kolom aksi
      ],
    });    

    return () => {
      // Hapus DataTables saat komponen unmount
      dataTable.destroy();
    };
  }, [dataJadwal]);

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
        <CButton href={'/#/tambahJadwal'} className="btn-tambah table-font">
            + Tambah Data
        </CButton>
        <button className="btn-eksport table-font">Eksport</button>
        <button className="btn-impor table-font">Import</button>
        <table ref={tableRef} className="tabel">
          <thead>
            <tr>
              <th className="header-cell rata table-font">Nomor</th>
              <th className="header-cell rata table-font">Hari</th>
              <th className="header-cell rata table-font">Jam</th>
              <th className="header-cell rata table-font">Nama Dosen</th>
              <th className="header-cell rata table-font">Mata Kuliah</th>
              <th className="header-cell rata table-font">Kelas</th>
              <th className="header-cell rata table-font">Aksi</th>
            </tr>
          </thead>
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
