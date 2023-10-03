import React, { useState } from 'react'
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
import './style.css'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = 'http://localhost:3000/data-mahasiswa/login';

function handleLogin() {
  axios
    .post(baseURL, {
      NIM: username,
      Password: password,
    });
}

const isEmail = (username) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@polban.ac.id$/;

  return emailPattern.test(username);
}

  return (
      <div className="page">
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
                    <CFormInput 
                      name="username"
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4" style={{ width: '90%', margin: '0 auto' }}>
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
                  <CRow className="mx-1">
                  <CButton
                    style={{ width: '90%', margin: '0 auto', backgroundColor: '#0536FF' }}
                    onClick={handleLogin}
                  >
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
  );
}

export default Login
