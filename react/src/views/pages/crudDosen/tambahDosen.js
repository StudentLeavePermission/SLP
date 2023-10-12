import React, { useState } from 'react';
import axios from 'axios';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CFormCheck,
  CImage,
  CCol,
  CRow,
} from '@coreui/react';
import img from '../../../assets/images/profile.jpg';
import './tambahDosen.css';
import { useHistory } from 'react-router-dom'; // Import useHistory

const TambahDataDosen = () => {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [showKelasProdi, setShowKelasProdi] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message for the field when it's updated
    setFormErrors({
      ...formErrors,
      [name]: '', // Clear the error message for the field
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Dosen) {
      errors.Nama_Dosen = 'Nama harus diisi.';
    }
    if (!formData.NIP) {
      errors.NIP = 'NIP harus diisi.';
    }
    if (!formData.Kode_Dosen) {
      errors.Kode_Dosen = 'Kode Dosen harus diisi.';
    }
    if (!formData.InitialID) {
      errors.InitialID = 'ID Dosen harus diisi.';
    }
    if (!formData.Email_Dosen) {
      errors.Email_Dosen = 'Email Dosen harus diisi.';
    }
    // Add more validations for other fields as needed
    setFormErrors(errors); // Set the formErrors state
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    // Check if there are any errors in the form
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3000/data-dosen/create', {
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          Kode_Dosen: formData.Kode_Dosen,
          InitialID: formData.InitialID,
          Email_Dosen: formData.Email_Dosen,
        });

        if (response.status === 201) {
          console.log('Data berhasil ditambahkan ke database:', response.data);
          alert('Data berhasil ditambahkan!');
        } else {
          console.error('Gagal menambahkan data ke database');
          alert('Gagal menambahkan data ke database');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data.');
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <CRow>
        <CCol className='box-1'>
          <div>
            <CFormLabel htmlFor="Kode_Dosen">Kode Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Kode_Dosen"
              value={formData.Kode_Dosen}
              onChange={(e) => handleChange('Kode_Dosen', e.target.value)}
            />
            {formErrors.Kode_Dosen && <div className="text-danger">{formErrors.Kode_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="InitialID">ID Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="InitialID"
              value={formData.InitialID}
              onChange={(e) => handleChange('InitialID', e.target.value)}
            />
            {formErrors.InitialID && <div className="text-danger">{formErrors.InitialID}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Nama_Dosen">Nama Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Nama_Dosen"
              value={formData.Nama_Dosen}
              onChange={(e) => handleChange('Nama_Dosen', e.target.value)}
            />
            {formErrors.Nama_Dosen && <div className="text-danger">{formErrors.Nama_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="NIP">NIP</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="NIP"
              value={formData.NIP}
              onChange={(e) => handleChange('NIP', e.target.value)}
            />
            {formErrors.NIP && <div className="text-danger">{formErrors.NIP}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Email_Dosen">Email Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="email"
              id="Email_Dosen"
              value={formData.Email_Dosen}
              onChange={(e) => handleChange('Email_Dosen', e.target.value)}
            />
            {formErrors.Email_Dosen && <div className="text-danger">{formErrors.Email_Dosen}</div>}
          </div>
        </CCol>
        {/* Rest of your form fields */}
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
};

export default TambahDataDosen;
