import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import {
  CChartBar,
} from '@coreui/react-chartjs';
import axios from 'axios';
import '../../../../scss/styleCrud.css';

const DashboardTU = () => {
    const [jmlPengajuanIzin, setJmlPengajuanIzin] = useState([]);
    const [jmlPengajuanSakit, setJmlPengajuanSakit] = useState([]);

    useEffect(() => {
      getDataPengajuanIzin();
      // console.log(jmlPengajuanIzin);
    }, []);
    
    useEffect(() => {
      getDataPengajuanSakit();
      // console.log(jmlPengajuanSakit);
    }, []);
    
    const getDataPengajuanIzin = async () => {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/leave/request/Izin/D3`);
      setJmlPengajuanIzin(response.data.data);
    }

    const getDataPengajuanSakit = async () => {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/leave/request/Sakit/D3`);
      setJmlPengajuanSakit(response.data.data);
    }

    useEffect(() => {
      console.log('jml data pengajuan: ', jmlPengajuanIzin);
    }, [jmlPengajuanIzin]);

    useEffect(() => {
      console.log('jml data pengajuan: ', jmlPengajuanSakit);
    }, [jmlPengajuanSakit]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    const pageNumbers = Math.ceil(jmlPengajuanIzin/ itemsPerPage);
    
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
      <div className="page-dashboard">
        <CRow>
          <CCol>
            <div className="box-grafik">
              <div className='box-blue-grafik box-grafik'>
                <div className='box-white-grafik box-grafik'>
                  <CCard className="mb-4 card-grafik">
                    <CCardHeader className="text-header-grafik">
                      Jumlah Sakit Mahasiswa
                    </CCardHeader>
                    <CCardBody>
                      <CChartBar
                        data={{
                          labels: [
                            'July', 
                            'August', 
                            'Sept', 
                            'Okt', 
                            'Nov', 
                            'Des', 
                            'Jan', 
                            'Feb', 
                            'March', 
                            'April', 
                            'May', 
                            'June'
                          ],

                          datasets: [
                            {
                              label: 'Jumlah sakit per jam pelajaran',
                              backgroundColor: '#324567',
                              data: [
                                jmlPengajuanSakit[6],
                                jmlPengajuanSakit[7], 
                                jmlPengajuanSakit[8], 
                                jmlPengajuanSakit[9], 
                                jmlPengajuanSakit[10], 
                                jmlPengajuanSakit[11], 
                                jmlPengajuanSakit[0], 
                                jmlPengajuanSakit[1], 
                                jmlPengajuanSakit[2], 
                                jmlPengajuanSakit[3], 
                                jmlPengajuanSakit[4], 
                                jmlPengajuanSakit[5]
                              ],
                            }
                          ],
                        }}
                        labels="months"
                        style={{ width: '430px' }}
                      />
                    </CCardBody>
                  </CCard>
                </div>
              </div>
            </div>
          </CCol>
          <CCol>
            <div className="box-grafik">
              <div className='box-blue-grafik box-grafik'>
                <div className='box-white-grafik box-grafik'>
                  <CCard className="mb-4 card-grafik">
                    <CCardHeader className="text-header-grafik">Jumlah Izin Mahasiswa</CCardHeader>
                    <CCardBody>
                      <CChartBar
                        data={{
                          labels: ['July', 'August', 'Sept', 'Okt', 'Nov', 'Des', 'Jan', 'Feb', 'March', 'April', 'May', 'June'],
                          datasets: [
                            {
                              labels: [
                                'July', 
                                'August', 
                                'Sept', 
                                'Okt', 
                                'Nov', 
                                'Des', 
                                'Jan', 
                                'Feb', 
                                'March', 
                                'April', 
                                'May', 
                                'June'
                              ],
                              backgroundColor: '#324567',
                              data: [
                                jmlPengajuanIzin[6], 
                                jmlPengajuanIzin[7],
                                jmlPengajuanIzin[8], 
                                jmlPengajuanIzin[9], 
                                jmlPengajuanIzin[10], 
                                jmlPengajuanIzin[11], 
                                jmlPengajuanIzin[0], 
                                jmlPengajuanIzin[1], 
                                jmlPengajuanIzin[2], 
                                jmlPengajuanIzin[3], 
                                jmlPengajuanIzin[4], 
                                jmlPengajuanIzin[5]
                              ],
                            }
                          ],
                        }}
                        labels="months"
                        style={{ width: '430px' }}
                      />
                    </CCardBody>
                  </CCard>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <div>
            <div className="containerTabel">
              <div className="containerTabel box-blue">
              </div>
              <div className="containerTabel table-box">
                <div className="table-font">
                    <h2>Jadwal Kuliah Hari Ini</h2>
                </div>
                <table className="tabel">
                  <thead>
                      <tr>
                      <th className="header-cell rata table-font ukuran-kecil">Nomor</th>
                      <th className="header-cell rata table-font">
                          <div>
                            Kelas
                          </div>
                      </th>
                      <th className="header-cell rata table-font">
                          <div>
                            Jumlah Izin
                          </div>
                      </th>
                      <th className="header-cell rata table-font">
                          <div>
                            Jumlah Sakit
                          </div>
                      </th>
                      <th className="header-cell rata table-font">
                          <div>
                            Aksi
                          </div>
                      </th>
                      </tr>
                  </thead>
                  <tbody>
                      {/* {currentData.map((item, index) => (
                          <tr key={index}>
                              <td className="cell rata table-font">{index +1 + (currentPage - 1) * itemsPerPage}</td>
                              <td className="cell rata table-font">{item.Mata_Kuliah}</td>
                              <td className="cell rata table-font">{item.Jam}</td>
                              <td className="cell rata table-font">{item.Nama_Dosen}</td>
                          </tr>
                      ))} */}
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
        </CRow>
      </div>
    )
  }

export default DashboardTU;