import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../scss/_variables.scss'
import './style.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

let idMhs = '';
let idDosen = '';

export let idMahasiswa = '';
export let idDosenWali = '';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const isEmail = (username) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@polban.ac.id$/;
    return emailPattern.test(username);
  };

  const isNIM = (username) => {
    const nimPattern = /^[0-9]{1,10}$/; // NIM adalah angka dengan panjang maksimal 10 digit
    return nimPattern.test(username);
  };

  useEffect(() => {
    // Jika role berubah, navigasikan ke halaman dengan role yang baru
    if (role) {
      setTimeout(() => {
        navigate(`/${role}`);
      }, 800); 
    }
  }, [role, navigate]);

  useEffect(() => {
    if (idDosen) {
      idDosenWali = idDosen;
    }
  })

  useEffect(() => {
    if (idMhs) {
      idMahasiswa = idMhs;
    }
  })

  const validateForm = () => {
    const errors = {};
    if (!username) {
      errors.username = 'Fill your username';
    }
    if (!password) {
      errors.password = 'Fill your password';
    }
    setFormErrors(errors);
    return errors;
  };

  async function handleLogin(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        if (isEmail(username)) {
          console.log(username)
          axios
            .post('http://localhost:3000/data-dosen-wali/login', {
              Email_Dosen: username,
              Password: password,
            })
            .then(async () => { // Gunakan async di sini
              const token = Cookies.get('jwt');
              if (token !== 'undefined') {
                // setRole('dosen');
                try {
                  const apiURL = `http://localhost:3000/data-dosen-wali/get/id/${username}`;
                  const response = await axios.get(apiURL);
                  const data = response.data.data;
                  idDosen = data.id;
                  console.log('iddosennnnnn', idDosen);
                  setRole('dosen');
                } catch (error) {
                  console.error('Error fetching data:', error);
                  alert('Failed to fetch data');
                }
              } else {
                alert('Coba lagi');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Email or password is invalid');
            });
        } else if (username === 'admin') {
          setRole('admin'); 
        } else if (isNIM(username)) {
          axios
            .post('http://localhost:3000/data-mahasiswa/login', {
              NIM: username,
              Password: password,
            })
            .then(async () => { // Gunakan async di sini
              const token = Cookies.get('jwt');
              if (token !== 'undefined') {
                try {
                  const apiURL = `http://localhost:3000/data-mahasiswa/students/getId/${username}`;
                  const response = await axios.get(apiURL);
                  const data = response.data.data;
                  idMhs = data.id;
                  console.log(idMhs);
                  setRole('mahasiswa');
                } catch (error) {
                  console.error('Error fetching data:', error);
                  alert('Failed to fetch data');
                }
              } else {
                alert('Coba lagi');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('NIM or password is invalid');
            });
        } else {
          alert ('Invalid Username');
        }
      } catch (error){
        alert('Error1234211332');
      }
      
    }
  }  

  return (
    <div className="page">
      <CContainer style={{ width: '100%', maxWidth: '500px' }}>
        <CCardGroup>
          <CCard>
            <CCardBody style={{ textAlign: 'center' }}>
              <CForm onSubmit={handleLogin}>
                <h1>Welcome</h1>
                <p style={{ fontFamily: 'inherit' }} className="text-medium-emphasis">
                  Enter your credentials to access your account
                </p>
                <CInputGroup className="mb-2" style={{ width: '90%', margin: '0 auto' }}>
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    name="username"
                    placeholder="Username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </CInputGroup>
                {formErrors.username && <div className="text-danger">{formErrors.username}</div>}
                <CInputGroup style={{ width: '90%', margin: '0 auto' }}>
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </CInputGroup>
                {formErrors.password && <div className="text-danger" >{formErrors.password}</div>}
                <CRow className="pt-4">
                  <CButton
                    className="button-login"
                    type="submit"
                  >
                    <span> Login </span>
                  </CButton>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
        <CRow style={{ paddingRight: '20px', paddingTop: '10px' }}>
          <CButton
            className="button-forgot"
            onClick={() => navigate('#')}
          >
            Forgot password?
          </CButton>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
