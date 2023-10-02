import React from 'react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: cilBarChart,
  },
  {
    component: CNavItem,
    name: 'Data Siswa',
    to: '/theme/typography',
    icon: cilHistory,
  },
  {
    component: CNavGroup,
    name: 'Dat Pengajuan',
    to: '/buttons',
    icon: cibHackhands,
    items: [
      {
        component: CNavItem,
        name: 'Pengajuan Baru',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'History Pengajuan',
        to: '/buttons/button-groups',
      },
    ],
  },
]

export default _nav
