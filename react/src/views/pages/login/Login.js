import React, { useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone, cilEnvelopeOpen } from '@coreui/icons'
import '../../../scss/_variables.scss'
import './style.css'

const Login = () => {
  const loginRef = useRef(null)
  const aboutUsRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (id) => {
    id.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ backgroundColor: '#F2F6FF' }}>
      <header className="fixed-bar">
        <CCol className="fixed-bar-col">
          <CButton color="transparant" className="px-3 ml-3">
            <span onClick={() => scrollToSection(loginRef)}>Home</span>
          </CButton>
          <CButton color="transparant" className="px-3 ml-3">
            <span onClick={() => scrollToSection(aboutUsRef)}>About Us</span>
          </CButton>
          <CButton color="transparant" className="px-3 ml-3">
            <span onClick={() => scrollToSection(contactRef)}>Contact</span>
          </CButton>
        </CCol>
      </header>
      <div ref={loginRef} className="page">
        <CContainer style={{ width: '100%', maxWidth: '500px' }}>
          <CCardGroup>
            <CCard>
              <CCardBody style={{ textAlign: 'center' }}>
                <CForm>
                  <h1>Welcome</h1>
                  <p style={{ fontFamily: 'inherit' }} className="text-medium-emphasis">
                    Enter your credentials to access your account
                  </p>
                  <CInputGroup className="mb-2" style={{ width: '90%', margin: '0 auto' }}>
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-4" style={{ width: '90%', margin: '0 auto' }}>
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CRow className="mx-1">
                    <CButton style={{ width: '90%', margin: '0 auto', backgroundColor: '#0536FF' }}>
                      <span> Login </span>
                    </CButton>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
          <CRow style={{ paddingRight: '20px', paddingTop: '10px' }}>
            <CButton color="transparant" className="px-0" style={{ color: '#0536FF' }}>
              Forgot password?
            </CButton>
          </CRow>
        </CContainer>
      </div>
      <div ref={aboutUsRef} className="page">
        <CContainer className="about-us-cont">
          <CCard className="card-judul"> About Us </CCard>
          <CCard>
            <p className="paragraf">
              Student Leave Permission adalah sebuah sebuah aplikasi yang mengelola persuratan
              ketidakhadiran mahasiswa selama mengikuti perkuliahan dikarenakan mahasiswa sakit atau
              ada urusan mendadak, sehingga sulit untuk ditinggalkan. Aplikasi menerima data
              persuratan ketidakhadiran kuliah dari mahasiswa, kemudian mahasiswa mengajukan
              ketidakhadiran. Wali dosen akan menerima notifikasi ketidakhadiran, kemudian memroses
              perizinan dengan memberikan persetujuan atau penolakan berdasarkan surat yang
              diajukan. Jika perizinan diseujui oleh wali dosen, maka sistem akan memberikan
              pemberitahuan kepada pihak terkait. Aplikasi ini diharapkan dapat memroses pengajuan
              surat izin atau sakit dari mahasiswa menjadi lebih efisien dan terorganisir, serta
              mempermudah komunikasi antara mahasiswa, dosen, orang tua mahasiswa, dan pihak terkait
              lainnya.
            </p>
          </CCard>
        </CContainer>
      </div>
      <div ref={contactRef} className="page">
        <CContainer className="contact-cont">
          <CRow style={{ margin: '80px' }}>
            <CCol className="d-flex justify-content-center">
              <CCard className="lingkaran">
                <CIcon icon={cilPhone} size="xl" />
              </CCard>
              <CCard className="card-contact"> 087735580889 </CCard>
            </CCol>
            <CCol className="d-flex justify-content-center">
              <CCard className="lingkaran">
                <CIcon icon={cilEnvelopeOpen} size="xl" />
              </CCard>
              <CCard className="card-contact"> fauza.naylassana.tif22@polban.ac.id </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  )
}

export default Login
