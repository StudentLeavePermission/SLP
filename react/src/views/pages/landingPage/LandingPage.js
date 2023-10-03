import React, { useRef, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPhone, cilEnvelopeOpen } from '@coreui/icons';
import '../../../scss/_variables.scss';
import './LandingPage.css';
import Lingkaran from './image/lingkaran.png';
import Student from './image/student.png';
import { FaBars, FaTimes } from 'react-icons/fa'; // Perhatikan penggunaan 'react-icons/fa' di sini

const LandingPage = () => {
  const homeRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null); // Tambahkan referensi untuk elemen navbar
  const [showSidebar, setShowSidebar] = useState(false); // State untuk mengontrol tampilan sidebar

  const scrollToSection = (id) => {
    id.current.scrollIntoView({ behavior: 'smooth' });
    setShowSidebar(false); // Tutup sidebar setelah mengklik item menu
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle tampilan sidebar ketika tombol hamburger atau close diklik
  };

  return (
    <div>
        <header className="fixed-bar">
        <nav ref={navRef} className={`sidebar ${showSidebar ? 'active' : ''}`}>
          <button onClick={toggleSidebar} className="toggle-sidebar">
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
          <button onClick={() => scrollToSection(homeRef)}>Home</button>
          <button onClick={() => scrollToSection(aboutUsRef)}>About Us</button>
          <button onClick={() => scrollToSection(contactRef)}>Contact</button>
        </nav>
      </header>


        <div ref={homeRef} className="landing-page">
            <CContainer className="d-flex justify-content-center position-relative">
                <img src={Lingkaran} alt="Lingkaran" className="landing-image1" />
                <img src={Student} alt="Student" className="landing-image2" />
                <div className="landing-content">
                    <h1>STUDENT LEAVE PERMISION</h1>
                    <p>Simplify Absence Notifications for Students</p>
                    <CButton href="#">LOGIN</CButton>
                </div>
            </CContainer>
        </div>
        <div ref={aboutUsRef} className="page">
            <CContainer className="about-us-cont">
            <CCard className="card-judul"> About Us </CCard>
            <CCard>
                <CCardBody>
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
                </CCardBody>
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

export default LandingPage
