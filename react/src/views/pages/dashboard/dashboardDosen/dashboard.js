import React, { useState, useEffect } from 'react';
import '../../../../scss/styleCrud.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilChartPie} from '@coreui/icons';


const dashboardDosen = () => {
    const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
    const [daftarPengajuan, setDaftarPengajuan] = useState([]);
    const [dataJadwal, setDataJadwal] = useState([]);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const [Sakit, setSakit] = useState(0);
    const [JumlahMhs, setMhs] = useState(0);
    const [NamaKelas, setNamaKelas] = useState('');
    const getDayName = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
    const [hari, setHari] = useState(getDayName(new Date()));
    const [id, setIdDosen] = useState(sessionStorage.getItem('idDosen'))
    const urlDosenGetOne = `http://localhost:3000/data-dosen/getdosenclass/${id}`;
    console.log('gatau ini bisa apa ngga', urlDosenGetOne);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

      useEffect(() => {
        getAllDataDosen();
      }, []);    
    
      const getAllDataDosen = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-dosen/getdosenclass/${id}`);
            console.log('dosen aja', response.data);
            console.log('mahasiswa aja', response.data.dataMahasiswa);
            console.log('kelas aja', response.data.dataKelas);

            // Hitung jumlah mahasiswa
            const totalMahasiswa = response.data.dataMahasiswa.length;
            setMhs(totalMahasiswa);

            // Ambil Nama_Kelas
            const NamaKelas = response.data.dataNamaKelas;
            setNamaKelas(NamaKelas);
            console.log('bener ga nih kelasnya', NamaKelas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
    

      const pageNumbers = Math.ceil(dataJadwal.length / itemsPerPage);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = dataJadwal.slice(indexOfFirstItem, indexOfLastItem);
    
      const handleNextPage = () => {
        if (currentPage < pageNumbers) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

    return (
        <>
        <div className='container'>
            <div className="grid-container">
                <div className="box-information">
                    <div className='box-blue box-information'>
                    </div>
                    <div className='box-white box-information'>
                      <div className="box-text-information">
                            <div className="d-flex justify-content-center flex-column">
                              <div className="text-information text-blue">Jumlah Mahasiswa {NamaKelas && `${NamaKelas}`}</div>
                              <div className="text-information"> {JumlahMhs} Mahasiswa</div>
                            </div>
                            <div>
                                <CIcon size={'5xl'}  icon={cilChartPie} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-information">
                    <div className='box-blue box-information'>
                    </div>
                    <div className='box-white box-information'>
                      <div className="box-text-information">
                            <div className="d-flex justify-content-center flex-column">
                                <div className="text-information text-blue">Jumlah Mahasiswa izin / sakit terbanyak</div>
                                <div className="text-information"> Mahasiswa</div>
                            </div>
                            <div>
                                <CIcon size={'5xl'}  icon={cilChartPie} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-font">
                <h2>Jadwal Kuliah Hari Ini</h2>
            </div>
            <div>
                <div className="containerTabel">
                <div className="containerTabel box-blue">
                    
                    </div>
                    <div className="containerTabel table-box">
                        <table className="tabel">
                        <thead>
                            <tr>
                              <th className="header-cell rata table-font">Nomor</th>
                              <th className="header-cell rata table-font">
                                  <div>
                                  Tanggal
                                  </div>
                              </th>
                              <th className="header-cell rata table-font">
                                  <div>
                                      NIM
                                  </div>
                              </th>
                              <th className="header-cell rata table-font">
                                  <div>
                                      Nama Mahasiswa
                                  </div>
                              </th>
                              <th className="header-cell rata table-font">
                                  <div>
                                      Keterangan
                                  </div>
                              </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td className="cell rata table-font">{index +1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td className="cell rata table-font">{item.Mata_Kuliah}</td>
                                    <td className="cell rata table-font">{item.Jam}</td>
                                    <td className="cell rata table-font">{item.Nama_Dosen}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className="pagination">
                        <button
                            className="btn-pagination"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            {'<'}
                        </button>
                        {Array.from({ length: pageNumbers }, (_, i) => {
                            const pageNumber = i + 1;
                            const isActive = pageNumber === currentPage;
            
                            return (
                            <button
                                key={i}
                                className={`btn-pagination ${isActive ? 'active' : ''}`}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                            );
                        })}
            
                        <button
                            className="btn-pagination"
                            onClick={handleNextPage}
                            disabled={currentPage === pageNumbers}
                        >
                            {'>'}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

};
export default dashboardDosen;