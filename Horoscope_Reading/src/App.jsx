import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import TuViCreator from './pages/TuVi';
import Tarot from './pages/Tarot';
import { Blog, Admin } from './pages/Placeholders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tu-vi" element={<TuViCreator />} />
          <Route path="tarot" element={<Tarot />} />
          <Route path="blog" element={<Blog />} />
          <Route path="admin" element={<Admin />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
