import axios from 'axios';
import React, { useEffect } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    fetchSubjects()
  }, [])

  async function fetchSubjects() {
    try {
      const response = await axios.get('http://192.168.1.61:8888/subject/getSubjects')
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
