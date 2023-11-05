import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CCol,
  CRow,
} from '@coreui/react';

function TambahDataKelas() {
  const [formData, setFormData] = useState({
    Nama_Kelas: '',
    Tahun_Ajaran: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  useEffect(() => {
    if (done) {
      navigate(-1); // Navigate back to the previous page
    }
  }, [done, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Kelas) {
      errors.Nama_Kelas = 'Nama harus diisi.';
    }
    if (!formData.Tahun_Ajaran) {
      errors.Tahun_Ajaran = 'Tahun Masuk harus diisi.';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        // Attempt to create data
        await axios.post('http://localhost:3000/data-kelas/create', {
          Nama_Kelas: formData.Nama_Kelas,
          Tahun_Ajaran: formData.Tahun_Ajaran,
        });

        // Handle successful submission
        setDone(true);
        setFormData({ Nama_Kelas: '', Tahun_Ajaran: '' }); // Clear the form
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Tambah Data Kelas</h2>
        </div>
      </div>
      <CRow>
        <CCol className="box-1">
          <div>
            <CFormLabel htmlFor="Kode_Dosen">Nama Kelas</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Nama_Kelas"
              value={formData.Nama_Kelas}
              onChange={(e) => handleChange('Nama_Kelas', e.target.value)}
            />
            {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Tahun_Ajaran">Tahun Masuk</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Tahun_Ajaran"
              value={formData.Tahun_Ajaran}
              onChange={(e) => handleChange('Tahun_Ajaran', e.target.value)}
            />
            {formErrors.Tahun_Ajaran && <div className="text-danger">{formErrors.Tahun_Ajaran}</div>}
          </div>
        </CCol>
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
}

export default TambahDataKelas;
