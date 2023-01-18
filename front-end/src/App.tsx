import React from 'react'; // eslint-disable-line
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => (
  <div className="App">
    <Navbar />
    <Home />
    <Footer />
  </div>
);

export default App;
