import React from 'react'; // eslint-disable-line
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  </QueryClientProvider>
);

export default App;
