import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './routes/Home';

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/*" element={
            <HomePage />
          } />
        </Routes>
    </div>
  );
}

export default App;
