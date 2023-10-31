import React from 'react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/mahasiswa/dashboardMahasiswa',
    icon: cilBarChart,
  },
  {
    component: CNavItem,
    name: 'Form Pengajuan',
    to: '/mahasiswa/formPengajuan',
    icon: cibHackhands,
  },
  // {
  //   component: CNavItem,
  //   name: 'History Pengajuan',
  //   to: '/theme/typography',
  //   icon: cilHistory,
  // },
]

export default _nav
