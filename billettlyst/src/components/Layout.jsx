import React from 'react';
import NavBar from './NavBar'; 
import '../styles/Layout.scss'; 

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}