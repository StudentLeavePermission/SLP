import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CCol,
  CRow,
} from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDataDosen = () => {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
    Nama_Kelas: '',
    Password: '',
    Status: 'Bukan Dosen Wali',
  });

  const [formErrors, setFormErrors] = useState({});
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showKelasProdi, setShowKelasProdi] = useState(false);
  const { key } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [done, setDone] = useState();
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      Status: status,
    });

    if (status === 'Dosen Wali') {
      setShowKelasProdi(true);
    } else {
      setShowKelasProdi(false);
    }

    setFormErrors({
      ...formErrors,
      Nama_Kelas: '',
      Password: '',
    });
  };

  const handleChangeKelas = (selectedOption) => {
    setSelectedKelas(selectedOption);
    handleChange('Nama_Kelas', selectedOption ? selectedOption.label : '');
  };

  useEffect(() => {
    getAllDataKelas();
  }, []);

  const getAllDataKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas');
      const filteredDataKelas = response.data.data.filter((kelas) => kelas.ID_Dosen_Wali.toString() === key.toString());
      setDataKelas(filteredDataKelas);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(key);
    setIsEditing(true);
  }, [key]);

  useEffect(() => {
    if (done === 1) {
      navigate('/dataDosen');
    }
  }, [done]);

  const fetchData = async (key) => {
    try {
      const dataDosenResponse = await axios.get(`http://localhost:3000/data-dosen/get/${key}`);
      const dataDosen = dataDosenResponse.data.data;

      if (dataDosenResponse.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          Nama_Dosen: dataDosen.Nama_Dosen,
          NIP: dataDosen.NIP,
          Kode_Dosen: dataDosen.Kode_Dosen,
          InitialID: dataDosen.InitialID,
          Email_Dosen: dataDosen.Email_Dosen,
          kelas: dataDosen.Nama_Kelas,
        }));
      } else {
        console.error('Gagal mengambil data dosen');
      }

      const allDosenResponse = await axios.get('http://localhost:3000/data-dosen-wali');
      const allDosenData = allDosenResponse.data.data;
      let IDDosen = null;

      for (let i = 0; i < allDosenData.length; i++) {
        const indeks = allDosenData[i];

        if (indeks.ID_Dosen.toString() === key.toString()) {
          IDDosen = indeks.id;
          break;
        }
      }

      if (IDDosen === null) {
        console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
      }

      const dosenWaliResponse = await axios.get(`http://localhost:3000/data-dosen-wali/get/${IDDosen}`);
      const dosenWaliData = dosenWaliResponse.data.data;

      if (dosenWaliResponse.status === 200) {
        if (dosenWaliData) {
          setFormData((prevData) => ({
            ...prevData,
            Status: 'Dosen Wali',
            Password: dosenWaliData.Password,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            Status: 'Bukan Dosen Wali',
            Password: '',
          }));
        }
      } else {
        console.error('Gagal mengambil data dosen wali');
      }

      console.log('Data_Dosen URL:', `http://localhost:3000/data-dosen/get/${key}`);
      console.log('Data_Kelas URL:', `http://localhost:3000/data-kelas/get/${IDDosen}`);
      console.log('Data_Dosen_Wali URL:', `http://localhost:3000/data-dosen-wali/get/${IDDosen}`);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  useEffect(() => {
    if (formData.Status === 'Dosen Wali') {
      setShowKelasProdi(true);
    } else {
      setShowKelasProdi(false);
    }
  }, [formData.Status]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Dosen) {
      errors.Nama_Dosen = 'Nama harus diisi.';
    }
    if (!formData.NIP) {
      errors.NIP = 'NIP harus diisi.';
    }
    if (!formData.InitialID) {
      errors.InitialID = 'ID Dosen harus diisi.';
    }
    if (!formData.Email_Dosen) {
      errors.Email_Dosen = 'Email Dosen harus diisi.';
    }
    
    if (formData.Status === 'Dosen Wali' && !formData.Password) {
      errors.Password = 'Password harus diisi.';
    }

    if (formData.Status === 'Dosen Wali' && !selectedKelas) {
      errors.Nama_Kelas = 'Kelas harus dipilih.';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        await axios.patch(`http://localhost:3000/data-dosen/patch/${key}`, {
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          InitialID: formData.InitialID,
          Email_Dosen: formData.Email_Dosen,
          Status: formData.Status,
          Kelas: selectedKelas ? selectedKelas.label : '',
        });

        if (formData.Status === 'Dosen Wali') {
          const allKelasResponse = await axios.get('http://localhost:3000/data-kelas');
          const allKelasData = allKelasResponse.data.data;
          let IDKelas = null;

          for (let i = 0; i < allKelasData.length; i++) {
            const item = allKelasData[i];

            if (item.ID_Dosen_Wali.toString() === key.toString()) {
              IDKelas = item.id;
              break;
            }
          }

          if (IDKelas === null) {
            console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
          }

          await axios.patch(`http://localhost:3000/data-kelas/patch/${IDKelas}`, {
            Nama_Kelas: formData.Nama_Kelas,
          });
        }

        const allDosenResponse = await axios.get('http://localhost:3000/data-dosen-wali');
        const allDosenData = allDosenResponse.data.data;
        let IDDosen = null;

        for (let i = 0; i < allDosenData.length; i++) {
          const indeks = allDosenData[i];

          if (indeks.ID_Dosen.toString() === key.toString()) {
            IDDosen = indeks.id;
            break;
          }
        }

        if (IDDosen === null) {
          console.log('Tidak ditemukan data yang sesuai dengan ID_Dosen_Wali:', key);
        }

        if (formData.Status === 'Dosen Wali') {
          await axios.patch(`http://localhost:3000/data-dosen-wali/patch/${IDDosen}`, {
            Password: formData.Password,
          });
        } else {
          await axios.delete(`http://localhost:3000/data-dosen-wali/delete/${IDDosen}`);
        }

        alert('Data berhasil diubah!');
      } catch (error) {
        console.error('Terjadi kesalahan saat mengubah data:', error);
        alert('Terjadi kesalahan saat mengubah data.');
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <CRow>
        <CCol className='box-1'>
          <div>
            <CFormLabel htmlFor="Kode_Dosen">Kode Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Kode_Dosen"
              value={formData.Kode_Dosen}
              onChange={(e) => handleChange('Kode_Dosen', e.target.value)}
            />
            {formErrors.Kode_Dosen && <div className="text-danger">{formErrors.Kode_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="InitialID">ID Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="InitialID"
              value={formData.InitialID}
              onChange={(e) => handleChange('InitialID', e.target.value)}
            />
            {formErrors.InitialID && <div className="text-danger">{formErrors.InitialID}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Nama_Dosen">Nama Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Nama_Dosen"
              value={formData.Nama_Dosen}
              onChange={(e) => handleChange('Nama_Dosen', e.target.value)}
            />
            {formErrors.Nama_Dosen && <div className="text-danger">{formErrors.Nama_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="NIP">NIP</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="NIP"
              value={formData.NIP}
              onChange={(e) => handleChange('NIP', e.target.value)}
            />
            {formErrors.NIP && <div className="text-danger">{formErrors.NIP}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Email_Dosen">Email Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="email"
              id="Email_Dosen"
              value={formData.Email_Dosen}
              onChange={(e) => handleChange('Email_Dosen', e.target.value)}
            />
            {formErrors.Email_Dosen && <div className="text-danger">{formErrors.Email_Dosen}</div>}
          </div>
          <div>
            <CFormLabel>Status</CFormLabel>
            <CFormCheck
              type="radio"
              id="flexCheckDefault1"
              name="status"
              label="Dosen Wali"
              checked={formData.Status === 'Dosen Wali'}
              onChange={() => handleStatusChange('Dosen Wali')}
            />
            <CFormCheck
              type="radio"
              id="flexCheckDefault2"
              name="status"
              label="Bukan Dosen Wali"
              checked={formData.Status === 'Bukan Dosen Wali'}
              onChange={() => handleStatusChange('Bukan Dosen Wali')}
            />
          </div>
          {showKelasProdi && (
            <>
              <div className="col-md-4 margin-right">
                <label className="table-font">Kelas</label>
                <Select
                  name="kelas"
                  value={selectedKelas}
                  onChange={handleChangeKelas}
                  options={dataKelas.map((kelas) => ({
                    value: kelas.id,
                    label: kelas.Nama_Kelas,
                  }))}
                  isSearchable
                  required
                />
                {formErrors.Nama_Kelas && (
                  <div className="text-danger">{formErrors.Nama_Kelas}</div>
                )}
              </div>
              {formData.Status === 'Dosen Wali' && (
                <div>
                  <CFormLabel htmlFor="Password">Password</CFormLabel>
                  <CFormInput
                    className="input"
                    type="password"
                    id="Password"
                    value={formData.Password}
                    onChange={(e) => handleChange('Password', e.target.value)}
                  />
                  {formErrors.Password && <div className="text-danger">{formErrors.Password}</div>}
                </div>
              )}
            </>
          )}
        </CCol>
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
        </button>
      </div>
    </CForm>
  );
};

export default EditDataDosen;
