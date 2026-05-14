import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
function App2() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
       
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App2;