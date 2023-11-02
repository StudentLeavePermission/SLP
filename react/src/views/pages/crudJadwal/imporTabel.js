import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function TabelImport() {
  const [importedData, setImportedData] = useState([]);
  const [importedFile, setImportedFile] = useState(null);
  const [alertShown, setAlertShown] = useState(false);

  const handleFileChange = (e) => {
    setAlertShown(false);
    const file = e.target.files[0];
  
    if (file) {
      setImportedFile(file);
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true }); // Tambahkan opsi cellDates: true
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }); // Tambahkan opsi raw: false
  
        // Koreksi format waktu jika perlu
        const correctedData = excelData.map((row, index) => {
          if (index === 0) {
            return row; // Header, biarkan saja
          }
  
          // Mengkoreksi format waktu jika diperlukan, sesuaikan dengan kolom waktu pada Excel
          const jamIndex = excelData[0].indexOf('Jam_Pelajaran_Start');
          // Format waktu yang sesuai di sini, contoh "HH:mm:ss"
          const waktuMulai = row[jamIndex];
          row[jamIndex] = waktuMulai;
  
          return row;
        });
  
        setImportedData(correctedData);
      };
  
      reader.readAsArrayBuffer(file);
    }
  };
  
  
  function tambahIntervalWaktu(time, intervalMenit) {
    const [jam, menit, detik] = time.split(':').map(Number);
  
    const totalMenit = (jam * 60) + menit;
  
    const totalMenitBaru = totalMenit - intervalMenit;
  
    const jamBaru = Math.floor(totalMenitBaru / 60);
    const sisaMenit = totalMenitBaru % 60;
  
    // Format hasil baru sebagai tipe data time (HH:MM:SS)
    const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }

  function convertJam(time){
    const [jam, menit, detik] = time.split(':').map(Number);
  
    // Format hasil baru sebagai tipe data time (HH:MM:SS)
    const waktuBaru = `${jam.toString().padStart(2, '0')}:${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }

  function getIdJamPelajaranStart (data, jam){
    const jamAfterConvert = convertJam(jam);
    let i = 0;
    while (i < data.length){
      if (data[i].Waktu_Mulai == jamAfterConvert){
        return data[i].id;
      }
      i++;
    }
    return "NULL";
  }

  function getIdJamPelajaranEnd (data, jam){
    const jamAfterConvert = tambahIntervalWaktu(jam, 50);
    let i = 0;
    while (i < data.length){
      if (data[i].Waktu_Mulai == jamAfterConvert){
        return data[i].id;
      }
      i++;
    }
    return "NULL";
  }

  function getIdNamaDosen (data, dosen){
    let i = 0;
    while (i < data.length){
      if (data[i].Nama_Dosen == dosen){
        return data[i].id;
      }
      i++;
    }
    return "NULL";
  }

  function getIdNamaMatkul (data, matkul){
    let i = 0;
    while (i < data.length){
      if (data[i].Nama_Mata_Kuliah == matkul){
        return data[i].id;
      }
      i++;
    }
    return "NULL";
  }

  function getIdNamaKelas (data, kelas){
    let i = 0;
    while (i < data.length){
      if (data[i].Nama_Kelas == kelas){
        return data[i].id;
      }
      i++;
    }
    return "NULL";
  }

  useEffect(() => {
    console.log('Data yang akan dimasukkan:', importedData);
  }, [importedData]);


  const handleImportData = async () => {
    try {
      let allSuccess = true;

      for (let i = 1; i < importedData.length; i++) {
        const [Hari_Jadwal, Jam_Pelajaran_Start, Jam_Pelajaran_End, Matkul, Dosen, Kelas] = importedData[i];

        const dataKeseluruhan = await axios.get('http://localhost:3000/jadwal-kelas/getDataAll');
        const dataJamPelajaran = dataKeseluruhan.data.jam_pelajaran; 
        const dataDosen = dataKeseluruhan.data.dosen;        
        const dataMatkul = dataKeseluruhan.data.mata_kuliah;
        const dataKelas = dataKeseluruhan.data.kelas;

        const ID_Jam_Pelajaran_Start = getIdJamPelajaranStart(dataJamPelajaran, Jam_Pelajaran_Start); 
        const ID_Jam_Pelajaran_End = getIdJamPelajaranEnd(dataJamPelajaran, Jam_Pelajaran_End); 
        const ID_Dosen = getIdNamaDosen(dataDosen, Dosen);
        const ID_Matkul = getIdNamaMatkul(dataMatkul, Matkul);
        const ID_Kelas = getIdNamaKelas(dataKelas, Kelas);

        console.log('ID_Jam_Pelajaran_Start:', ID_Jam_Pelajaran_Start);
        console.log('ID_Jam_Pelajaran_End:', ID_Jam_Pelajaran_End);
        console.log('ID_Dosen:', ID_Dosen);
        console.log('ID_Matkul:', ID_Matkul);
        console.log('ID_Kelas:', ID_Kelas);

        try {
          axios.post('http://localhost:3000/jadwal-kelas/create', {
            Hari_Jadwal: Hari_Jadwal,
            ID_Jam_Pelajaran_Start: ID_Jam_Pelajaran_Start,
            ID_Jam_Pelajaran_End: ID_Jam_Pelajaran_End,
            ID_Matkul: ID_Matkul,
            ID_Dosen: ID_Dosen,
            ID_Kelas: ID_Kelas,
          })
          console.log('Form valid. Data sudah ditambahkan');
        } catch (error) {
          console.error(error);
        }
      }

      if (allSuccess) {
        alert('Data berhasil ditambahkan!');
        setAlertShown(true);
      } else {
        alert('Gagal menambahkan beberapa data. Periksa konsol untuk detail kesalahan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleImportData}>Impor Data</button>
    </div>
  );
}

export default TabelImport;