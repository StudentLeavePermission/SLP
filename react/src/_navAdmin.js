import React from 'react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart , cilFolderOpen} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: cilBarChart,
  },
  {
    component: CNavItem,
    name: 'Data Siswa',
    to: '/admin/mahasiswa/',
    icon: cilFolderOpen,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Data Siswa',
  //   to: '/buttons',
  //   icon: cibHackhands,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: '1A-JTK',
  //       to: '/dashboard',
  //     },
  //     {
  //       component: CNavItem,
  //       name: '1B-JTK',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: '2A-JTK',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: '2B-JTK',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: '3A-JTK',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: '3B-JTK',
  //       to: '/buttons/buttons',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Data Dosen',
    to: '/admin/dataDosen',
    icon: cilFolderOpen,
  },
  {
    component: CNavItem,
    name: 'Data Jadwal',
    to: '/admin/dataJadwal',
    icon: cilFolderOpen,
  },
  // {
  //   component: CNavItem,
  //   name: 'History Pengajuan',
  //   to: '/dashboard',
  //   icon: cilBarChart,
  // },
]

export default _nav
