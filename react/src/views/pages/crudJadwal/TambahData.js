import React, { useState } from 'react';
import Select from 'react-select';
import './TabelCRUD.css';

const TambahData = () => {
  const [formData, setFormData] = useState({
    kelas: '',
    mataKuliah: '',
    hari: '',
    namaDosen: '',
    jamKe: '', // Mengubah jamKe menjadi teks
    ruangan: '',
    waktu: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    // Validasi form di sini
    const isFormValid = validateForm();

    if (isFormValid) {
      // Data sudah terisi dan form valid, lakukan aksi submit di sini jika diperlukan
      // Misalnya, kirim data ke server atau lakukan tindakan lainnya.
      console.log('Form valid. Data akan dikirim:', formData);
    }
  };

  const validateForm = () => {
    // Lakukan validasi form di sini
    // Misalnya, periksa apakah setidaknya satu input terisi
    for (const key in formData) {
      if (!formData[key]) {
        return false; // Jika salah satu input kosong, kembalikan false
      }
    }
    return true; // Jika semua input terisi, kembalikan true
  };

  // Data dummy untuk kelas, mata kuliah, hari, dosen, ruangan, dan waktu
  const dummyData = {
    kelas: [
      { value: 'D3 - 1A', label: 'D3 - 1A' },
      { value: 'D3 - 1B', label: 'D3 - 1B' },
      { value: 'D3 - 1C', label: 'D3 - 1C' },
    ],
    mataKuliah: [
      { value: 'Aljabar Linear (T)', label: 'Aljabar Linear (T)' },
      { value: 'Komputer Grafik (T)', label: 'Komputer Grafik (T)' },
      { value: 'Matematika Diskrit 2 (T)', label: 'Matematika Diskrit 2 (T)' },
    ],
    hari: [
      { value: 'Senin', label: 'Senin' },
      { value: 'Selasa', label: 'Selasa' },
      { value: 'Rabu', label: 'Rabu' },
    ],
    namaDosen: [
      { value: 'Dosen 1', label: 'Dosen 1' },
      { value: 'Dosen 2', label: 'Dosen 2' },
      { value: 'Dosen 3', label: 'Dosen 3' },
    ],
    ruangan: [
      { value: 'Ruangan 101', label: 'Ruangan 101' },
      { value: 'Ruangan 102', label: 'Ruangan 102' },
      { value: 'Ruangan 103', label: 'Ruangan 103' },
    ],
    waktu: [
      { value: '08:00 - 09:00', label: '08:00 - 09:00' },
      { value: '09:00 - 10:00', label: '09:00 - 10:00' },
      { value: '10:00 - 11:00', label: '10:00 - 11:00' },
    ],
  };

  return (
    <div className="center-form">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4 margin-right">
          <label className="table-font">Kelas</label>
          <Select
            name="kelas"
            value={dummyData.kelas.find((option) => option.value === formData.kelas)}
            onChange={(selectedOption) => {
              handleChange('kelas', selectedOption.value);
            }}
            options={dummyData.kelas}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.kelas && (
            <div className="invalid-feedback">Mohon pilih kelas!</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="table-font">Mata Kuliah</label>
          <Select
            name="mataKuliah"
            value={dummyData.mataKuliah.find((option) => option.value === formData.mataKuliah)}
            onChange={(selectedOption) => {
              handleChange('mataKuliah', selectedOption.value);
            }}
            options={dummyData.mataKuliah}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.mataKuliah && (
            <div className="invalid-feedback">Mohon pilih mata kuliah!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Hari</label>
          <Select
            name="hari"
            value={dummyData.hari.find((option) => option.value === formData.hari)}
            onChange={(selectedOption) => {
              handleChange('hari', selectedOption.value);
            }}
            options={dummyData.hari}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.hari && (
            <div className="invalid-feedback">Mohon pilih hari!</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="table-font">Nama Dosen</label>
          <Select
            name="namaDosen"
            value={dummyData.namaDosen.find((option) => option.value === formData.namaDosen)}
            onChange={(selectedOption) => {
              handleChange('namaDosen', selectedOption.value);
            }}
            options={dummyData.namaDosen}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.namaDosen && (
            <div className="invalid-feedback">Mohon pilih nama dosen!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Jam Ke</label>
          <input
            type="text"
            name="jamKe"
            value={formData.jamKe}
            onChange={(e) => handleChange('jamKe', e.target.value)}
            className={`form-control ${isFormSubmitted && !formData.jamKe ? 'is-invalid' : ''}`}
            required
          />
          {isFormSubmitted && !formData.jamKe && (
            <div className="invalid-feedback">Mohon isi jam ke!</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="table-font">Ruangan</label>
          <Select
            name="ruangan"
            value={dummyData.ruangan.find((option) => option.value === formData.ruangan)}
            onChange={(selectedOption) => {
              handleChange('ruangan', selectedOption.value);
            }}
            options={dummyData.ruangan}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.ruangan && (
            <div className="invalid-feedback">Mohon pilih ruangan!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Waktu</label>
          <Select
            name="waktu"
            value={dummyData.waktu.find((option) => option.value === formData.waktu)}
            onChange={(selectedOption) => {
              handleChange('waktu', selectedOption.value);
            }}
            options={dummyData.waktu}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.waktu && (
            <div className="invalid-feedback">Mohon pilih waktu!</div>
          )}
        </div>

        <div className="col-xs-12 mt-3">
          <button className="btn btn-primary float-end" type="submit">
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahData;
