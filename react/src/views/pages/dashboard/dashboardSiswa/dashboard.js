import React, { useState, useEffect } from 'react';
import '../../../../scss/styleCrud.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilChartPie} from '@coreui/icons';


const dashboardMahasiswa = () => {
    const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
    const [daftarPengajuan, setDaftarPengajuan] = useState([]);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const [Sakit, setSakit] = useState([]);
    const [Izin, setIzin] = useState([]);
    const getDayName = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
    const [hari, setHari] = useState(getDayName(new Date()));
    const [id, setIdMahasiswa] = useState(2)
    const urlMahasiswaGetOne = `http://localhost:3000/data-mahasiswa/students/${id}`;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

      useEffect(() => {
        getAllLeaveRequests();
        getAllClassHours();
        getAllScheduleToday();
      }, []);
    
      const getAllScheduleToday = async () => {
        try {
            const mahasiswa = await axios.get(urlMahasiswaGetOne);
            const response = await axios.get(`http://localhost:3000/jadwal-kelas/${mahasiswa.data.data.ID_Kelas}/${hari}`);
            console.log('ini jadwal',response.data.data);
            setJadwalKelas(response.data.data);
            setMataKuliah(response.data.mata_kuliah);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      const getAllLeaveRequests = async () => {
        try {
            const jadwal = await axios.get(`http://localhost:3000/jadwal-kelas/`);
            console.log('jadwal',jadwal.data.data)
            const response = await axios.get(`http://localhost:3000/data-pengajuan/mahasiswa/${id}`);
            console.log('pengajuan',response.data.data);
            setDaftarPengajuan(response.data.data);
            const sakit = response.data.data.filter(item => item.Jenis_Izin === 'Sakit' && item.Status_Pengajuan === 'Accepted');
            const izin = response.data.data.filter(item => item.Jenis_Izin === 'Izin' && item.Status_Pengajuan === 'Accepted');
            console.log('Jumlah Izin:', izin);
            console.log('Jumlah Sakit:', sakit);
            let jumlahIzin = 0;
            izin.forEach(item => {
                jumlahIzin += (jadwal.data.data[item.ID_Jadwal_Kelas -1].ID_Jam_Pelajaran_End - jadwal.data.data[item.ID_Jadwal_Kelas -1].ID_Jam_Pelajaran_Start +1);
            });
            console.log('aa:', jumlahIzin);

            let jumlahSakit = 0;
            sakit.forEach(item => {
                jumlahSakit += (jadwal.data.data[item.ID_Jadwal_Kelas -1].ID_Jam_Pelajaran_End - jadwal.data.data[item.ID_Jadwal_Kelas -1].ID_Jam_Pelajaran_Start +1);
            });
            console.log('bb:', jumlahSakit);
            setIzin(izin);
            setSakit(sakit);
        
            console.log('Jumlah Izin:', izin);
            console.log('Jumlah Sakit:', sakit);
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
            <div className="grid-container">
            <div className="box-information">
                    <div className='box-blue box-information'>
                    </div>
                    <div className='box-white box-information'>
                    <div className="d-flex justify-content-around">
                            <div className="d-flex-column justify-content-around">
                                <div className="text-information text-blue">Jumlah Izin</div>
                                <div className="text-information">12 Jam Pelajaran</div>
                            </div>
                            <div className='m-auto'>
                                <CIcon size={'3xl'}  icon={cilChartPie} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-information">
                    <div className='box-blue box-information'>
                    </div>
                    <div className='box-white box-information'>
                    <div className="d-flex justify-content-around">
                            <div className="d-flex-column justify-content-around">
                                <div className="text-information text-blue">Jumlah sakit</div>
                                <div className="text-information">{Sakit.length}</div>
                            </div>
                            <div className='m-auto'>
                                <CIcon size={'3xl'}  icon={cilChartPie} />
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
                                    <td className="cell rata table-font">{jamPelajaran[item.ID_Jam_Pelajaran_Start - 1].Waktu_Mulai} - {jamPelajaran[item.ID_Jam_Pelajaran_End].Waktu_Mulai}</td>
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
        </div>
        </>
    );

};
export default dashboardMahasiswa;