import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      {/* Attribution link til APIet */}
    </BrowserRouter>
  );
}
export default App;