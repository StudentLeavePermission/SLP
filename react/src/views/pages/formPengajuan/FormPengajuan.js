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
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import './Style.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const CustomCheckboxTable = () => {
  const [keterangan, setKeterangan] = useState("")
  const [tanggalPengajuan, setTanggalPengajuan] = useState("")
  const [tanggalAbsen, setTanggalAbsen] = useState("")
  const [idJadwalKelas, setIdJadwalKelas] = useState("")
  const [jenisIzin, setJenisIzin] = useState("")
  const [statusPengajuan, setStatusPengajuan] = useState("")
  const [idMahasiswa, setIdMahasiswa] = useState("")
  const [fileBukti, setFileBukti] = useState("")
  const [tableData, setTableData] = useState([]) // State untuk data tabel
  const [selectedDate, setSelectedDate] = useState(new Date()) // State untuk menyimpan tanggal yang dipilih
  const [selectedDates, setSelectedDates] = useState([]) // State untuk menyimpan tanggal-tanggal yang dipilih
  const [selectAll, setSelectAll] = useState(false) // State untuk checkbox "Pilih Semua Jadwal"
  const [expandedDates, setExpandedDates] = useState([]) // State untuk tanggal yang sedang diperluas
  const selectedDatesExist = selectedDates.length > 0
  const navigate = useNavigate()
  // Fungsi untuk mendapatkan nama hari dari tanggal
  const handleJenisChange = (event) => {
    setJenisIzin(event.target.value);
  };

  const handleketeranganChange = (event) => {
    setKeterangan(event.target.value);
  };

  useEffect(() => {
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

    // Panggil fungsi getTanggalHariIni saat komponen pertama kali dirender
    getTanggalHariIni();
    setStatusPengajuan('Delivered');
    setIdMahasiswa(1);
    setIdJadwalKelas(1);
    setFileBukti('lala.pdf');
    setKeterangan(''); // Inisialisasi keterangan dengan string kosong
    setJenisIzin(''); // Inisialisasi jenisIzin dengan string kosong
    setTanggalPengajuan(''); // Inisialisasi tanggalPengajuan dengan string kosong
    setTanggalAbsen('');
  }, []);

  
  const sendDataToAPI = async (e) => {
    e.preventDefault();
    console.log(idMahasiswa);
    try {
       axios.post('http://localhost:3000/data-pengajuan/', {
        idMahasiswa,
        keterangan,
        jenisIzin,
        idJadwalKelas,
        tanggalPengajuan,
        tanggalAbsen,
        fileBukti,
        statusPengajuan,
        });
        console.log('berhasul');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const getDayName = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    const dayIndex = date.getDay()
    return days[dayIndex]
  }

  // const formatSelectedDate = (date) => {
  //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  //   return date.toLocaleDateString(undefined, options)
  // }

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

  // Fungsi untuk menangani perubahan checkbox
  const handleCheckboxChange = (id, date) => {
    const updatedData = tableData.map((item) => {
      if (item.id === id) {
        // Ubah nilai isChecked berdasarkan checkbox yang diklik
        item.isChecked = !item.isChecked
      }
      return item
    })
    setTableData(updatedData)

    // Perbarui status checkbox sesuai dengan tanggal yang dipilih
    const updatedDates = selectedDates.map((d) => {
      if (d.date.toDateString() === date.toDateString()) {
        // Temukan tanggal yang sesuai
        const dateData = updatedData.map((item) => item.isChecked)
        return { date: d.date, data: dateData }
      }
      return d
    })
    setSelectedDates(updatedDates)
  }

  // Fungsi untuk menangani perubahan checkbox "Pilih Semua Jadwal"
  const handleSelectAllChange = (date) => {
    const updatedData = tableData.map((item) => {
      item.isChecked = !selectAll // Setel semua checkbox sesuai dengan nilai "Pilih Semua Jadwal"
      return item
    })
    setTableData(updatedData)
    setSelectAll(!selectAll) // Toggle nilai "Pilih Semua Jadwal"

    // Perbarui status checkbox sesuai dengan tanggal yang dipilih
    const updatedDates = selectedDates.map((d) => {
      if (d.date.toDateString() === date.toDateString()) {
        // Temukan tanggal yang sesuai
        const dateData = updatedData.map((item) => item.isChecked)
        return { date: d.date, data: dateData }
      }
      return d
    })
    setSelectedDates(updatedDates)
  }

  // Fungsi untuk menangani perubahan tanggal yang dipilih
  const handleDateChange = (date) => {
    // Periksa apakah tanggal sudah ada dalam selectedDates
    if (!selectedDates.some((d) => d.date.toDateString() === date.toDateString())) {
      const updatedSelectedDates = [
        ...selectedDates,
        { date, data: tableData.map((item) => item.isChecked) },
      ]
      setSelectedDates(updatedSelectedDates)
    }
    setSelectedDate(date)
  }

  // Fungsi untuk menampilkan atau menyembunyikan jadwal berdasarkan tanggal yang diperluas
  const toggleExpandedDate = (date) => {
    if (expandedDates.includes(date)) {
      // Jika tanggal sudah ada dalam expandedDates, hapus dari array
      const updatedExpandedDates = expandedDates.filter((d) => d !== date)
      setExpandedDates(updatedExpandedDates)
    } else {
      // Jika tanggal belum ada dalam expandedDates, tambahkan ke array
      setExpandedDates([...expandedDates, date])
    }
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Form elements */}
      <CCol md={1}></CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01" className="table-font">
          Nama
        </CFormLabel>
        <CFormInput type="text" id="validationCustom01" placeholder="Ketikkan nama Anda" required />
        <CFormFeedback valid>Nama sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon Nama diisi</CFormFeedback>
      </CCol>
      <CCol md={2}></CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02" className="table-font">
          NIM
        </CFormLabel>
        <CFormInput type="text" id="validationCustom02" placeholder="Ketikkan NIM Anda" required />
        <CFormFeedback valid>NIM sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon NIM diisi</CFormFeedback>
      </CCol>
      <CCol md={1}></CCol>
      <CCol md={1}></CCol>
      <CCol md={1}>
        <CFormLabel htmlFor="validationCustom06" className="table-font margin-tanggal">
          Tanggal pengajuan:
        </CFormLabel>
      </CCol>
      <CCol md={5}>
        <div className="date-picker-container">
          <div className="input-group">
            <DatePicker
              id="validationCustom06"
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              dateFormat="dd/MM/yyyy" // Format tanggal sesuai keinginan Anda
              required
              className="form-control margin-tanggal1"
            />
          </div>
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom04" className="table-font">
          Jenis Surat
        </CFormLabel>
        <CFormSelect
          id="validationCustom04"
          value={jenisIzin}
          onChange={(event) => setJenisIzin(event.target.value)}
          required
        >
          <option value="">Pilih Jenis Surat</option>
          <option value="izin">Izin</option>
          <option value="sakit">Sakit</option>
        </CFormSelect>
        <CFormFeedback valid>Jenis surat sudah dipilih!</CFormFeedback>
        <CFormFeedback invalid>Mohon pilih jenis surat</CFormFeedback>
      </CCol>
      <CCol md={7}>
        <CFormLabel htmlFor="validationCustom04" className="table-font margin-jadwal">
          Pilih Jadwal Absen:
        </CFormLabel>
        {dayName && (
          <>
            <table className="table table-bordered custom-table">
              <thead>
                <tr>
                  <th>
                    <CFormCheck
                      type="checkbox"
                      id="selectAllCheckbox"
                      checked={selectAll}
                      onChange={() => handleSelectAllChange(selectedDate)}
                    />
                  </th>
                  <th>Jam Pelajaran</th>
                  <th>Nama Mata Kuliah</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <CFormCheck
                        type="checkbox"
                        id={item.id}
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(item.id, selectedDate)}
                      />
                    </td>
                    <td>{item.jamPelajaran}</td>
                    <td>{item.namaMataKuliah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </CCol>
      <CCol md={4}>
        <div className="mb-5">
          <CFormLabel htmlFor="validationCustom05" className="form-label table-font">
            Alasan
          </CFormLabel>
          <CFormTextarea
          id="validationTextarea"
          placeholder="Ketikkan alasan Anda"
          value={keterangan}
          onChange={handleketeranganChange}
          rows={7}
          required
          >
          </CFormTextarea>
          <CFormFeedback valid>Alasan sudah diisi</CFormFeedback>
          <CFormFeedback invalid>Mohon Alasan diisi</CFormFeedback>
        </div>
      </CCol>
      <CCol md={7}>
        {dayName && selectedDatesExist && (
          <>
            <CFormLabel className="tanggal-dipilih form-label table-font">
              Tanggal yang Dipilih:
            </CFormLabel>
            <ul>
              {selectedDates.map((date, index) => (
                <div key={index}>
                  <CButton
                    color="info"
                    className="detail-tanggal"
                    onClick={() => toggleExpandedDate(date.date)}
                  >{`Detail: ${getDayName(date.date)},
                  ${date.date.getDate()} ${date.date.toLocaleString('id-ID', { month: 'long' })}
                  ${date.date.getFullYear()}`}</CButton>
                  {expandedDates.includes(date.date) && (
                    <table className="tabel-detail table table-bordered custom-table">
                      <thead>
                        <tr>
                          <th>
                            <CFormCheck
                              type="checkbox"
                              id={`selectAllCheckbox${index}`}
                              checked={selectAll}
                              onChange={() => handleSelectAllChange(date.date)}
                            />
                          </th>
                          <th>Jam Pelajaran</th>
                          <th>Nama Mata Kuliah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {date.data.map((isChecked, index) => {
                          const item = tableData[index]
                          return (
                            <tr key={item.id}>
                              <td>
                                <CFormCheck
                                  type="checkbox"
                                  id={item.id}
                                  checked={isChecked}
                                  onChange={() => handleCheckboxChange(item.id, date.date)}
                                />
                              </td>
                              <td>{item.jamPelajaran}</td>
                              <td>{item.namaMataKuliah}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </ul>
          </>
        )}
      </CCol>
      <div className="mb-3 custom-input margin-lampiran">
        <CFormLabel htmlFor="validationCustom07" className="table-font">
          Lampiran
        </CFormLabel>
        <CFormInput type="file" id="validationTextarea" aria-label="file example" required />
        <CFormFeedback valid>Lampiran sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon untuk upload lampiran!</CFormFeedback>
      </div>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Saya mengajukan sakit/izin dengan data yang benar"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit" onClick={sendDataToAPI}>
          Kirim
        </CButton>
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
