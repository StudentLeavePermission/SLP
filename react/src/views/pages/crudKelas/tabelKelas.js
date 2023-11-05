import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; 
import 'datatables.net'; 
import './crudKelas.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilCloudUpload, cilCloudDownload } from '@coreui/icons';
import { CButton, CCol, CRow } from '@coreui/react';
import axios from 'axios';

function TabelCRUD({}) {
  const tableRef = useRef(null);  
  const [dataKelas, setDataKelas] = useState([]);

  useEffect(() => {
    getAllClass();
  }, []);

  const getAllClass = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas/getallformat');
      setDataKelas(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Mengatur opsi bahasa DataTables
    $.extend($.fn.dataTable.defaults, {
      language: {
        paginate: {
          previous: '<', // Mengubah "Previous" menjadi tanda "<"
          next: '>', // Mengubah "Next" menjadi tanda ">"
        },
      },
    });
  }, [dataKelas]);

  const [form, setForm] = useState({}); // Form data
  const [detailItem, setDetailItem] = useState(null); // To display details
  const [editIndex, setEditIndex] = useState(-1); // Index of the data being edited
  const [sortBy, setSortBy] = useState('Nomor');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

    // Fungsi kustom untuk mengurutkan berdasarkan angka dan kemudian huruf
    const customSortFunction = (str1, str2) => {
      const numPattern = /\d+/g;
  
      // Mengambil angka dari string
      const num1 = parseInt(str1.match(numPattern)?.[0] || 0, 10);
      const num2 = parseInt(str2.match(numPattern)?.[0] || 0, 10);
  
      // Menghapus angka dari string
      const text1 = str1.replace(numPattern, '');
      const text2 = str2.replace(numPattern, '');
  
      // Mengurutkan berdasarkan angka terlebih dahulu, kemudian huruf
      if (num1 === num2) {
        return text1.localeCompare(text2);
      }
  
      return num1 - num2;
    };

  // Function to filter data based on search text
  const filteredData = dataKelas.filter((item) => {
    const namaKelas = item.Nama_Kelas || '';
    const tahunAjaran = (item.Tahun_Ajaran || '').toString(); // Ensure it's a string
    const searchTextLower = searchText.toLowerCase();
    return (
      namaKelas.toLowerCase().includes(searchTextLower) ||
      tahunAjaran.toLowerCase().includes(searchTextLower)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'Nama Kelas') {
      return order * customSortFunction(a.Nama_Kelas, b.Nama_Kelas);
    } else if (sortBy === 'Tahun Ajaran') {
      // Ensure Tahun_Ajaran is treated as numbers
      const tahunAjaranA = parseInt(a.Tahun_Ajaran);
      const tahunAjaranB = parseInt(b.Tahun_Ajaran);

      if (!isNaN(tahunAjaranA) && !isNaN(tahunAjaranB)) {
        return order * (tahunAjaranA - tahunAjaranB);
      } else {
        return 0; // Handle cases where Tahun_Ajaran is not a valid number
      }
    }
    return 0; // Handle other sortBy cases
  });

  // Calculate the number of pages
  const pageNumbers = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

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

  // Function to delete data
  const hapusData = async (id) => {
    const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/data-kelas/delete/${id}`);
        const newData = dataKelas.filter((item) => item.id !== id);
        setDataKelas(newData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  // JSX for the header section
  const headerSection = (
    <div className="font-title table-font">
      <div>
        <h2>Data Kelas</h2>
      </div>
    </div>
  );

  // JSX untuk bagian isian tabel
  return (
    <>
    <div className="container">
        {headerSection}
        <div className="containerTabel box-blue"></div>
        <div className="table-box">
          <div className="top-table">
            <CButton href={`/#/admin/tambahKelas`} className="btn-tambah table-font">
              + Tambah Data
            </CButton>
            <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Cari..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="search-input"
                />
                <CIcon icon={cilSearch} className="search-icon" />
            </div>
          </div>
          <table className="tabel">
            <thead>
              <tr>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Nama Kelas')}>
                    Nama Kelas
                    <span className="sort-icon">
                      {sortBy === 'Nama Kelas' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Tahun Ajaran')}>
                    Tahun Masuk
                    <span className="sort-icon">
                      {sortBy === 'Tahun Ajaran' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {currentData.map((item, index) => (
            <tr key={index}>
              <td className="cell rata table-font">{item.Nama_Kelas}</td>
              <td className="cell rata table-font">{item.Tahun_Ajaran}</td>
              <td className="cell aksi">
                <CButton href={`/#/admin/detailKelas/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilInfo} />
                </CButton>                
                <CButton href={`/#/admin/editKelas/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }} >
                    <CIcon icon={cilPencil} />
                </CButton>
                <CButton onClick={() => hapusData(item.id)} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </td>
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
    </>
  );
}

export default TabelCRUD;
