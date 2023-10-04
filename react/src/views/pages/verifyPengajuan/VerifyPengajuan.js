import React, { useState } from 'react';
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
import img from '../../../assets/images/mntp.png';
import pencil from '../../../assets/images/pencil-solid.svg';
import './style.css';

const VerifyPengajuan = () => {
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

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <main className="c-main">
          <div className="container-fluid">
            <CContainer>
              <CRow>
                <CForm enctype="multipart/form-data" action="#" method="GET">
                  <CCol className="my-col">
                    <CRow>
                      <CCol xs="6" className="my-col-inner">
                        <CRow className="mb-3">
                          <CCol className="ml-0">
                            <CFormLabel htmlFor="kelas" className="label">
                              Kelas
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="kelas"
                              name="kelas"
                            />
                          </CCol>
                          <CCol>
                            <CFormLabel
                              htmlFor="programStudi"
                              className="label"
                            >
                              Program Studi
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="programStudi"
                              name="programStudi"
                            />
                          </CCol>
                        </CRow>
                        <CFormLabel htmlFor="jurusan" className="label">
                          Jurusan
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="jurusan"
                          name="jurusan"
                        />
                        <CFormLabel htmlFor="email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          name="email"
                        />
                        <CFormLabel htmlFor="noHandphone" className="label">
                          No Handphone
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="noHandphone"
                          name="noHandphone"
                        />
                        <br />
                        <p className="header-text">Data Orang Tua Wali</p>
                        <CFormLabel
                          htmlFor="namaOrangTuaWali"
                          className="label"
                        >
                          Nama Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="namaOrangTuaWali"
                          name="namaOrangTuaWali"
                        />
                        <CFormLabel
                          htmlFor="noHandphoneOrangTuaWali"
                          className="label"
                        >
                          No Handphone Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="noHandphoneOrangTuaWali"
                          name="noHandphoneOrangTuaWali"
                        />
                      </CCol>
                      <CCol xs="6" className="my-col-inner">
                        <CCard className="card-style">
                          <div className="card-content-style">
                            {selectedImage ? (
                              <CImage
                                src={selectedImage}
                                fluid
                                className="image-style"
                              />
                            ) : (
                              <CImage src={img} fluid className="image-style" />
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
                        <CFormLabel htmlFor="nama" className="label">
                          Nama
                        </CFormLabel>
                        <CFormInput type="text" id="nama" name="nama" />
                        <CFormLabel htmlFor="nim" className="label">
                          NIM
                        </CFormLabel>
                        <CFormInput type="text" id="nim" name="nim" />
                        <CFormLabel htmlFor="waliDosen" className="label">
                          Wali Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="waliDosen"
                          name="waliDosen"
                        />
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

export default VerifyPengajuan;
