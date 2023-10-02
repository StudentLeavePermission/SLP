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
    component: CNavGroup,
    name: 'Form Pengajuan',
    to: '/buttons',
    icon: cibHackhands,
    items: [
      {
        component: CNavItem,
        name: 'Izin',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Sakit',
        to: '/buttons/button-groups',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'History Pengajuan',
    to: '/theme/typography',
    icon: cilHistory,
  },
]

export default _nav
