import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './routes/Home';
import { Footer } from './components/footer';

function App() {

  return (
    <div className="App" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header/>
      <Routes>
          <Route path="/subject/:subjectId" element={<></>} />
          <Route path="/*" element={
            <HomePage />
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
