import axios from "axios";
import React, { useEffect, useState } from "react";
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
} from "@coreui/react";
import pencil from "../../../../assets/images/pencil-solid.svg";
import '../../../../scss/styleProfile.css';
import { useParams, useNavigate } from 'react-router-dom';




const editPassword = () => {
    const navigate = useNavigate();
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPasswordBaru, setKonfirmasiPasswordBaru] = useState("");

  const [errors, setErrors] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPasswordBaru: "",
  });

  const [post, setPost] = useState(null);

  const baseURL = `http://localhost:3000/data-mahasiswa/students/gantiPassword/1`;

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      passwordLama: "",
      passwordBaru: "",
      konfirmasiPasswordBaru: "",
    };

    // Pengecekan input kosong
    if (!passwordLama) {
      newErrors.passwordLama = "Field ini harus diisi";
      isValid = false;
    }

    if (!passwordBaru) {
      newErrors.passwordBaru = "Field ini harus diisi";
      isValid = false;
    }

    if (!konfirmasiPasswordBaru) {
      newErrors.konfirmasiPasswordBaru = "Field ini harus diisi";
      isValid = false;
    }

    // Pengecekan apakah passwordBaru dan konfirmasiPasswordBaru sesuai
    if (passwordBaru && konfirmasiPasswordBaru && passwordBaru !== konfirmasiPasswordBaru) {
      newErrors.konfirmasiPasswordBaru = "Password tidak cocok, silahkan masukkan ulang";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createPost = async() => {
    if (!validateInputs()) {
        // Validasi gagal, tidak melanjutkan pengiriman data
        return;
    }

    const data = new FormData();

    // Pengecekan apakah passwordLama tidak null sebelum menambahkannya
        data.append("passwordLama", passwordLama);
    

    // Pengecekan apakah passwordLama tidak null sebelum menambahkannya

        data.append("passwordBaru", passwordBaru);
    try {
        await axios.post(baseURL, {
            passwordLama: passwordLama,
            passwordBaru: passwordBaru,
          });
    
        alert("Password berhasil diubah! ");

        navigate('/mahasiswa/profile');
    
    } catch (error) {
        console.error('Error:', error);
        alert("Error: " + error);
    
        // Tanggapi error jika diperlukan
    }
    // axios
    //     .post(baseURL, {
    //       passwordLama: passwordLama,
    //       passwordBaru: passwordBaru,
    //     })
    //     .then((response) => {
    //       console.log("Respons berhasil:");
    //       alert("Password berhasil diubah! " + response.data.message);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       alert("Error: " + error.message);
    //     });
  };

  const handlePasswordLama = (event) => {
    setPasswordLama(event.target.value);
  };

  useEffect(() => {
    console.log('password', passwordLama);
  }, [passwordLama]);

  const handlePasswordChange = (event) => {
    setPasswordBaru(event.target.value);
  };

  const handleKonfirmasiPasswordChange = (event) => {
    setKonfirmasiPasswordBaru(event.target.value);
  };

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <main className="c-main">
          <div className="container-fluid">
            <CContainer 
                style={{ 
                    width: '50%',
                    alignItems: 'center',
                    minWidth: '500px',
                }}>
              <CRow>
                <CCol className="my-col">
                  <CForm method="POST">
                    <CRow>
                      <CCol xs="12" className="my-col-inner">
                        <p 
                            className="header-text-password"
                        >
                            Ganti Password
                        </p>
                        <CFormLabel htmlFor="passwordLama" className="label">
                          Password Lama
                        </CFormLabel>
                        <CFormInput
                            type="password"
                            id="passwordLama"
                            name="passwordLama"
                            value={passwordLama}
                            onChange={handlePasswordLama}
                        />
                        {errors.passwordLama && <p style={{ color: "red" }}>{errors.passwordLama}</p>}


                        <CFormLabel htmlFor="passwordBaru" className="label">
                          Password Baru
                        </CFormLabel>
                        <CFormInput
                            type="password"
                            id="passwordBaru"
                            name="passwordBaru"
                            value={passwordBaru}
                            onChange={handlePasswordChange}
                        />
                        {errors.passwordBaru && <p style={{ color: "red" }}>{errors.passwordBaru}</p>}


                        <CFormLabel htmlFor="konfirmasiPasswordBaru" className="label">
                          Konfirmasi Password Baru
                        </CFormLabel>
                        <CFormInput
                            type="password"
                            id="konfirmasiPasswordBaru"
                            name="konfirmasiPasswordBaru"
                            value={konfirmasiPasswordBaru}
                            onChange={handleKonfirmasiPasswordChange}
                        />
                        {errors.konfirmasiPasswordBaru && <p style={{ color: "red" }}>{errors.konfirmasiPasswordBaru}</p>}


                        <CButton
                            type="button"
                            className="button-ubah-password"
                            onClick={createPost}
                            style={{ 
                                width: "135px",
                                height: "40px",
                                backgroundColor: '#5A719D',
                                borderColor: 'transparent',
                                marginLeft: '65%',
                                marginTop: '50px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: 'end',
                                marginBlockEnd: '0%',
                            }}
                        >
                          <span> Ubah Password </span>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default editPassword;
