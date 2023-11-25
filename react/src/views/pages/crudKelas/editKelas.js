import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
} from '@coreui/react';
import './crudKelas.css';
import { NULL } from 'sass';

function EditKelas() {
  const { key } = useParams();
  const [formData, setFormData] = useState({
    Nama_Kelas: '',
    Tahun_Ajaran: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [id, setId] = useState(sessionStorage.getItem('idAdmin'));
  const [prodi, setProdi] = useState('');
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [ID_Dosen_Wali, setIdDosen] = useState(null);


  const getAllDataKelas = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-kelas/getallprodi/${id}`);
      setDataKelas(response.data.data);
      console.log("daftar kelasnya:", response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (name, selectedOption) => {
    if (name === 'Tahun_Ajaran') {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.value : '',
      });
    } else if (name === 'Nama_Kelas' && selectedOption && typeof selectedOption.label === 'string') {
      const formattedNamaKelas = selectedOption.label.toUpperCase();
      setFormData({
        ...formData,
        Nama_Kelas: formattedNamaKelas,
      });
      setSelectedValue(selectedOption);
    } else {
      setFormData({
        ...formData,
        [name]: selectedOption ? selectedOption.label : '', // handle null or undefined
      });
    }

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  useEffect(() => {
    getAllDataKelas();
  }, [id]);

  const kelasOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    // Tambahkan pilihan kelas lainnya
  ];

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/data-kelas/getoneformat/${key}`)
      .then((response) => {
        const kelasData = response.data.dataKelas;
        let kelas = '';
        let prodi = '';
        
        if (kelasData) {
          const nama_kelas = kelasData.Nama_Kelas;
          const id_dosen = kelasData.ID_Dosen_Wali;
          const karakterArray = nama_kelas.split('');
          if (karakterArray.length >= 4) {
            kelas = karakterArray.slice(1, 2).join('');
            prodi = karakterArray.slice(2, 4).join('');
            console.log("kelas : ", kelas);
            console.log("prodi : ", prodi);
            setProdi(prodi);
            setIdDosen(id_dosen)
            setFormData({
              Nama_Kelas: kelas,
              Tahun_Ajaran: kelasData.Tahun_Ajaran,
            });
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Terjadi kesalahan saat mengambil data. Error: ' + error.message);
      });
  }, [key]);

  useEffect(() => {
    if (done) {
      navigate('/admin/dataKelas');
    }
  }, [done, navigate]);

  const validateForm = () => {
    const errors = {};
    
    const duplicateClass = dataKelas.find(
      (kelas) => {
        const expectedNamaKelas = (selectedValue ? selectedValue.label : '') + prodi;
        const isDuplicate = kelas.Nama_Kelas === expectedNamaKelas && kelas.Tahun_Ajaran === formData.Tahun_Ajaran;
    
        console.log("Expected Nama_Kelas: ", expectedNamaKelas);
        console.log("Actual Nama_Kelas: ", kelas.Nama_Kelas);
        console.log("Actual Tahun_Ajaran: ", kelas.Tahun_Ajaran);
        console.log("Is Duplicate: ", isDuplicate);
    
        return isDuplicate;
      }
    );
    
    console.log("tahunnnnn : ", formData.Tahun_Ajaran);
    
    if (duplicateClass) {
      errors.Nama_Kelas = 'Kelas dengan nama dan tahun ajaran yang sama sudah ada.';
      errors.Tahun_Ajaran = 'Kelas dengan nama dan tahun ajaran yang sama sudah ada.';
    }
    
    setFormErrors(errors);
    return errors;    
  };  
  
  const updateDataKelas = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);
  
    if (ID_Dosen_Wali === null) {
      const errors = validateForm();
  
      if (Object.keys(errors).length === 0) {
        try {
          const Nama_Kelas = formData.Nama_Kelas + prodi;
          console.log("kelas yang dipilih: ", Nama_Kelas);
          console.log("tahun yang dipilih: ", formData.Tahun_Ajaran);
  
          await axios.patch(`http://localhost:3000/data-kelas/update/${key}`, {
            Nama_Kelas: Nama_Kelas,
            Tahun_Ajaran: formData.Tahun_Ajaran,
          });
  
          setDone(true);
          setFormData({ Nama_Kelas: '', Tahun_Ajaran: '' });
        } catch (error) {
          console.error('Error:', error);
          alert('Terjadi kesalahan saat memperbarui data. Error: ' + error.message);
        }
      } else {
        alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
      }
    } else {
      alert('Data tidak dapat diperbarui karena ID_Dosen_Wali tidak null.');
    }
  };  

  return (
    <CForm onSubmit={updateDataKelas} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Perbarui Data Kelas</h2>
        </div>
      </div>
      <CRow>
        <CCol className="box-1">
          <div>
            <CFormLabel htmlFor="Nama_Kelas">Nama Kelas</CFormLabel>
            <Select
              id="Nama_Kelas"
              value={kelasOptions.find(option => option.value === formData.Nama_Kelas)}
              onChange={(selectedOption) => handleChange('Nama_Kelas', selectedOption)}
              options={kelasOptions}
            />
            {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Tahun_Ajaran">Tahun Masuk</CFormLabel>
            <CFormInput
              className="input"
              type="number"
              id="Tahun_Ajaran"
              value={formData.Tahun_Ajaran}
              onChange={(e) => handleChange('Tahun_Ajaran', { value: e.target.value, label: e.target.value })}
              min={2019}
              max={getCurrentYear()}
            />
            {formErrors.Tahun_Ajaran && <div className="text-danger">{formErrors.Tahun_Ajaran}</div>}
          </div>
        </CCol>
      </CRow>
      <div>
        <a href={`/#/admin/dataKelas`} className="btn btn-secondary float-start">
          Kembali
        </a>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
}

export default EditKelas;
