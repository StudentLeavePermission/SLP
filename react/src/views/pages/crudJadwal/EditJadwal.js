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
import './style.css';

const EditJadwal = () => {

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
                        <CFormLabel htmlFor="kelas" className="label">
                          Kelas
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="kelas"
                          name="kelas"
                        />
                        <CFormLabel htmlFor="hari" className="label">
                          Hari
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="hari"
                          name="hari"
                        />
                        <CFormLabel htmlFor="jamke" className="label">
                          Jam Ke
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="jamke"
                          name="jamke"
                        />
                        <CFormLabel
                          htmlFor="waktu"
                          className="label"
                        >
                          Waktu
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="waktu"
                          name="waktu"
                        />
                      </CCol>
                      <CCol xs="6" className="my-col-inner">
                        <CFormLabel htmlFor="matakuliah" className="label">
                          Mata Kuliah
                        </CFormLabel>
                        <CFormInput type="text" id="matakuliah" name="matakuliah" />
                        <CFormLabel htmlFor="namadosen" className="label">
                          Nama Dosen
                        </CFormLabel>
                        <CFormInput type="text" id="namadosen" name="namadosen" />
                        <CFormLabel htmlFor="ruangan" className="label">
                          Ruangan
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="ruangan"
                          name="ruangan"
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

export default EditJadwal;
