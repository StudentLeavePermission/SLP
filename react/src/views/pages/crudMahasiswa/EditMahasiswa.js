import axios from "axios";
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

const EditMahasiswa = () => {
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
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:3000/data-mahasiswa/students/1').then((response) => {
      setPost(response.data.data);
    });
  }, []);

  if (!post) return null;


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
                              defaultValue={post.ID_Kelas}
                              disabled
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
                              defaultValue={post.ID_Kelas}
                              disabled
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
                          defaultValue="Teknik Komputer dan Informatika"
                            disabled
                        />
                        <CFormLabel htmlFor="email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={post.Email}
                              disabled
                        />
                        <CFormLabel htmlFor="noHandphone" className="label">
                          No Handphone
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="noHandphone"
                          name="noHandphone"
                          defaultValue={post.Nomor_Telp}

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
                          defaultValue={post.Nomor_Telp_Ortu}
                          disabled
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
                          defaultValue={post.Nomor_Telp_Ortu}
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
                        <CFormInput type="text" id="nama" name="nama" defaultValue={post.Nama} disabled />
                        <CFormLabel htmlFor="nim" className="label">
                          NIM
                        </CFormLabel>
                        <CFormInput type="text" id="nim" name="nim" defaultValue={post.NIM} disabled/>
                        <CFormLabel htmlFor="waliDosen" className="label">
                          Wali Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="waliDosen"
                          name="waliDosen"
                          defaultValue={post.ID_Kelas}
                          disabled
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

export default EditMahasiswa;
