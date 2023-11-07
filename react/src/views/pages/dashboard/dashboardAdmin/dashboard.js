import React, { useEffect } from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs';
import { DocsCallout } from 'src/components';
import axios from 'axios';
import '../../../../scss/styleCrud.css';

const DashboardTU = () => {
    useEffect(() => {
      getDataPengajuan();
    }, []);
    
    const getDataPengajuan = async () => {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/leave/request`);
      console.log('jml data pengajuan: ', response.data);
    }

    const random = () => Math.round(Math.random() * 100)
    return (
      <div className="page-dashboard">
      <CRow>
        <CCol>
        <div className="box-grafik">
            <div className='box-blue-grafik box-grafik'>
              <div className='box-white-grafik box-grafik'>
                <CCard className="mb-4 card-grafik">
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'sept', 'okt', 'nov', 'des'],
                        datasets: [
                          {
                            label: 'GitHub Commits',
                            backgroundColor: '#2B2A4C',
                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                          }
                        ],
                      }}
                      labels="months"
                      style={{ width: '400px' }}
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
                  <CCardBody>
                    <CChartBar
                      data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'sept', 'okt', 'nov', 'des'],
                        datasets: [
                          {
                            label: 'GitHub Commits',
                            backgroundColor: '#2B2A4C',
                            data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                          }
                        ],
                      }}
                      labels="months"
                      style={{ width: '400px' }}
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