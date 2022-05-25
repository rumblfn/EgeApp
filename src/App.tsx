import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './routes/Home';
import { Footer } from './components/footer';
import { SubjectPage } from './routes/Subject';
import { AuthPage } from './routes/Auth';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App" style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header/>
      <Routes>
          <Route path="/auth" element={<AuthPage/>} />
          <Route path="/subject/:subjectId" element={<SubjectPage/>} />
          <Route path="/*" element={
            <HomePage />
          } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
