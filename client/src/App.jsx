import React from 'react';
import { Route, useLocation, Routes } from "react-router-dom";
import { Detail, Form, Home, Landing } from './views';
import NavBar from './components/NavBar/NavBar';
import style from "./App.module.css";

function App() {
  const location = useLocation(); 

  return (
    <div className={style.app} >
      {location.pathname !== "/" && <NavBar />} {/* Mostramos el NavBar en todas las rutas excepto en "/" */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
