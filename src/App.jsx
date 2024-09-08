import React from 'react';
import Header  from './Header';
import  Footer from './Footer';
import './App.css';
import VideoGallery from './Videogallery.jsx';

function App() {


  return (
    <>
    <Header/>
    <div className="App">
    <VideoGallery/>
    </div>
    <Footer/>
    </>
  );
}

export default App;
