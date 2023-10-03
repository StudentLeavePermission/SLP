import React, { useRef, useEffect } from 'react';
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
import './landingPage.css';
import Lingkaran from './image/lingkaran.png';
import Student from './image/student.png';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  const homeRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);

  const scrollToSection = (id) => {
    id.current.scrollIntoView({ behavior: 'smooth' });
  }

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
        <header className="fixed-bar">
            <nav ref={navRef}>
            <button onClick={() => scrollToSection(homeRef)}>Home</button>
            <button onClick={() => scrollToSection(aboutUsRef)}>About Us</button>
            <button onClick={() => scrollToSection(contactRef)}>Contact</button>
            <CButton className='login' href="#">Log In</CButton>
            <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                <FaTimes />
            </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
            <FaBars />
            </button>
        </header>
      
        <div ref={homeRef} className="landing-page">
            <CContainer className="d-flex justify-content-center position-relative">
                <img src={Lingkaran} alt="Lingkaran" className="landing-image1" />
                <img src={Student} alt="Student" className="landing-image2" />
                <div className="landing-content">
                    <h1 style={{ fontWeight: 'bold' }}>STUDENT LEAVE PERMISION</h1>
                    <p style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>Simplify Absence Notifications for Students</p>
                </div>
            </CContainer>
        </div>

        <div ref={aboutUsRef} className='page'>
            <CContainer className="about-us-cont" data-aos="zoom-in" data-aos-duration="1000">
            <CCard className="card-judul" style={{ fontWeight: 'bold' }}> About Us </CCard>
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
                <CCol className="d-flex justify-content-center" data-aos="fade-right" data-aos-offset="400" data-aos-easing="ease-in-sine"> 
                    <CCard className="lingkaran">
                        <CIcon icon={cilPhone} size="xl" />
                    </CCard>
                    <CCard className="card-contact"> 087735580889 </CCard>
                </CCol>
                <CCol className="d-flex justify-content-center" data-aos="fade-left" data-aos-offset="400" data-aos-easing="ease-in-sine"> 
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
