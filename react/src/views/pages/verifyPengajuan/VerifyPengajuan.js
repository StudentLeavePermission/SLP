import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormTextarea,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import '../../../scss/style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { data } from 'jquery'

const baseURL = "http://localhost:3000/data-pengajuan/";

const CustomCheckboxTable = () => {
  const [visible, setVisible] = useState(false)
  const [rejectConfirmVisible, setRejectConfirmVisible] = useState(false)
  const [keterangan, setKeterangan] = useState("")
  const [keteranganPenolakan, setKeteranganPenolakan] = useState("")
  const [tanggalPengajuan, setTanggalPengajuan] = useState("")
  const [tanggalAbsen, setTanggalAbsen] = useState("")
  const [idJadwalKelas, setIdJadwalKelas] = useState("")
  const [jenisIzin, setJenisIzin] = useState("")
  const [statusPengajuan, setStatusPengajuan] = useState("")
  const [idMahasiswa, setIdMahasiswa] = useState("")
  const [fileBukti, setFileBukti] = useState("nama_file_anda.pdf")
  const [tableData, setTableData] = useState([]) // State untuk data tabel
  const [selectedDate, setSelectedDate] = useState(new Date()) // State untuk menyimpan tanggal yang dipilih
  const [selectedDates, setSelectedDates] = useState([]) // State untuk menyimpan tanggal-tanggal yang dipilih
  const [selectAll, setSelectAll] = useState(false) // State untuk checkbox "Pilih Semua Jadwal"
  const [expandedDates, setExpandedDates] = useState([]) // State untuk tanggal yang sedang diperluas
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    ID_Mahasiswa: '',
    Keterangan: '',
    Jenis_Izin: '',
    Tanggal_Pengajuan: '',
    Tanggal_Izin: '',
    ID_Jadwal_Kelas: '',
    File_Pengajuan: '',
    Status_Pengajuan: '',
    Alasan_Penolakan: ''
  });
  const selectedDatesExist = selectedDates.length > 0
  const handleketeranganChange = (event) => {
    setKeterangan(event.target.value);
  };

  const handleKeteranganPenolakanChange = (event) => {
    setKeteranganPenolakan(event.target.value);
  }

  React.useEffect(() => {
    // Fungsi untuk mendapatkan tanggal hari ini
    const getTanggalHariIni = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Januari dimulai dari 0
      const yyyy = today.getFullYear();

      const tanggalHariIni = `${yyyy}-${mm}-${dd}`;
      setTanggalAbsen(tanggalHariIni);
      setTanggalPengajuan(tanggalHariIni);
    };
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const { key } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(key);
  }, [key]);

  const fetchData = async (key) => {
    try {
      // First, fetch data from Data_Pengajuan table
      const response = await axios.get(`http://localhost:3000/data-pengajuan/${key}`);
      const data = response.data.data; // Ambil data dari response

      if (response.status === 200) {
        console.log('Data yang telah diambil dari server:', data);

        // Fetch data from Data_Mahasiswa using ID_Mahasiswa
        const mahasiswaResponse = await axios.get(`http://localhost:3000/data-mahasiswa/students/${data.ID_Mahasiswa}`);
        const mahasiswaData = mahasiswaResponse.data.data;

        if (mahasiswaResponse.status === 200) {
          // Atur formData dengan data dari database
          setFormData({
            NIM: mahasiswaData.NIM,
            Nama: mahasiswaData.Nama,
            Keterangan: data.Keterangan,
            Jenis_Izin: data.Jenis_Izin,
            Tanggal_Pengajuan: data.Tanggal_Pengajuan,
            Tanggal_Izin: data.Tanggal_Izin,
            ID_Jadwal_Kelas: data.ID_Jadwal_Kelas,
            File_Pengajuan: data.File_Pengajuan,
            Status_Pengajuan: data.Status_Pengajuan,
            Alasan_Penolakan: data.Alasan_Penolakan
          });
          // setSelectedDate(data.Tanggal_Izin);
        } else {
          console.error('Gagal mengambil data mahasiswa');
        }
      } else {
        console.error('Gagal mengambil data pengajuan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  function acceptRequest() {

  }

  function rejectRequest() {

  }

  const downloadRequestFile = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/download/${filename}`, { responseType: 'blob' });

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error downloading file');
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };


  const getDayName = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const dayIndex = date.getDay()
    return days[dayIndex]
  }


  const dayName = getDayName(selectedDate) // Mendapatkan nama hari dari tanggal yang dipilih

  // Fungsi untuk mendapatkan data tabel berdasarkan hari yang dipilih
  const getTableDataForDay = (dayName) => {
    // Tambahkan logika di sini untuk mengambil data sesuai dengan hari yang dipilih
    switch (dayName) {
      case 'Minggu':
        return [
          {
            id: 'minggu-checkbox1',
            jamPelajaran: '08:10 - 09:40',
            namaMataKuliah: 'Komgraf',
            isChecked: false,
          },
          {
            id: 'minggu-checkbox2',
            jamPelajaran: '10:45 - 12:15',
            namaMataKuliah: 'Komgraf',
            isChecked: false,
          },
          // Tambahkan data lainnya untuk Minggu
        ]
      case 'Senin':
        return [
          {
            id: 'senin-checkbox1',
            jamPelajaran: '08:00 - 09:30',
            namaMataKuliah: 'Matematika',
            isChecked: false,
          },
          {
            id: 'senin-checkbox2',
            jamPelajaran: '09:45 - 11:15',
            namaMataKuliah: 'Bahasa Inggris',
            isChecked: false,
          },
          // Tambahkan data lainnya untuk Senin
        ]
      case 'Selasa':
        return [
          {
            id: 'selasa-checkbox3',
            jamPelajaran: '08:00 - 09:30',
            namaMataKuliah: 'Fisika',
            isChecked: false,
          },
          {
            id: 'selasa-checkbox4',
            jamPelajaran: '09:45 - 11:15',
            namaMataKuliah: 'Kimia',
            isChecked: false,
          },
          // Tambahkan data lainnya untuk Selasa
        ]
      default:
        return [] // Default kosong jika hari tidak dikenali
    }
  }

  // Gunakan useEffect untuk memperbarui data tabel saat tanggal berubah
  useEffect(() => {
    const dataForSelectedDay = getTableDataForDay(dayName)
    setTableData(dataForSelectedDay)
  }, [selectedDate, dayName]) // Sertakan dayName dalam dependency array

  useEffect(() => {
    setStatusPengajuan(formData.Status_Pengajuan);
  }, [formData.Status_Pengajuan]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/data-pengajuan/update/${key}`, {
        Status_Pengajuan: formData.Status_Pengajuan,
        Alasan_Penolakan: formData.Alasan_Penolakan
      });

      if (response.status === 200) {
        console.log('Data berhasil diubah di database:', response.data);
        alert("Berhasil mengubah data! " + formData.Status_Pengajuan + "Alasan Ditolak: " + formData.Alasan_Penolakan);
        navigate('/dosen/tabelPengajuan');
        await axios.get(`http://localhost:3000/data-pengajuan/emailVerify/${key}`);
        setValidated(true)
      } else {
        console.error('Gagal mengubah data di database');
        alert('Gagal mengubah data di database');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengubah data. ' + statusPengajuan);
    }
  };

  return (
    <CForm
      className="row g-3"
      onSubmit={handleSubmit}
    >
      {/* Form elements */}
      <CCol xs={8}>
        <CFormTextarea
          id="suratContent"
          value={`Halo, saya ${formData.Nama} dengan NIM ${formData.NIM}, ingin mengajukan izin sebagai berikut:
          Tanggal Pengajuan: ${formData.Tanggal_Pengajuan}
          Jenis Surat: ${formData.Jenis_Izin}
          Jadwal Absen yang Dipilih:
          ${tableData.map((item) => ` - ${item.jamPelajaran}, ${item.namaMataKuliah}`).join('\n\t  ')}
          Alasan: ${formData.Keterangan}`}
          rows={15}
          readOnly
        />
      </CCol>
      <div className="mb-3 custom-input margin-lampiran">
        <CFormLabel htmlFor="validationCustom07" className="table-font">
          Lampiran
        </CFormLabel>
        <CFormInput
          type="text"
          id="validationCustom03"
          value={formData.File_Pengajuan} // nyambung ke backend
          readOnly
        />
        <CButton color="primary" type='button' onClick={() => downloadRequestFile(formData.File_Pengajuan)}>
          Unduh
        </CButton>
      </div>
      <CCol xs={12}>
        <CButton color="primary" type="submit" onClick={() => handleChange('Status_Pengajuan', 'Accepted')}>
          Setujui
        </CButton>
        <>
          <CButton color="danger" onClick={() => { setVisible(!visible); handleChange('Status_Pengajuan', 'Rejected') }}>Tolak</CButton>
          <CModal
            backdrop="static"
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="StaticBackdropExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="StaticBackdropExampleLabel">Penolakan</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mb-5">
                <CFormLabel htmlFor="validationCustom05" className="form-label table-font">
                  Alasan penolakan
                </CFormLabel>
                <CFormTextarea
                  id="validationTextarea"
                  value={keteranganPenolakan}
                  onChange={handleKeteranganPenolakanChange}
                  rows={7}
                  required
                >
                </CFormTextarea>
                <CFormFeedback valid>Alasan sudah diisi</CFormFeedback>
                <CFormFeedback invalid>Mohon sertakan alasan penolakan</CFormFeedback>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => { setVisible(false); handleChange('Status_Pengajuan', 'Delivered') }}>
                Batalkan
              </CButton>
              <CButton color="danger" onClick={() => {
                console.log(formData.Status_Pengajuan)
                console.log(formData.Keterangan_Penolakan)
                handleChange('Status_Pengajuan', 'Rejected') // THE STATUS DID NOT CHANGE AT ALL
                setStatusPengajuan('Rejected')
                handleChange('Alasan_Penolakan', keteranganPenolakan)
                console.log(formData.Keterangan_Penolakan)
                console.log(formData.Status_Pengajuan)
                setVisible(false)
                setRejectConfirmVisible(true)
                console.log("Status = " + formData.Status_Pengajuan + ", Alasan = " + formData.Alasan_Penolakan)
              }}>Tolak pengajuan</CButton>
            </CModalFooter>
          </CModal>
          <CModal
            backdrop="static"
            visible={rejectConfirmVisible}
            onClose={() => {
              setVisible(true)
              setRejectConfirmVisible(false)
            }}
            aria-labelledby="StaticBackdropExampleLabel2"
          >
            <CModalHeader>
              <CModalTitle id="StaticBackdropExampleLabel2">Konfirmasi Penolakan</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <div className="mb-5">
                <CFormLabel htmlFor="validationCustom06" className="form-label table-font">
                  Apakah anda yakin ingin menolak pengajuan ini? Tindakan ini tidak dapat diurungkan.
                </CFormLabel>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => {
                console.log(formData.Status_Pengajuan)
                console.log(formData.Keterangan_Penolakan)
                handleChange('Status_Pengajuan', 'Delivered');
                handleChange('Alasan_Penolakan', '');
                console.log(formData.Status_Pengajuan)
                console.log(formData.Keterangan_Penolakan)
                setVisible(true)
                setRejectConfirmVisible(false)
              }}>
                Tidak, kembali
              </CButton>
              <CButton color="danger" onClick={(e) => {
                console.log(formData.Status_Pengajuan)
                console.log(formData.Keterangan_Penolakan)
                handleSubmit(e);
                console.log(formData.Status_Pengajuan)
                console.log(formData.Keterangan_Penolakan)
              }}>Ya, tolak pengajuan</CButton>
            </CModalFooter>
          </CModal>
        </>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <strong className="table-font-judul fs-5">Formulir Pengajuan</strong>
            <DocsExample href="forms/validation">
              <CustomCheckboxTable />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
