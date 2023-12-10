import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCodeViewer = () => {
  const [qrCodeData, setQRCodeData] = useState('');

  useEffect(() => {
    const getQR = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data-pengajuan/whatsapp/qr');
        setQRCodeData(response.data.url);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getQR();
  }, []); // Empty dependency array ensures useEffect runs once when component mounts

  return (
    <div>
      {/* Display QR code directly from base64 URL */}
      <img src={`${qrCodeData}`} alt="QR Code" />
    </div>
  );
};

export default QRCodeViewer;
