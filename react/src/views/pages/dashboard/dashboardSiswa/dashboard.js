import React, { useState, useEffect } from 'react';
import './style.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

const dashboardMahasiswa = () => {
    const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const getDayName = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
    const [hari, setHari] = useState(getDayName(new Date()));
    const [id, setIdMahasiswa] = useState(1)
    const urlMahasiswaGetOne = `http://localhost:3000/data-mahasiswa/students/${id}`;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

      useEffect(() => {
        getMahasiswa();
        getAllClassHours();
        getAllSchedule();
      }, []);

      const getMahasiswa = async () => {
        try {
            const response = await axios.get(urlMahasiswaGetOne);
            console.log(response.data.data);
            setMahasiswa(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      const getAllSchedule = async () => {
        try {
            const mahasiswa = await axios.get(urlMahasiswaGetOne);
            const response = await axios.get(`http://localhost:3000/jadwal-kelas/${mahasiswa.data.data.ID_Kelas}/${hari}`);
            console.log('ini jadwal',response.data);
            setJadwalKelasAll(response.data);
            setJadwalKelas(response.data.data);
            setMataKuliah(response.data.mata_kuliah);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      const getAllClassHours = async () => {
        try {
          const response = await axios.get('http://localhost:3000/data-jam-pelajaran');
          setJamPelajaran(response.data.data);
          console.log('hoii', response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      const pageNumbers = Math.ceil(jadwalKelas.length / itemsPerPage);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = jadwalKelas.slice(indexOfFirstItem, indexOfLastItem);
    
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
            <div className="row">
                <div className="col-sm-6">
                    <div className='box-blue'>
                        gffff
                    </div>
                    <div className='box-white'>
                        g
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className='box-blue'>
                        gffff
                    </div>
                    <div className='box-white'>
                        g
                    </div>
                </div>
                
                <div className="col-sm-1">
                    a
                </div>
            </div>
            <div className="font-header table-font">
                <h2>Jadwal Kuliah Hari Ini</h2>
            </div>
            <div>
                <div className="containerTabel box-blue">
                
                </div>
                <div className="table-box">
                    <table className="tabel">
                    <thead>
                        <tr>
                        <th className="header-cell rata table-font">Nomor</th>
                        <th className="header-cell rata table-font">
                            <div>
                            Mata Kuliah
                            </div>
                        </th>
                        <th className="header-cell rata table-font">
                            <div>
                                Waktu
                            </div>
                        </th>
                        <th className="header-cell rata table-font">
                            <div>
                                Dosen
                            </div>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index}>
                                <td className="cell rata table-font">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td className="cell rata table-font">{mataKuliah[index].Data_Mata_Kuliah.Nama_Mata_Kuliah}</td>
                                <td className="cell rata table-font">{jamPelajaran[item.ID_Jam_Pelajaran_Start - 1].Waktu_Mulai} - {jamPelajaran[item.ID_Jam_Pelajaran_End - 1].Waktu_Mulai}</td>
                                <td className="cell rata table-font">{mataKuliah[index].Data_Dosen.Nama_Dosen}</td>
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
        </>
    );

};
export default dashboardMahasiswa;