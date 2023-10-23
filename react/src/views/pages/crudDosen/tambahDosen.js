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

const TambahDataDosen = () => {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
    Nama_Kelas: '',
    Password: '',
    status: '',
  });
  
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showKelasProdi, setShowKelasProdi] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [dataKelas, setDataKelas] = useState([]);

  useEffect(() => {
    // Fetch data
    getAllDataKelas();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });

    if (name === 'kelas' && value !== 'lainnya') {
      updatedFormData = {
        ...updatedFormData,
        KelasLainnya: '', // Reset nilai KelasLainnya jika bukan "Lainnya" yang dipilih
      };
    }
  };

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status: status,
    });

    if (status === 'Dosen Wali') {
      setShowKelasProdi(true);
    } else {
      setShowKelasProdi(false);
    }

    setFormErrors({
      ...formErrors,
      Nama_Kelas: '',
      Password: '',
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

    if (formData.status === 'Dosen Wali') {
      if (!formData.Nama_Kelas) {
        errors.Nama_Kelas = 'Nama Kelas harus diisi.';
      }
      if (!formData.Password) {
        errors.Password = 'Password harus diisi.';
      }
    }

    setFormErrors(errors);
    return errors;
  };

  const getAllDataKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas');
      setDataKelas(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaKelas () {
    const namaKelas = [];
    for (let i = 0; i < dataKelas.length; i++) {
      namaKelas.push({value: dataKelas[i].id, label: dataKelas[i].Nama_Kelas});
    }
    return namaKelas;
  }

  useEffect(() => {
    console.log(dataKelas);
  }, [dataKelas]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
  
    if (Object.keys(errors).length === 0) {
      try {
        // Membuat data dosen
        const dosenResponse = await axios.post('http://localhost:3000/data-dosen/create', {
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          Kode_Dosen: formData.Kode_Dosen,
          InitialID: formData.InitialID,
          Email_Dosen: formData.Email_Dosen,
        });
  
        if (dosenResponse.status === 201) {
          if (formData.status === 'Dosen Wali') {
            try {
              // Ambil seluruh data dosen
              const allDosenResponse = await axios.get('http://localhost:3000/data-dosen');
              const allDosenData = allDosenResponse.data.data;
  
              console.log('Data Dosen:', allDosenData);
              let ID_Dosen_Wali = null; // Inisialisasi ID_Dosen_Wali dengan null
              let ID_Dosen = null;
  
              allDosenData.forEach((item) => {
                if (item.NIP === formData.NIP) {
                  console.log('ID_Dosen_Wali:', item.id);
                  ID_Dosen_Wali = item.id; // Jika NIP sesuai, isi ID_Dosen_Wali dengan item.id
                  ID_Dosen = item.id;
                }
              });
  
              if (ID_Dosen_Wali !== null) {
                // Sekarang ID_Dosen_Wali telah diisi dengan nilai yang sesuai
                const kelasResponse = await axios.post('http://localhost:3000/data-kelas/create', {
                  Nama_Kelas: formData.Nama_Kelas,
                  ID_Dosen_Wali: ID_Dosen_Wali, // Gunakan nilai ID_Dosen_Wali yang telah ditemukan
                });
              } 
  
              if (ID_Dosen !== null) {
                const dosenResponse = await axios.post('http://localhost:3000/data-dosen-wali/create', {
                  Password: formData.Password,
                  ID_Dosen: ID_Dosen, // Gunakan nilai ID_Dosen_Wali yang telah ditemukan
                });
  
                if (dosenResponse.status === 201) {
                  console.log('Data Dosen berhasil ditambahkan:', dosenResponse.data);
                  alert('Data Dosen berhasil ditambahkan!');
                  navigate('/dataDosen');
                } else {
                  console.error('Gagal menambahkan data Dosen:', dosenResponse.data.error);
                  alert('Gagal menambahkan data Dosen. Error: ' + dosenResponse.data.error);
                }
              } else {
                console.error('Tidak dapat menemukan Dosen berdasarkan NIP:', formData.NIP);
                alert('Tidak dapat menemukan Dosen berdasarkan NIP: ' + formData.NIP);
              }
            } catch (allDosenError) {
              console.error('Gagal mengambil data dosen:', allDosenError);
              alert('Gagal mengambil data dosen. Error: ' + allDosenError.message);
            }
          } else {
            // Handle ketika bukan Dosen Wali
            console.log('Bukan Dosen Wali');
            alert('Data Kelas berhasil ditambahkan!');
  
            // Redirect to the dataDosen route
            navigate('/dataDosen');
          }
        } else {
          console.error('Gagal menambahkan data Dosen:', dosenResponse.data.error);
          alert('Gagal menambahkan data Dosen. Error: ' + dosenResponse.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };        

  const pilihanData = {
    kelas: [
      ...getNamaKelas(),
      { value: 'lainnya', label: 'Lainnya' }, // Opsi "Lainnya"
    ],
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Tambah Data Dosen</h2>
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
        <CCol className='box-2'>
        <div>
          <CFormLabel>Status</CFormLabel>
          <CFormCheck
            type="radio"
            id="flexCheckDefault1"
            label="Dosen Wali"
            checked={formData.status === 'Dosen Wali'}
            onChange={() => handleStatusChange('Dosen Wali')}
          />
          <CFormCheck
            type="radio"
            id="flexCheckDefault2"
            label="Bukan Dosen Wali"
            checked={formData.status === 'Bukan Dosen Wali'}
            onChange={() => handleStatusChange('Bukan Dosen Wali')}
          />
        </div>
        {showKelasProdi && (
          <>
            <div className="col-md-4 margin-right">
              <label className="table-font">Kelas</label>
              <Select
                name="kelas"
                value={pilihanData.kelas.find((option) => option.value === formData.kelas)}
                onChange={(selectedOption) => {
                  handleChange('kelas', selectedOption.value);
                }}
                options={pilihanData.kelas}
                isSearchable
                required
              />
              {isFormSubmitted && !formData.kelas && (
                <div className="invalid-feedback">Mohon pilih kelas!</div>
              )}
            </div>
            {formData.kelas === 'lainnya' && (
              <div>
                <CFormLabel htmlFor="KelasLainnya">Kelas Lainnya</CFormLabel>
                <CFormInput
                  className="input"
                  type="text"
                  id="KelasLainnya"
                  value={formData.KelasLainnya}
                  onChange={(e) => handleChange('KelasLainnya', e.target.value)}
                />
                {formErrors.KelasLainnya && (
                  <div className="text-danger">{formErrors.KelasLainnya}</div>
                )}
              </div>
            )}
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
          </>
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

export default TambahDataDosen;
