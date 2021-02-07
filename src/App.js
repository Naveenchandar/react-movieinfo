import React from 'react'
import './App.css';
import Navbar from './navbar';
import MovieInfo from './movieInfo';
import { ContextProvider } from './context';
function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Navbar />
        <br />
        <MovieInfo />
      </div>
    </ContextProvider>
  );
}

export default App;
