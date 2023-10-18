import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CContainer,
  CButton,
  CImage,
} from '@coreui/react';
import './style.css';
import { useParams } from 'react-router-dom';

const EditJadwal = () => {
  const [formData, setFormData] = useState({
    ID_Jam_Pelajaran_Start: '',
    ID_Jam_Pelajaran_End: '',
    ID_Kelas: '',
    Hari_Jadwal: '',
    ID_Dosen: '',
    ID_Matkul: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const { key } = useParams();

  useEffect(() => {
    fetchData(key);
  }, [key]);

  const fetchData = async (key) => {
    try {
      const response = await axios.get(`http://localhost:3000/jadwal-kelas/get/${key}`);
      const data = response.data.data; // Ambil data dari response
  
      if (response.status === 200) {
        console.log('Data yang telah diambil dari server:', data);
        // Atur formData dengan data dari database
        setFormData({
          ID_Jam_Pelajaran_Start: data.ID_Jam_Pelajaran_Start,
          ID_Jam_Pelajaran_End: data.ID_Jam_Pelajaran_End,
          ID_Kelas: data.ID_Kelas,
          Hari_Jadwal: data.Hari_Jadwal,
          ID_Dosen: data.ID_Dosen,
          ID_Matkul: data.ID_Matkul,
        });
      } else {
        console.error('Gagal mengambil data dosen');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

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

  const validateForm = () => {
    const errors = {};
    if (!formData.ID_Jam_Pelajaran_Start) {
      errors.ID_Jam_Pelajaran_Start = 'Waktu Mulai harus diisi.';
    }
    if (!formData.ID_Jam_Pelajaran_End) {
      errors.ID_Jam_Pelajaran_End = 'Waktu Akhir harus diisi.';
    }
    if (!formData.ID_Kelas) {
      errors.ID_Kelas = 'Nama Kelas harus diisi.';
    }
    if (!formData.Hari_Jadwal) {
      errors.Hari_Jadwal = 'Hari harus diisi.';
    }
    if (!formData.ID_Dosen) {
      errors.ID_Dosen = 'Nama Dosen harus diisi.';
    }
    if (!formData.ID_Matkul) {
      errors.ID_Matkul = 'Nama Matkul harus diisi.';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.patch(`http://localhost:3000/jadwal-kelas/update/${key}`, formData);
        console.log('ini teks skdninsaign');
        if (response.status === 200) {
          console.log('Data berhasil diubah di database:', response.data);
          alert('Data berhasil diubah!');
        } else {
          console.error('Gagal mengubah data di database');
          alert('Gagal mengubah data di database');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengubah data.');
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <main className="c-main">
          <div className="container-fluid">
            <CContainer>
              <CRow>
                <CForm onSubmit={handleSubmit} encType="multipart/form-data" action="#" method="GET">
                  <CCol className="my-col">
                    <CRow>
                      <CCol xs="6" className="my-col-inner">
                        <CFormLabel htmlFor="ID_Kelas" className="label">
                          Kelas
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="ID_Kelas"
                          name="ID_Kelas"
                          value={formData.ID_Kelas}
                          onChange={(e) => handleChange('ID_Kelas', e.target.value)}
                        />
                        {formErrors.ID_Kelas && <div className="text-danger">{formErrors.ID_Kelas}</div>}
                        <CFormLabel htmlFor="Hari_Jadwal" className="label">
                          Hari
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="Hari_Jadwal"
                          name="Hari_Jadwal"
                          value={formData.Hari_Jadwal}
                          onChange={(e) => handleChange("Hari_Jadwal", e.target.value)}
                        />
                        {formErrors.Hari_Jadwal && <div className="text-danger">{formErrors.Hari_Jadwal}</div>}
                        <CFormLabel htmlFor="ID_Jam_Pelajaran_Start" className="label">
                          Jam Awal
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="ID_Jam_Pelajaran_Start"
                          name="ID_Jam_Pelajaran_Start"
                          value={formData.ID_Jam_Pelajaran_Start}
                          onChange={(e) => handleChange('ID_Jam_Pelajaran_Start', e.target.value)}
                        />
                        {formErrors.ID_Jam_Pelajaran_Start && <div className="text-danger">{formErrors.ID_Jam_Pelajaran_Start}</div>}
                        <CFormLabel
                          htmlFor="ID_Jam_Pelajaran_End"
                          className="label"
                        >
                          Jam Akhir
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="ID_Jam_Pelajaran_End"
                          name="ID_Jam_Pelajaran_End"
                          value={formData.ID_Jam_Pelajaran_End}
                          onChange={(e) => handleChange('ID_Jam_Pelajaran_End', e.target.value)}
                        />
                        {formErrors.ID_Jam_Pelajaran_End && <div className="text-danger">{formErrors.ID_Jam_Pelajaran_End}</div>}
                      </CCol>
                      <CCol xs="6" className="my-col-inner">
                        <CFormLabel htmlFor="ID_Matkul" className="label">
                          Mata Kuliah
                        </CFormLabel>
                        <CFormInput 
                          type="text" 
                          id="ID_Matkul" 
                          name="ID_Matkul"
                          value={formData.ID_Matkul}
                          onChange={(e) => handleChange('ID_Matkul', e.target.value)}
                        />
                        {formErrors.ID_Matkul && <div className="text-danger">{formErrors.ID_Matkul}</div>}
                        <CFormLabel htmlFor="ID_Dosen" className="label">
                          Nama Dosen
                        </CFormLabel>
                        <CFormInput 
                          type="text" 
                          id="ID_Dosen" 
                          name="ID_Dosen"
                          value={formData.ID_Dosen}
                          onChange={(e) => handleChange('ID_Dosen', e.target.value)}
                        />
                        {formErrors.ID_Dosen && <div className="text-danger">{formErrors.ID_Dosen}</div>}
                        <CButton
                          component="input"
                          type="submit"
                          value="Submit"
                          className="submitButtonStyle"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CForm>
              </CRow>
            </CContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditJadwal;
