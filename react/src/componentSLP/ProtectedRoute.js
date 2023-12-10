import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Retrieve tokens from sessionStorage
  const authTokenDosen = sessionStorage.getItem('logintokendosen');
  const authTokenMhs = sessionStorage.getItem('logintokenmhs');

  // Check which token is available
  const authToken = authTokenDosen || authTokenMhs;

  if (!authToken) {
    console.log('Token (failed): ' + authToken);
    return <Navigate to="/login" replace />;
  }

  console.log('Token (succeed): ' + authToken);
  return children;
};

export default React.memo(ProtectedRoute);
