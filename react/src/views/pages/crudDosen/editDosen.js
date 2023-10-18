import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
} from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDataDosen = () => {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
    Nama_Kelas: '',
    Password: '',
    ID_Dosen_Wali: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const { key } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(key);
  }, [key]);

  const fetchData = async (key) => {
    try {
      // Fetch data for Data_Dosen menggunakan ID yang sesuai di tabel
      const dataDosenResponse = await axios.get(`http://localhost:3000/data-dosen/get/${key}`);
      const dataDosen = dataDosenResponse.data.data;
  
      if (dataDosenResponse.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          Nama_Dosen: dataDosen.Nama_Dosen,
          NIP: dataDosen.NIP,
          Kode_Dosen: dataDosen.Kode_Dosen,
          InitialID: dataDosen.InitialID,
          Email_Dosen: dataDosen.Email_Dosen,
        }));
      } else {
        console.error('Gagal mengambil data dosen');
      }
  
      // Fetch data for Data_Kelas menggunakan ID yang sesuai di tabel
      console.log('nyobain apa ajasii2', key);

      const allKelasResponse = await axios.get('http://localhost:3000/data-kelas');
      const allKelasData = allKelasResponse.data.data;

      console.log('Data Kelas:', allKelasData);
      let IDKelas = null;
      console.log('nyobain apa ajasii222', key);

      for (let i = 0; i < allKelasData.length; i++) {
        const item = allKelasData[i];
        // console.log('Data Kelas:', item.ID_Dosen_Wali);
      
        if (item.ID_Dosen_Wali.toString() === key.toString()) {
          console.log('ID_Kelas:', item.id);
          IDKelas = item.id;
          break; 
        }
      }

      if (IDKelas === null) {
        console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
      }

      const kelasResponse = await axios.get(`http://localhost:3000/data-kelas/get/${IDKelas}`);
      const kelasData = kelasResponse.data.data;
  
      if (kelasResponse.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          Nama_Kelas: kelasData.Nama_Kelas,
        }));
      } else {
        console.error('Gagal mengambil data kelas');
      }

      const allDosenResponse = await axios.get('http://localhost:3000/data-dosen-wali');
      const allDosenData = allDosenResponse.data.data;

      console.log('Data Kelas:', allDosenData);
      let IDDosen = null;
      console.log('nyobain apa ajasii111', key);

      for (let i = 0; i < allDosenData.length; i++) {
        const indeks = allDosenData[i];
        // console.log('Data Dosen Wali:', indeks.ID_Dosen);
      
        if (indeks.ID_Dosen.toString() === key.toString()) {
          console.log('ID_Dosen_Wali:', indeks.id);
          IDDosen = indeks.id;
          break; 
        }
      }

      if (IDDosen === null) {
        console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
      }
  
      // Fetch data for Data_Dosen_Wali menggunakan ID yang sesuai di tabel
      const dosenWaliResponse = await axios.get(`http://localhost:3000/data-dosen-wali/get/${IDDosen}`);
      const dosenWaliData = dosenWaliResponse.data.data;
  
      if (dosenWaliResponse.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          Password: dosenWaliData.Password,
        }));
      } else {
        console.error('Gagal mengambil data dosen wali');
      }
  
      console.log('Data_Dosen URL:', `http://localhost:3000/data-dosen/get/${key}`);
      console.log('Data_Kelas URL:', `http://localhost:3000/data-kelas/get/${IDKelas}`);
      console.log('Data_Dosen_Wali URL:', `http://localhost:3000/data-dosen-wali/get/${IDDosen}`);
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
    if (!formData.Nama_Kelas) {
      errors.Nama_Kelas = 'Nama Kelas harus diisi.';
    }
    if (!formData.Password) {
      errors.Password = 'Password harus diisi.';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        // Panggil endpoint untuk mengubah data di tabel Data_Dosen
        await axios.patch(`http://localhost:3000/data-dosen/patch/${key}`, {
          Kode_Dosen: formData.Kode_Dosen,
          InitialID: formData.InitialID,
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          Email_Dosen: formData.Email_Dosen,
        });
        console.log('kuncinya:', key);

        const allKelasResponse = await axios.get('http://localhost:3000/data-kelas');
        const allKelasData = allKelasResponse.data.data;

        console.log('Data Kelas:', allKelasData);
        let IDKelas = null;
        console.log('nyobain apa ajasii222', key);

        for (let i = 0; i < allKelasData.length; i++) {
          const item = allKelasData[i];
          // console.log('Data Kelas:', item.ID_Dosen_Wali);
        
          if (item.ID_Dosen_Wali.toString() === key.toString()) {
            console.log('ID_Kelas:', item.id);
            IDKelas = item.id;
            break; 
          }
        }

        if (IDKelas === null) {
          console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
        }

        // Panggil endpoint untuk mengubah data di tabel Data_Kelas
        await axios.patch(`http://localhost:3000/data-kelas/patch/${IDKelas}`, {
          Nama_Kelas: formData.Nama_Kelas,
        });
        console.log('kuncinya2:', formData.Nama_Kelas);

        const allDosenResponse = await axios.get('http://localhost:3000/data-dosen-wali');
        const allDosenData = allDosenResponse.data.data;

        console.log('Data Dosen Wali:', allDosenData);
        let IDDosen = null;
        console.log('nyobain apa ajasii111', key);

        for (let i = 0; i < allDosenData.length; i++) {
          const indeks = allDosenData[i];
          // console.log('Data Dosen Wali:', indeks.ID_Dosen);
        
          if (indeks.ID_Dosen.toString() === key.toString()) {
            console.log('ID_Dosen_Wali:', indeks.id);
            IDDosen = indeks.id;
            break; 
          }
        }

        if (IDDosen === null) {
          console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
        }

        // Panggil endpoint untuk mengubah data di tabel Data_Dosen_Wali
        await axios.patch(`http://localhost:3000/data-dosen-wali/patch/${IDDosen}`, {
          Password: formData.Password,
        });
        console.log('kuncinya1:', formData.Password);

        alert('Data berhasil diubah!');

        navigate('/datadosen');
      } catch (error) {
        console.error('Terjadi kesalahan saat mengubah data:', error);
        alert('Terjadi kesalahan saat mengubah data.');
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Edit Data Dosen</h2>
        </div>
      </div>
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
          {formData.ID_Dosen_Wali !== 'Bukan Dosen Wali' && (
            <div>
              <CFormLabel htmlFor="Nama_Kelas">Nama Kelas</CFormLabel>
              <CFormInput
                className="input"
                type="text"
                id="Nama_Kelas"
                value={formData.Nama_Kelas}
                onChange={(e) => handleChange('Nama_Kelas', e.target.value)}
              />
              {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
            </div>
          )}
          {formData.ID_Dosen_Wali !== 'Bukan Dosen Wali' && (
            <div>
              <CFormLabel htmlFor="Password">Password</CFormLabel>
              <CFormInput
                className="input"
                type="password"
                id="Password"
                value={formData.Password}
                onChange={(e) => handleChange('Password', e.target.value)}
              />
              {formErrors.Password && <div className="text-danger">{formErrors.Password}</div>}
            </div>
          )}
        </CCol>
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
};

export default EditDataDosen;
