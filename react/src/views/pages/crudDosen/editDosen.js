import React, { useState } from 'react';
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CContainer,
  CImage,
  CFormCheck,
} from '@coreui/react';
import img from '../../../assets/images/profile.jpg';
import pencil from '../../../assets/images/pencil-solid.svg';
import './editDosen.css';

const EditDosen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [showKelasProdi, setShowKelasProdi] = useState(false); // Menyimpan status tampilan Kelas dan Prodi
  const [formErrors, setFormErrors] = useState({}); // Menyimpan pesan error untuk setiap field
  const [formData, setFormData] = useState({
    kode: '',
    id: '',
    Nama: '',
    nip: '',
    email: '',
    status: '',
    kelas: '',
    prodi: '',
  });

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

    // Menyembunyikan/menampilkan Kelas dan Prodi berdasarkan status
    setShowKelasProdi(value === 'Dosen Wali');
  };

  const validateForm = () => {
    const errors = {};
    // Validasi untuk setiap field, pastikan tidak kosong
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${key} harus diisi.`;
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
    <div className="c-app c-default-layout">
      <div className="c-wrapper-edit">
        <main className="c-main">
            <CContainer>
              <CRow>
                <CForm
                  enctype="multipart/form-data"
                  action="#"
                  method="GET"
                  onSubmit={handleSubmit}
                >
                  <CCol className="my-col">
                    <CRow>
                      <CCol>
                        <CRow >
                          <CCol >
                            <CFormLabel htmlFor="kode" className="label">
                              Kode Dosen
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="kode"
                              value={formData.kode}
                              onChange={(e) =>
                                handleChange('kode', e.target.value)
                              }
                              disabled // Menyebabkan input menjadi tidak dapat diedit
                              className="disabled-input short-input" // Menambahkan kelas CSS untuk mengatur gaya input yang dinonaktifkan
                            />
                            {formErrors.kode && (
                              <div className="text-danger">
                                {formErrors.kode}
                              </div>
                            )}
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol >
                            <CFormLabel htmlFor="id" className="label">
                              ID Dosen
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="id"
                              value={formData.id}
                              onChange={(e) =>
                                handleChange('id', e.target.value)
                              }
                              disabled // Menyebabkan input menjadi tidak dapat diedit
                              className="disabled-input short-input" // Menambahkan kelas CSS untuk mengatur gaya input yang dinonaktifkan
                            />
                            {formErrors.id && (
                              <div className="text-danger">
                                {formErrors.id}
                              </div>
                            )}
                          </CCol>
                        </CRow>
                        <CFormLabel htmlFor="Nama" className="label">
                          Nama Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="Nama"
                          className="input short-input"
                          value={formData.Nama}
                          onChange={(e) =>
                            handleChange('Nama', e.target.value)
                          }
                        />
                        {formErrors.Nama && (
                          <div className="text-danger">
                            {formErrors.Nama}
                          </div>
                        )}
                        <CFormLabel htmlFor="nip" className="label">
                          NIP
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="nip"
                          value={formData.nip}
                          onChange={(e) =>
                            handleChange('nip', e.target.value)
                          }
                          disabled // Menyebabkan input menjadi tidak dapat diedit
                          className="disabled-input short-input" // Menambahkan kelas CSS untuk mengatur gaya input yang dinonaktifkan
                        />
                        {formErrors.nip && (
                          <div className="text-danger">
                            {formErrors.nip}
                          </div>
                        )}
                        <CFormLabel htmlFor="email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          className="input short-input"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange('email', e.target.value)
                          }
                        />
                        {formErrors.email && (
                          <div className="text-danger">
                            {formErrors.email}
                          </div>
                        )}
                      </CCol>
                      <CCol>
                        <CCard className="card-style">
                          <div className="card-content-style">
                            {selectedImage ? (
                              <CImage
                                src={selectedImage}
                                fluid
                                className="image-style"
                              />
                            ) : (
                              <CImage
                                src={img}
                                fluid
                                className="image-style"
                              />
                            )}
                            <CImage
                              src={pencil}
                              className="pencil-icon-style"
                            />
                          </div>
                          <input
                            type="file"
                            id="ProfilPic"
                            name="ProfilPic"
                            className="file-input-style"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </CCard>
                        <CFormLabel>Status</CFormLabel>
                        <CFormCheck
                          type="radio"
                          id="flexCheckDefault1"
                          label="Dosen Wali"
                          checked={formData.status === 'Dosen Wali'}
                          onChange={() => handleChange('status', 'Dosen Wali')}
                        />
                        <CFormCheck
                          type="radio"
                          id="flexCheckDefault2"
                          label="Bukan Dosen Wali"
                          checked={formData.status === 'Bukan Dosen Wali'}
                          onChange={() =>
                            handleChange('status', 'Bukan Dosen Wali')
                          }
                        />
                        {formErrors.status && (
                          <div className="text-danger">
                            {formErrors.status}
                          </div>
                        )}
                        {showKelasProdi && (
                          <>
                            <CFormLabel htmlFor="kelas">Kelas</CFormLabel>
                            <CFormInput
                              className="input short-input"
                              type="text"
                              id="kelas"
                              value={formData.kelas}
                              onChange={(e) =>
                                handleChange('kelas', e.target.value)
                              }
                            />
                            {formErrors.kelas && (
                              <div className="text-danger">
                                {formErrors.kelas}
                              </div>
                            )}
                            <CFormLabel htmlFor="prodi">Program Studi</CFormLabel>
                            <CFormInput
                              className="input short-input"
                              type="text"
                              id="prodi"
                              value={formData.prodi}
                              onChange={(e) =>
                                handleChange('prodi', e.target.value)
                              }
                            />
                            {formErrors.prodi && (
                              <div className="text-danger">
                                {formErrors.prodi}
                              </div>
                            )}
                          </>
                        )}
                      </CCol>
                    </CRow>
                  </CCol>
                </CForm>
              </CRow>
            </CContainer>
        </main>
      </div>
    </div>
  );
};

export default EditDosen;
