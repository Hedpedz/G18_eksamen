import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout'; 



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
      {/* Attribution link til APIet */}
    </BrowserRouter>
  );
}
export default App;