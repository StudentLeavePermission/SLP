import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const LayoutSLP = React.lazy(() => import('./layout/LayoutSLP'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const FormPengajuan = React.lazy(() => import('./views/pages/formPengajuan/FormPengajuan'))
const LandingPage = React.lazy(()=> import('./views/pages/landingPage/LandingPage'))
//CRUD Mahasiswa (TU)
const EditMahasiswa = React.lazy(() => import('./views/pages/crudMahasiswa/EditMahasiswa'))
//CRUD Dosen (TU)
const CrudDosen = React.lazy(() => import('./views/pages/crudDosen/tabelDosen'))
const DetailDosen = React.lazy(() => import('./views/pages/crudDosen/detailDosen'))
const TambahDosen = React.lazy(()=> import('./views/pages/crudDosen/tambahDosen'));
const EditDosen = React.lazy(() => import('./views/pages/crudDosen/editDosen'));
const VerifyPengajuan = React.lazy(() => import('./views/pages/verifyPengajuan/VerifyPengajuan'));

//CRUD Jadwal (TU)
const CrudJadwal = React.lazy(() => import('./views/pages/crudJadwal/TabelCRUD'))
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/tu/mahasiswa/edit" name="EditMahasiswa" element={<EditMahasiswa />} />
            <Route exact path="/formPengajuan" name="form pengajuan" element={<FormPengajuan />} />
            <Route index name="landing page" element={<LandingPage />} />
            <Route exact path="/dataDosen" name="TabelDosen" element={<CrudDosen />} />
            <Route exact path="/detailDosen/:key" name="DetailDosen" element={<DetailDosen />} />
            <Route exact path="/tambahDosen" name="TambahDosen" element={<TambahDosen />} />
            <Route exact path="/editDosen/:key" name="EditDosen" element={<EditDosen />} />
            <Route exact path="/verifyPengajuan" name="VerifyPengajuan" element={<VerifyPengajuan />} />
            <Route exact path="/dataJadwal" name="TabelJadwal" element={<CrudJadwal />} />
            <Route path="*" name="Home" element={<LayoutSLP />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
