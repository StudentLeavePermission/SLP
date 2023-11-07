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
    }, []);
    
    useEffect(() => {
      getDataPengajuanSakit();
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

    const random = () => Math.round(Math.random() * 100)
    return (
      <div className="page-dashboard">
      <CRow>
        <CCol>
          <div className="box-grafik">
            <div className='box-blue-grafik box-grafik'>
              <div className='box-white-grafik box-grafik'>
                <CCard className="mb-4 card-grafik">
                  <CCardHeader className="text-header-grafik">Jumlah Sakit Mahasiswa</CCardHeader>
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: ['July', 'August', 'Sept', 'Okt', 'Nov', 'Des', 'Jan', 'Feb', 'March', 'April', 'May', 'June'],
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
                            label: 'Jumlah izin per jam pelajaran',
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
      </div>
    )
  }

export default DashboardTU;