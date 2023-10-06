import React, { useState } from 'react';
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

const TambahDataDosen = () => {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    kode: '',
    id: '',
    email: '',
    status: '',
    kelas: '',
    prodi: '',
  });

  const [selectedImage, setSelectedImage] = useState(null); // Menyimpan gambar yang dipilih
  const [showKelasProdi, setShowKelasProdi] = useState(false); // Menyimpan status tampilan Kelas dan Prodi
  const [formErrors, setFormErrors] = useState({}); // Menyimpan pesan error untuk setiap field

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Hapus pesan error saat pengguna mulai mengisi field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (event) => {
    // Mengambil berkas gambar yang dipilih oleh pengguna
    const file = event.target.files[0];

    // Memeriksa apakah ada berkas yang dipilih
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleStatusChange = (status) => {
    handleChange('status', status);

    // Menyembunyikan/menampilkan Kelas dan Prodi berdasarkan status
    setShowKelasProdi(status === 'Dosen Wali');
  };

  const validateForm = () => {
    const errors = {};
    // Validasi untuk setiap field, pastikan tidak kosong
    if (!formData.nama) {
      errors.nama = 'Nama harus diisi.';
    }
    if (!formData.nip) {
      errors.nip = 'NIP harus diisi.';
    }
    if (!formData.kode) {
      errors.kode = 'Kode Dosen harus diisi.';
    }
    if (!formData.id) {
      errors.id = 'ID Dosen harus diisi.';
    }
    if (!formData.email) {
      errors.email = 'Email Dosen harus diisi.';
    }
    if (!formData.status) {
      errors.status = 'Status harus dipilih.';
    }
    if (showKelasProdi) {
      if (!formData.kelas) {
        errors.kelas = 'Kelas harus diisi.';
      }
      if (!formData.prodi) {
        errors.prodi = 'Program Studi harus diisi.';
      }
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Tidak ada error, data dapat dikirim
      console.log('Form valid. Data akan dikirim:', formData);
    } else {
      // Terdapat error, tampilkan pesan error
      setFormErrors(errors);
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <CRow>
        <CCol className='box-1'>
          <div>
            <CFormLabel htmlFor="kode">Kode Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="kode"
              value={formData.kode}
              onChange={(e) => handleChange('kode', e.target.value)}
            />
            {formErrors.kode && <div className="text-danger">{formErrors.kode}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="id">ID Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="id"
              value={formData.id}
              onChange={(e) => handleChange('id', e.target.value)}
            />
            {formErrors.id && <div className="text-danger">{formErrors.id}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="nama">Nama Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="nama"
              value={formData.nama}
              onChange={(e) => handleChange('nama', e.target.value)}
            />
            {formErrors.nama && <div className="text-danger">{formErrors.nama}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="nip">NIP</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="nip"
              value={formData.nip}
              onChange={(e) => handleChange('nip', e.target.value)}
            />
            {formErrors.nip && <div className="text-danger">{formErrors.nip}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="email">Email Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
          </div>
        </CCol>
        <CCol className='box-2'>
          <div>
            <CFormLabel htmlFor="foto">Foto</CFormLabel>
            <CCard style={{ width: '30%', height: 'auto' }}>
              <div>
                {selectedImage ? (
                  <CImage src={selectedImage} fluid className="image-style" />
                ) : (
                  <CImage src={img} fluid className="image-style" />
                )}
              </div>
              <input
                type="file"
                id="ProfilPic"
                name="ProfilPic"
                className="input"
                onChange={handleImageChange}
                accept="image/*"
              />
            </CCard>
          </div>
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
            {formErrors.status && <div className="text-danger">{formErrors.status}</div>}
          </div>
          {showKelasProdi && (
            <>
              <div>
                <CFormLabel htmlFor="kelas">Kelas</CFormLabel>
                <CFormInput
                  className="input"
                  type="text"
                  id="kelas"
                  value={formData.kelas}
                  onChange={(e) => handleChange('kelas', e.target.value)}
                />
                {formErrors.kelas && <div className="text-danger">{formErrors.kelas}</div>}
              </div>
              <div>
                <CFormLabel htmlFor="prodi">Program Studi</CFormLabel>
                <CFormInput
                  className="input"
                  type="text"
                  id="prodi"
                  value={formData.prodi}
                  onChange={(e) => handleChange('prodi', e.target.value)}
                />
                {formErrors.prodi && <div className="text-danger">{formErrors.prodi}</div>}
              </div>
            </>
          )}
        </CCol>
      </CRow>
      <div>
        <button className="btn btn-primary float-end" type="submit">
          Kirim
        </button>
      </div>
    </CForm>
  );
};

export default TambahDataDosen;
