import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
} from '@coreui/react';
import '../../../scss/style.css';
function TambahDataKelas() {
  const [formData, setFormData] = useState({
    Nama_Kelas: '',
    Tahun_Ajaran: new Date().getFullYear(),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [id, setId] = useState(sessionStorage.getItem('idAdmin'));
  const [prodi, setProdi] = useState('');
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

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
        [name]: selectedOption ? selectedOption.value : '', // handle null or undefined
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
    if (id) {
      if (id === '1') {
        setProdi('D3');
        console.log("ini prodinya ya:", prodi);
      } else if (id === '2') {
        setProdi('D4');
      }
    }
    getAllDataKelas();
  }, [id]);

  useEffect(() => {
  }, [prodi]);

  const kelasOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  useEffect(() => {
    if (done) {
      navigate(-1); // Navigate back to the previous page
    }
  }, [done, navigate]);

  const validateForm = () => {
  const errors = {};
  
  // Check for duplicates in existing data
  const duplicateClass = dataKelas.find(
    (kelas) =>
      kelas.Nama_Kelas === (selectedValue ? selectedValue.label : '') + prodi &&
      kelas.Tahun_Ajaran === formData.Tahun_Ajaran
  );

  if (duplicateClass) {
    errors.Nama_Kelas = 'Kelas dengan nama dan tahun ajaran yang sama sudah ada.';
  }

  setFormErrors(errors);
  return errors;
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        // Menggabungkan Nama Kelas dan Program Studi tanpa spasi di antaranya
        const Nama_Kelas = formData.Nama_Kelas + prodi;
        console.log("kelas yang dipilih: ", Nama_Kelas);
        console.log("tahun yang dipilih: ", formData.Tahun_Ajaran);
        // Kemudian mengirim Nama_Kelas yang telah digabungkan
        await axios.post('http://localhost:3000/data-kelas/create', {
          Nama_Kelas: Nama_Kelas,
          Tahun_Ajaran: formData.Tahun_Ajaran,
        });

        // Handle successful submission
        setDone(true);
        setFormData({ Nama_Kelas: '', Program_Studi: '', Tahun_Ajaran: '' });
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="">
        <div>
          <h2>Tambah Data Kelas</h2>
        </div>
      </div>
      <CRow>
        <CCol className="">
          <div>
            <CFormLabel htmlFor="Nama_Kelas">Nama Kelas</CFormLabel>
            <Select
              id="Nama_Kelas"
              options={kelasOptions}
              onChange={(selectedOption) => handleChange('Nama_Kelas', selectedOption)}
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

export default TambahDataKelas;
